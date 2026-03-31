package com.cronping.controller;

import com.cronping.dto.CreateJobRequest;
import com.cronping.dto.JobLogResponse;
import com.cronping.dto.JobResponse;
import com.cronping.service.JobService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Endpoints for creating, listing, pausing, deleting, and inspecting monitoring jobs.
 *
 * Notice that every method accepts an Authentication object. Spring Security places
 * that object on the request after the JWT token has been verified.
 */
@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            Authentication authentication,
            @Valid @RequestBody CreateJobRequest request) {
        // In this project, the JWT filter stores the user's UUID as the "principal".
        // principal usually means "who is authenticated?"
        UUID userId = (UUID) authentication.getPrincipal();

        JobResponse response = jobService.createJob(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobs(Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        List<JobResponse> jobs = jobService.getJobs(userId);
        return ResponseEntity.ok(jobs);
    }

    @PatchMapping("/{id}/pause")
    public ResponseEntity<JobResponse> pauseJob(
            Authentication authentication,
            // @PathVariable reads the {id} part from the URL and converts it to UUID.
            @PathVariable UUID id) {
        UUID userId = (UUID) authentication.getPrincipal();
        JobResponse response = jobService.pauseJob(id, userId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            Authentication authentication,
            @PathVariable UUID id) {
        UUID userId = (UUID) authentication.getPrincipal();
        jobService.deleteJob(id, userId);

        // 204 NO CONTENT means the operation succeeded and there is nothing to return.
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/logs")
    public ResponseEntity<List<JobLogResponse>> getJobLogs(
            Authentication authentication,
            @PathVariable UUID id) {
        UUID userId = (UUID) authentication.getPrincipal();
        List<JobLogResponse> logs = jobService.getJobLogs(id, userId);
        return ResponseEntity.ok(logs);
    }
}
