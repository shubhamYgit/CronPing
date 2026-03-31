package com.cronping.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Represents one URL monitoring job.
 * A job belongs to exactly one user and contains scheduling information such as
 * interval, next run time, and last run time.
 */
@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    // user_id is the foreign key column in the jobs table.
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "interval_minutes", nullable = false)
    private Integer intervalMinutes;

    // Store the enum as text (ACTIVE, PAUSED, DELETED) instead of numbers like 0,1,2.
    // Storing enum names is much easier to read and safer if enum order changes later.
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private JobStatus status = JobStatus.ACTIVE;

    // Time when the worker most recently executed this job.
    @Column(name = "last_run")
    private Instant lastRun;

    // Time when the scheduler should enqueue this job again.
    @Column(name = "next_run")
    private Instant nextRun;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
