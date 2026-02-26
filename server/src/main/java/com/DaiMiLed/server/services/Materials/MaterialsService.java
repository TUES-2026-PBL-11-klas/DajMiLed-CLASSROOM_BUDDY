package com.DaiMiLed.server.services.Materials;


import com.DaiMiLed.server.models.Material;
import com.DaiMiLed.server.dtos.Materials.MaterialRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MaterialsService {
    Long crateMaterial(MaterialRequest materialRequest, String token);
    Page<Material> getMaterialsBySubject(String subject, Pageable pageable);
}
