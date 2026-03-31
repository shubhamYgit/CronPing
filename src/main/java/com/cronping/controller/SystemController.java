package com.cronping.controller;

import com.cronping.dto.SystemStatsResponse;
import com.cronping.service.StatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Exposes read-only system-wide statistics.
 */
@RestController
@RequestMapping("/api/system")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class SystemController {

    private final StatsService statsService;

    @GetMapping("/stats")
    public ResponseEntity<SystemStatsResponse> getStats() {
        // Delegate the actual calculation work to the service layer.
        SystemStatsResponse stats = statsService.getSystemStats();
        return ResponseEntity.ok(stats);
    }
}
