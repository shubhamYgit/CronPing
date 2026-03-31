package com.cronping.security;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Central Spring Security configuration.
 * This class explains three important things for the application:
 * 1. which URLs are public vs protected,
 * 2. that authentication is JWT-based and stateless,
 * 3. which browser origins are allowed to call the API.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * A bean is an object managed by Spring.
     * SecurityFilterChain tells Spring Security how every request should be handled.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // CSRF protection is mainly important for session/cookie-based apps.
                // This project uses JWT tokens in headers, so CSRF is disabled.
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                // STATELESS means Spring Security will not create server-side login sessions.
                // Every request must bring its own JWT token.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Registration and login must be public.
                        .requestMatchers("/api/auth/**").permitAll()
                        // The landing page reads public system stats.
                        .requestMatchers(HttpMethod.GET, "/api/system/stats").permitAll()
                        // Everything else requires authentication.
                        .anyRequest().authenticated())
                // Run our JWT filter before Spring's username/password filter.
                // This lets us authenticate requests by token before controller methods run.
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * CORS (Cross-Origin Resource Sharing) controls which frontend origins can call
     * this backend from a browser.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://10.132.202.138:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * PasswordEncoder is used by AuthService to hash passwords before saving them,
     * and to verify passwords during login.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
