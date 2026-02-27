package com.DaiMiLed.server.dtos.Materials;

import java.time.Instant;

import com.DaiMiLed.server.models.Material;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MaterialResponse {
    private Long id;
    private String username;
    private String subject;
    private String url;
    private Instant createdAt;

    public MaterialResponse(Material material) {
        this.id = material.getId();
        this.subject = material.getSubject();
        this.url = material.getUrl();
        this.createdAt = material.getCreatedAt();
        this.username = material.getUser().getUsername();
    }
}
