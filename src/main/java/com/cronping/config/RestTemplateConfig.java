package com.cronping.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * Defines a reusable RestTemplate bean.
 * RestTemplate is Spring's older HTTP client abstraction. Even though the current
 * ping flow uses Java HttpClient directly, having a configured bean is useful if
 * other parts of the application later need simple outbound HTTP calls.
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .connectTimeout(Duration.ofSeconds(10))
                .readTimeout(Duration.ofSeconds(10))
                .build();
    }
}
