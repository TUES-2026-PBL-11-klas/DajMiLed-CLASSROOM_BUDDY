package com.DaiMiLed.server.repositories;

import com.DaiMiLed.server.models.Role;
import com.DaiMiLed.server.models.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
