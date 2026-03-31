package com.cronping.scheduler;

import com.cronping.config.PingJobQueue;
import com.cronping.entity.Job;
import com.cronping.entity.JobStatus;
import com.cronping.repository.JobRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Periodically checks the database for jobs that are due to run.
 *
 * Think of this class as the "dispatcher":
 * - it does NOT execute the HTTP request itself,
 * - it only finds due jobs and puts them onto the Redis queue,
 * - worker processes consume those queued jobs later.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JobScheduler {

    private final JobRepository jobRepository;
    private final PingJobQueue pingJobQueue;

    /**
     * Runs every 60 seconds.
     *
     * @Scheduled is enabled globally by @EnableScheduling in CronPingApplication.
     * fixedRate = 60_000 means Spring will call this method roughly once per minute.
     *
     * @Transactional keeps the read + update operations for due jobs in one database
     * transaction.
     */
    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void scheduleDueJobs() {
        // Find all jobs whose nextRun time is already in the past (or exactly now)
        // and whose status is ACTIVE.
        List<Job> dueJobs = jobRepository.findAllByNextRunBeforeAndStatus(
                Instant.now(), JobStatus.ACTIVE);

        if (dueJobs.isEmpty()) {
            return;
        }

        log.info("Found {} due job(s) to schedule", dueJobs.size());

        for (Job job : dueJobs) {
            // Push a lightweight message onto Redis.
            // The queue only needs the job ID and URL, not the whole Job entity.
            pingJobQueue.enqueuePingJob(job.getId(), job.getUrl());

            // Move nextRun forward so this job will be scheduled again later.
            // Example: if intervalMinutes = 5, nextRun becomes now + 5 minutes.
            job.setNextRun(Instant.now().plus(job.getIntervalMinutes(), ChronoUnit.MINUTES));
            jobRepository.save(job);

            log.debug("Queued job {} — next run at {}", job.getId(), job.getNextRun());
        }
    }
}
