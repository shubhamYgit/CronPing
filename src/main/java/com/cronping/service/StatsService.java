package com.cronping.service;

import com.cronping.dto.SystemStatsResponse;
import com.cronping.repository.JobLogRepository;
import com.cronping.repository.JobRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Computes high-level monitoring statistics for dashboards and landing-page metrics.
 */
@Service
@RequiredArgsConstructor
public class StatsService {

    private final JobRepository jobRepository;
    private final JobLogRepository jobLogRepository;

    @Transactional(readOnly = true)
    public SystemStatsResponse getSystemStats() {
        long totalJobs = jobRepository.count();
        long totalPings = jobLogRepository.count();
        long successfulPings = jobLogRepository.countSuccessfulPings();
        double averageLatency = jobLogRepository.averageResponseTime();

        // Convert success count into a percentage.
        double successRate = totalPings > 0
                ? (double) successfulPings / totalPings * 100.0
                : 0.0;

        // Round values so the frontend receives cleaner numbers.
        return SystemStatsResponse.builder()
                .totalJobs(totalJobs)
                .totalPings(totalPings)
                .successRate(Math.round(successRate * 100.0) / 100.0)
                .averageLatency(Math.round(averageLatency * 100.0) / 100.0)
                .build();
    }
}
