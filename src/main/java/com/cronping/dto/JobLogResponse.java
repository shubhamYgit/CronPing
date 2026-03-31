package com.cronping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/**
 * DTO returned for one historical execution of a monitoring job.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobLogResponse {

    private Integer statusCode;
    private Long responseTimeMs;
    private String errorMessage;
    private Instant executedAt;
}
