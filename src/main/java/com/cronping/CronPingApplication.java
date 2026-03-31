package com.cronping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * This is the main entry point of the backend application.
 * Spring Boot starts here, scans the project for components such as controllers,
 * services, repositories, and configuration classes, then wires everything together.
 */
@SpringBootApplication
// Enables Spring's @Scheduled methods, which this project uses to periodically
// look for jobs that are due to run.
@EnableScheduling
public class CronPingApplication {

    public static void main(String[] args) {
        // Bootstraps the Spring application context and starts the embedded web server.
        SpringApplication.run(CronPingApplication.class, args);
    }
}
