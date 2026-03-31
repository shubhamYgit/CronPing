package com.cronping.repository;

import com.cronping.entity.JobLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for JobLog rows.
 *
 * Besides basic CRUD operations, this repository exposes queries used by:
 * - the UI (recent logs per job),
 * - the stats API (success counts and average latency).
 */
@Repository
public interface JobLogRepository extends JpaRepository<JobLog, UUID> {

    List<JobLog> findAllByJobIdOrderByExecutedAtDesc(UUID jobId);

    // Used when the API wants only the newest 50 log entries for a job.
    List<JobLog> findTop50ByJobIdOrderByExecutedAtDesc(UUID jobId);

    // @Query lets us write custom JPQL when a derived method name would be awkward.
    @Query("SELECT COUNT(l) FROM JobLog l WHERE l.statusCode IS NOT NULL AND l.statusCode >= 200 AND l.statusCode < 400")
    long countSuccessfulPings();

    @Query("SELECT COALESCE(AVG(l.responseTimeMs), 0) FROM JobLog l")
    double averageResponseTime();
}
