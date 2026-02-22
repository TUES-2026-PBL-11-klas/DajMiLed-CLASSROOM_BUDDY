package com.DaiMiLed.server.initialization;

import com.DaiMiLed.server.models.Role;
import com.DaiMiLed.server.models.RoleName;
import com.DaiMiLed.server.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    private static final RoleName[] REQUIRED_ROLES = {
            RoleName.ROLE_STUDENT,
            RoleName.ROLE_TEACHER
    };

    @Override
    public void run(String... args) {
        log.info("Starting data initialization...");
        initializeRoles();
        log.info("Data initialization completed successfully");
    }

    private void initializeRoles() {
        for (RoleName roleName : REQUIRED_ROLES) {
            boolean roleExists = roleRepository.findByName(roleName).isPresent();

            if (roleExists) {
                log.debug("Role {} already exists", roleName);
            } else {
                Role role = new Role(roleName);
                roleRepository.save(role);
                log.info("Created role: {}", roleName);
            }
        }
    }
}

