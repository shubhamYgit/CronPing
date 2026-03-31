package com.cronping.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.validator.constraints.URL;

/**
 * Request body for creating a monitoring job.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobRequest {

    @NotBlank(message = "URL must not be blank")
    @URL(message = "Must be a valid URL")
    private String url;

    @NotNull(message = "Interval is required")
    @Min(value = 1, message = "Interval must be at least 1 minute")
    @Max(value = 1440, message = "Interval must not exceed 1440 minutes (24 hours)")
    // Limiting the interval helps prevent unrealistic scheduling values.
    private Integer intervalMinutes;
}
