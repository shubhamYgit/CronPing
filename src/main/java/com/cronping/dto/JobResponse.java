package com.cronping.dto;

import com.cronping.entity.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * DTO sent back to the client when reading or creating jobs.
 * It contains only the fields the frontend needs, not the entire JPA entity graph.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {

    private UUID id;
    private String url;
    private Integer intervalMinutes;
    private JobStatus status;
    private Instant lastRun;
    private Instant nextRun;
}
