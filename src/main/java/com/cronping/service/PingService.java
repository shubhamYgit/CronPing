package com.cronping.service;

import com.cronping.dto.PingResult;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.UnknownHostException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpTimeoutException;
import java.time.Duration;

/**
 * Responsible for performing the actual outbound HTTP request.
 * This service is intentionally isolated so the worker does not need to know any of
 * the low-level HTTP client details.
 */
@Service
@Slf4j
public class PingService {

    private static final Duration CONNECT_TIMEOUT = Duration.ofSeconds(10);
    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(10);

    private final HttpClient httpClient;

    public PingService() {
        // Java's built-in HttpClient is enough for this project.
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(CONNECT_TIMEOUT)
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
    }

    /**
     * Sends an HTTP GET to the given URL and returns the result.
     *
     * @param url the endpoint to ping
     * @return a {@link PingResult} with status code, latency, and any error info
     */
    public PingResult executePing(String url) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(REQUEST_TIMEOUT)
                .GET()
                .build();

        long start = System.currentTimeMillis();

        try {
            // BodyHandlers.discarding() means we do not care about the response body.
            // We only need status code and timing information.
            HttpResponse<Void> response = httpClient.send(request,
                    HttpResponse.BodyHandlers.discarding());

            long elapsed = System.currentTimeMillis() - start;

            return PingResult.builder()
                    .statusCode(response.statusCode())
                    .responseTimeMs(elapsed)
                    // In this app, any 2xx or 3xx response counts as success.
                    .success(response.statusCode() >= 200 && response.statusCode() < 400)
                    .build();

        } catch (HttpTimeoutException e) {
            return errorResult(start, "Request timed out: " + e.getMessage());

        } catch (Exception e) {
            return errorResult(start, resolveErrorMessage(e));
        }
    }

    /**
     * Builds a failed PingResult while still reporting how long the attempt took.
     */
    private PingResult errorResult(long startMs, String message) {
        return PingResult.builder()
                .responseTimeMs(System.currentTimeMillis() - startMs)
                .success(false)
                .errorMessage(message)
                .build();
    }

    /**
     * Tries to convert lower-level Java networking exceptions into messages that are
     * easier to understand in logs and the UI.
     */
    private String resolveErrorMessage(Exception e) {
        Throwable cause = e.getCause();

        if (cause instanceof UnknownHostException) {
            return "DNS resolution failed: " + cause.getMessage();
        }
        if (cause instanceof java.net.ConnectException) {
            return "Connection refused: " + cause.getMessage();
        }
        if (cause instanceof java.net.SocketTimeoutException) {
            return "Connection timed out: " + cause.getMessage();
        }

        log.error("Unexpected ping error", e);
        return "Unexpected error: " + e.getMessage();
    }
}
