package com.DaiMiLed.server.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "roles")
@Getter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleName name;

    public Role(RoleName name) {
        this.name = name;
    }
}
