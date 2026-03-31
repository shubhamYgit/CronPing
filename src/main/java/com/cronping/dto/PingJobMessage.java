package com.cronping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Payload pushed to the Redis "ping_jobs" queue.
 *
 * Notice that this is intentionally small.
 * Queue messages usually carry only the data needed by the worker, not full entity
 * objects from JPA.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PingJobMessage {

    private UUID jobId;
    private String url;
}
