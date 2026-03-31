package com.cronping.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * Stores one execution result for one job.
 *
 * Instead of overwriting a job with only the latest result, we keep a separate log
 * table so the UI can show history, latency trends, and failures over time.
 */
@Entity
@Table(name = "job_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    // HTTP status code such as 200, 404, 500.
    // This can be null if the request failed before an HTTP response was received.
    @Column(name = "status_code")
    private Integer statusCode;

    // Total request time measured in milliseconds.
    @Column(name = "response_time_ms")
    private Long responseTimeMs;

    // Useful for timeouts, DNS errors, or connection failures.
    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "executed_at", nullable = false)
    private Instant executedAt;
}
