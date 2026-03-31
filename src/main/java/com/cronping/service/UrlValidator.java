package com.cronping.service;

import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;

/**
 * Validates that a URL is a safe, publicly-routable HTTP(S) endpoint.
 * Rejects localhost, private networks, link-local, cloud metadata, and loopback
 * addresses.
 * Why this matters: if users could submit internal addresses, the backend might be
 * tricked into making requests to private services that should never be exposed.
 */
@Component
public class UrlValidator {

    /**
     * Validates the given URL string.
     * Throws IllegalArgumentException if the URL is malformed, uses a non-HTTP
     * scheme, or resolves to an unsafe address.
     */
    public void validate(String url) {
        URI uri;
        try {
            // URI.create parses the URL string into structured pieces like scheme/host.
            uri = URI.create(url);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Malformed URL: " + url);
        }

        // --- Scheme ---
        String scheme = uri.getScheme();
        if (scheme == null || (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https"))) {
            throw new IllegalArgumentException("Only HTTP and HTTPS URLs are allowed");
        }

        // --- Host ---
        String host = uri.getHost();
        if (host == null || host.isBlank()) {
            throw new IllegalArgumentException("URL must contain a valid host");
        }

        String hostLower = host.toLowerCase();

        // Block obvious localhost and metadata patterns.
        if (hostLower.equals("localhost")
                || hostLower.endsWith(".localhost")
                || hostLower.equals("[::1]")) {
            throw new IllegalArgumentException("Localhost URLs are not allowed");
        }

        // Block well-known cloud metadata endpoints.
        if (hostLower.equals("metadata.google.internal")
                || hostLower.equals("instance-data")) {
            throw new IllegalArgumentException("Cloud metadata endpoints are not allowed");
        }

        // --- IP resolution check ---
        try {
            // A hostname may resolve to multiple IP addresses, so we check them all.
            InetAddress[] addresses = InetAddress.getAllByName(host);
            for (InetAddress addr : addresses) {
                if (isBlockedAddress(addr)) {
                    throw new IllegalArgumentException(
                            "URL resolves to a blocked address: " + addr.getHostAddress());
                }
            }
        } catch (UnknownHostException e) {
            throw new IllegalArgumentException("Cannot resolve host: " + host);
        }
    }

    /**
     * Returns true for addresses that should not be reachable from user-submitted
     * monitoring jobs.
     */
    private boolean isBlockedAddress(InetAddress addr) {
        return addr.isLoopbackAddress() // 127.0.0.0/8, ::1
                || addr.isSiteLocalAddress() // 10.x, 172.16-31.x, 192.168.x
                || addr.isLinkLocalAddress() // 169.254.x.x
                || addr.isAnyLocalAddress() // 0.0.0.0
                || addr.isMulticastAddress(); // 224.0.0.0/4
    }
}
