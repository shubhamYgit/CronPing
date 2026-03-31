package com.cronping.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

/**
 * Handles JWT creation and validation.
 * JWT = JSON Web Token.
 * It is a signed string that carries identity data such as user ID and email.
 * The backend signs it with a secret key so clients cannot forge it easily.
 */
@Service
@Slf4j
public class JwtService {

    private final SecretKey signingKey;
    private final long expirationMs;

    public JwtService(
            // @Value injects values from application.yml (or environment variables).
            @Value("${jwt.secret:default-secret-key-change-me-in-production-please-32chars}") String secret,
            @Value("${jwt.expiration-ms:86400000}") long expirationMs) {
        // HMAC signing needs a secret key in bytes.
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    /**
     * Generate a JWT containing the user's ID and email.
     */
    public String generateToken(UUID userId, String email) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                // subject is the main identity field in a JWT.
                .subject(userId.toString())
                // claim is extra custom data we want to include in the token.
                .claim("email", email)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey)
                .compact();
    }

    /**
     * Extract the user ID (subject) from a valid token.
     */
    public UUID extractUserId(String token) {
        return UUID.fromString(parseClaims(token).getSubject());
    }

    /**
     * Extract the email claim from a valid token.
     */
    public String extractEmail(String token) {
        return parseClaims(token).get("email", String.class);
    }

    /**
     * Returns true if the token is structurally valid and not expired.
     */
    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Invalid JWT: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Parses and verifies the token signature.
     * If the signature is wrong or the token is expired, this method throws an
     * exception.
     */
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
