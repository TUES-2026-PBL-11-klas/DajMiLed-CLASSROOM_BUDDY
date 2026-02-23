package com.DaiMiLed.server.services;

import com.DaiMiLed.server.dtos.AuthResponse;
import com.DaiMiLed.server.dtos.LoginRequest;
import com.DaiMiLed.server.dtos.RegisterRequest;
import com.DaiMiLed.server.exceptions.EmailAlreadyExistsException;
import com.DaiMiLed.server.exceptions.InvalidCredentialsException;
import com.DaiMiLed.server.exceptions.RoleNotFoundException;
import com.DaiMiLed.server.exceptions.UsernameAlreadyExistsException;
import com.DaiMiLed.server.jwt.JwtProvider;
import com.DaiMiLed.server.models.Role;
import com.DaiMiLed.server.models.RoleName;
import com.DaiMiLed.server.models.User;
import com.DaiMiLed.server.repositories.RoleRepository;
import com.DaiMiLed.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthResponse registerStudent(RegisterRequest request) {
        return registerWithRole(request, RoleName.ROLE_STUDENT);
    }

    public AuthResponse registerTeacher(RegisterRequest request) {
        return registerWithRole(request, RoleName.ROLE_TEACHER);
    }

    private AuthResponse registerWithRole(RegisterRequest request, RoleName roleName) {

        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Registration attempt with already existing email: {}", request.getEmail());
            throw new EmailAlreadyExistsException(request.getEmail());
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Registration attempt with already existing username: {}", request.getUsername());
            throw new UsernameAlreadyExistsException(request.getUsername());
        }

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> {
                    String errorMsg = String.format("Role %s not found in database. This indicates a system configuration issue.", roleName);
                    log.error(errorMsg);
                    return new RoleNotFoundException(errorMsg);
                });

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                encodedPassword,
                role
        );

        userRepository.save(user);

        String token = jwtProvider.generateToken(user.getUsername(), user.getEmail());
        log.info("User registered and authenticated: {}", user.getUsername());

        return new AuthResponse(token, roleName + " registered and authenticated successfully");
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseGet(() -> userRepository.findByEmail(request.getUsername())
                        .orElse(null));

        if (user == null) {
            log.warn("Login attempt with non-existent username or email: {}", request.getUsername());
            throw new InvalidCredentialsException();
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("Login attempt with incorrect password for username/email: {}", request.getUsername());
            throw new InvalidCredentialsException();
        }

        String token = jwtProvider.generateToken(user.getUsername(), user.getEmail());
        log.info("User successfully logged in and authenticated: {}", user.getUsername());

        return new AuthResponse(token, "Login successful");
    }
}