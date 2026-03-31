package com.cronping.service;

import com.cronping.dto.AuthResponse;
import com.cronping.dto.LoginRequest;
import com.cronping.dto.RegisterRequest;
import com.cronping.entity.User;
import com.cronping.repository.UserRepository;
import com.cronping.security.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * A service contains business logic.
 * Controllers talk to services, and services talk to repositories.
 * This helps keep responsibilities separated:
 * - controller = HTTP concerns
 * - service = application rules
 * - repository = database access
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Registers a new user.
     * Note: @Transactional means all database work in this method happens inside
     * one transaction. If something fails halfway through, Spring can roll it back.
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // First, make sure the email is not already taken.
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + request.getEmail());
        }

        // Never store raw passwords in the database.
        // PasswordEncoder hashes the password so the original text is not saved.
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();

        User saved = userRepository.save(user);
        log.info("Registered new user {}", saved.getId());

        // After registration, the app immediately creates a JWT token so the user can
        // act as an authenticated user right away.
        String token = jwtService.generateToken(saved.getId(), saved.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(saved.getEmail())
                .build();
    }

    /**
     * Logs in an existing user.
     */
    public AuthResponse login(LoginRequest request) {
        // Optional<User> means the database lookup may or may not find a user.
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // matches(raw, encoded) checks whether the plain-text password matches the
        // previously stored hash.
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        log.info("User {} logged in", user.getId());

        String token = jwtService.generateToken(user.getId(), user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .build();
    }
}
