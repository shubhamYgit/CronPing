package com.cronping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Result object returned by PingService after one HTTP attempt.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PingResult {

    private Integer statusCode;
    private long responseTimeMs;
    private String errorMessage;
    private boolean success;
}
