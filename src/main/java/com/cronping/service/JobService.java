package com.cronping.service;

import com.cronping.dto.CreateJobRequest;
import com.cronping.dto.JobLogResponse;
import com.cronping.dto.JobResponse;
import com.cronping.entity.Job;
import com.cronping.entity.JobStatus;
import com.cronping.entity.User;
import com.cronping.repository.JobLogRepository;
import com.cronping.repository.JobRepository;
import com.cronping.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobRepository jobRepository;
    private final JobLogRepository jobLogRepository;
    private final UserRepository userRepository;
    private final UrlValidator urlValidator;

    /**
     * Creates a new monitoring job for the authenticated user.
     */
    @Transactional
    public JobResponse createJob(UUID userId, CreateJobRequest request) {
        // Load the User entity first because Job has a relationship to User.
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        // The request already passed bean validation (@URL, @Min, @Max), but this
        // validator adds extra security checks such as blocking localhost/private IPs.
        urlValidator.validate(request.getUrl());

        Job job = Job.builder()
                .user(user)
                .url(request.getUrl())
                .intervalMinutes(request.getIntervalMinutes())
                .status(JobStatus.ACTIVE)
                // nextRun is the time when the scheduler should pick up this job.
                .nextRun(Instant.now().plus(request.getIntervalMinutes(), ChronoUnit.MINUTES))
                .build();

        Job saved = jobRepository.save(job);
        log.info("Created job {} for user {}", saved.getId(), userId);

        return toResponse(saved);
    }

    /**
     * Reads all jobs belonging to one user.
     * readOnly = true is a hint to Spring/Hibernate that we are only reading data,
     * not changing it.
     */
    @Transactional(readOnly = true)
    public List<JobResponse> getJobs(UUID userId) {
        return jobRepository.findAllByUserId(userId)
                .stream()
                // Convert entity objects into DTOs that are safe to expose to clients.
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<JobLogResponse> getJobLogs(UUID jobId, UUID userId) {
        // Reuse the ownership check so users can only read their own jobs/logs.
        findJobAndVerifyOwnership(jobId, userId);

        return jobLogRepository.findTop50ByJobIdOrderByExecutedAtDesc(jobId)
                .stream()
                .map(log -> JobLogResponse.builder()
                        .statusCode(log.getStatusCode())
                        .responseTimeMs(log.getResponseTimeMs())
                        .errorMessage(log.getErrorMessage())
                        .executedAt(log.getExecutedAt())
                        .build())
                .toList();
    }

    @Transactional
    public JobResponse pauseJob(UUID jobId, UUID userId) {
        Job job = findJobAndVerifyOwnership(jobId, userId);

        // Instead of deleting the row, we change its status.
        // The scheduler only processes ACTIVE jobs.
        job.setStatus(JobStatus.PAUSED);
        Job saved = jobRepository.save(job);
        log.info("Paused job {}", jobId);

        return toResponse(saved);
    }

    @Transactional
    public void deleteJob(UUID jobId, UUID userId) {
        Job job = findJobAndVerifyOwnership(jobId, userId);

        // This is a "soft delete".
        // The record stays in the database, but the status changes to DELETED.
        // Soft delete can be useful for audit/history and safer recovery.
        job.setStatus(JobStatus.DELETED);
        jobRepository.save(job);
        log.info("Soft-deleted job {}", jobId);
    }

    /**
     * Shared helper method that both loads the job and makes sure it belongs to the
     * authenticated user.
     */
    private Job findJobAndVerifyOwnership(UUID jobId, UUID userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found: " + jobId));

        // Access control is still required even if IDs are hard to guess.
        if (!job.getUser().getId().equals(userId)) {
            throw new SecurityException("Access denied: job does not belong to user");
        }

        return job;
    }

    /**
     * Converts an internal JPA entity into a DTO sent back to the frontend.
     */
    private JobResponse toResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .url(job.getUrl())
                .intervalMinutes(job.getIntervalMinutes())
                .status(job.getStatus())
                .lastRun(job.getLastRun())
                .nextRun(job.getNextRun())
                .build();
    }
}
