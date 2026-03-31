package com.cronping.repository;

import com.cronping.entity.Job;
import com.cronping.entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Repository for Job entities.
 *
 * The custom methods below are "derived queries".
 * Spring reads the method name and builds the SQL/JPQL query automatically.
 */
@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {

    /**
     * Finds all jobs whose next scheduled run is at or before the given time
     * and whose status matches the provided value.
     * Used by the scheduler to pick up due jobs.
     */
    List<Job> findAllByNextRunBeforeAndStatus(Instant now, JobStatus status);

    // Because Job has a "user" relationship, Spring understands "UserId" here as
    // navigating through job.user.id.
    List<Job> findAllByUserId(UUID userId);
}
