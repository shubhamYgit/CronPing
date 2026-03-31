package com.cronping.repository;

import com.cronping.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository = database access layer.
 *
 * JpaRepository already provides common CRUD methods such as save(...), findById(...),
 * findAll(...), delete(...), and count(...).
 *
 * Spring Data can also generate queries automatically from method names like
 * findByEmail and existsByEmail.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
