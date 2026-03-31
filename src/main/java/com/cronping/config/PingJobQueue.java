package com.cronping.config;

import com.cronping.dto.PingJobMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Small wrapper around Redis list operations.
 * Redis is acting like a queue here:
 * - the scheduler pushes messages in,
 * - the worker pops messages out.
 * Wrapping Redis access in this class keeps queue logic out of the scheduler and
 * worker classes.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class PingJobQueue {

    // This is the Redis list key that stores queued ping jobs.
    private static final String QUEUE_NAME = "ping_jobs";

    private final RedisTemplate<String, PingJobMessage> pingJobRedisTemplate;

    /**
     * Pushes a ping job onto the Redis queue.
     *
     * @param jobId the job identifier
     * @param url   the URL to ping
     */
    public void enqueuePingJob(UUID jobId, String url) {
        PingJobMessage message = PingJobMessage.builder()
                .jobId(jobId)
                .url(url)
                .build();

        // leftPush adds the item to the left side of the Redis list.
        pingJobRedisTemplate.opsForList().leftPush(QUEUE_NAME, message);
        log.debug("Enqueued ping job {} for URL {}", jobId, url);
    }

    /**
     * Blocking dequeue — waits up to 5 seconds for a message.
     * Returns empty if no message is available within the timeout.
     *
     * @return the next ping job message, or empty
     */
    public Optional<PingJobMessage> dequeuePingJob() {
        // rightPop removes from the other side of the list.
        // leftPush + rightPop together behave like a FIFO queue.
        PingJobMessage message = pingJobRedisTemplate.opsForList()
                .rightPop(QUEUE_NAME, 5, TimeUnit.SECONDS);

        if (message != null) {
            log.debug("Dequeued ping job {} for URL {}", message.getJobId(), message.getUrl());
        }

        return Optional.ofNullable(message);
    }
}
