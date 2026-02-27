package com.DaiMiLed.server.services.Materials;


import com.DaiMiLed.server.dtos.Materials.MaterialResponse;
import com.DaiMiLed.server.dtos.Materials.MaterialRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MaterialsService {
    Long crateMaterial(MaterialRequest materialRequest, String token);
    Page<MaterialResponse> getMaterialsBySubject(String subject, Pageable pageable);
    Page<MaterialResponse> getMaterialsByUser(String token, Pageable pageable);
}
