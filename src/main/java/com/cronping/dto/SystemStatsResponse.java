package com.cronping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Aggregated monitoring numbers returned by the stats endpoint.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemStatsResponse {

    private long totalJobs;
    private long totalPings;
    private double successRate;
    private double averageLatency;
}
