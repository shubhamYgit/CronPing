package com.cronping.controller;

import com.cronping.dto.AuthResponse;
import com.cronping.dto.LoginRequest;
import com.cronping.dto.RegisterRequest;
import com.cronping.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * A controller is the layer that receives HTTP requests.
 *
 * In Spring Boot, this class is responsible for:
 * 1. accepting JSON from the client,
 * 2. converting that JSON into Java objects,
 * 3. validating the input,
 * 4. calling the service layer,
 * 5. returning an HTTP response.
 */
@RestController
// All endpoints in this class start with /api/auth.
@RequestMapping("/api/auth")
// Lombok generates a constructor for final fields so Spring can inject AuthService.
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    // Controllers should stay thin. The real business logic lives in AuthService.
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // @RequestBody tells Spring to read JSON from the request body.
        // @Valid triggers Jakarta Bean Validation annotations from RegisterRequest.
        AuthResponse response = authService.register(request);

        // 201 CREATED is the usual HTTP status when a new resource/user is created.
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Login returns a token and the user's email if the credentials are correct.
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
