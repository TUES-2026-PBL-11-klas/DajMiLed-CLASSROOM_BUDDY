package com.DaiMiLed.server.services;

import com.DaiMiLed.server.dtos.RegisterRequest;
import com.DaiMiLed.server.exceptions.RoleNotFoundException;
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

    public void registerStudent(RegisterRequest request) {
        registerWithRole(request, RoleName.ROLE_STUDENT);
    }

    public void registerTeacher(RegisterRequest request) {
        registerWithRole(request, RoleName.ROLE_TEACHER);
    }

    private void registerWithRole(RegisterRequest request, RoleName roleName) {

        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Registration attempt with already existing email: {}", request.getEmail());
            throw new RuntimeException("Email already in use");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Registration attempt with already existing username: {}", request.getUsername());
            throw new RuntimeException("Username already taken");
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
    }
}