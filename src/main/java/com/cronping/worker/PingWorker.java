package com.cronping.worker;

import com.cronping.config.PingJobQueue;
import com.cronping.dto.PingJobMessage;
import com.cronping.dto.PingResult;
import com.cronping.entity.JobLog;
import com.cronping.repository.JobLogRepository;
import com.cronping.repository.JobRepository;
import com.cronping.service.PingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;

/**
 * Background worker that continuously polls the Redis queue and executes ping jobs.
 *
 * Important idea for beginners:
 * - JobScheduler decides WHEN a job should run.
 * - PingWorker performs the actual HTTP request.
 *
 * Keeping those responsibilities separate makes the system easier to scale.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class PingWorker implements CommandLineRunner {

    private final PingJobQueue pingJobQueue;
    private final JobRepository jobRepository;
    private final JobLogRepository jobLogRepository;
    private final PingService pingService;

    @Override
    public void run(String... args) {
        // CommandLineRunner.run(...) is called automatically once Spring Boot has
        // started the application context.
        log.info("PingWorker started — polling Redis queue");

        // Start the long-running polling loop in a separate virtual thread so the main
        // application thread can continue serving HTTP requests normally.
        Thread.ofVirtual().name("ping-worker").start(this::pollLoop);
    }

    /**
     * Infinite loop that waits for queued jobs.
     *
     * dequeuePingJob() blocks for a few seconds, so this loop does not busy-spin and
     * waste CPU when the queue is empty.
     */
    private void pollLoop() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                Optional<PingJobMessage> message = pingJobQueue.dequeuePingJob();
                message.ifPresent(this::processPing);
            } catch (Exception e) {
                // A broad catch here prevents one bad message or Redis error from
                // permanently killing the worker loop.
                log.error("Unexpected error in poll loop", e);
                pauseAfterWorkerError();
            }
        }
    }

    /**
     * Executes one queued ping job and saves the result.
     */
    private void processPing(PingJobMessage message) {
        log.debug("Processing ping for job {} → {}", message.getJobId(), message.getUrl());

        // PingService knows how to send the HTTP request and calculate the result.
        PingResult result = pingService.executePing(message.getUrl());

        // Update lastRun on the job so the UI can show when the job most recently ran.
        // findById returns Optional because the job may theoretically be missing.
        jobRepository.findById(message.getJobId()).ifPresent(job -> {
            job.setLastRun(Instant.now());
            jobRepository.save(job);
        });

        // Persist a separate log row for this execution.
        // getReferenceById(...) returns a lightweight JPA reference to the Job entity.
        // That is enough here because we only need to create the foreign-key relation.
        JobLog jobLog = JobLog.builder()
                .job(jobRepository.getReferenceById(message.getJobId()))
                .statusCode(result.getStatusCode())
                .responseTimeMs(result.getResponseTimeMs())
                .errorMessage(result.getErrorMessage())
                .executedAt(Instant.now())
                .build();

        jobLogRepository.save(jobLog);
        log.info("Ping result for job {}: status={}, time={}ms, success={}",
                message.getJobId(), result.getStatusCode(),
                result.getResponseTimeMs(), result.isSuccess());
    }

    /**
     * Small helper method used after unexpected worker errors.
     */
    private void pauseAfterWorkerError() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // Restore the interrupt flag so outer loops can notice and stop cleanly.
            Thread.currentThread().interrupt();
        }
    }
}
