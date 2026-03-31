package com.cronping.config;

import com.cronping.dto.PingJobMessage;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis-related Spring configuration.
 * Spring needs to know how to connect to Redis and how to convert Java objects
 * into bytes/strings that Redis can actually store.
 */
@Configuration
public class RedisConfig {

    /**
     * Creates a RedisTemplate specialized for PingJobMessage queue items.
     * RedisTemplate is the main Spring abstraction used to read/write Redis data.
     */
    @Bean
    public RedisTemplate<String, PingJobMessage> pingJobRedisTemplate(
            RedisConnectionFactory connectionFactory) {

        RedisTemplate<String, PingJobMessage> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Keys are plain strings like "ping_jobs".
        template.setKeySerializer(new StringRedisSerializer());

        // Values are PingJobMessage objects, so they are stored as JSON.
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(PingJobMessage.class));

        // Hash serializers are configured too for completeness, even though this queue
        // currently uses list operations rather than Redis hashes.
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(PingJobMessage.class));

        template.afterPropertiesSet();
        return template;
    }
}
