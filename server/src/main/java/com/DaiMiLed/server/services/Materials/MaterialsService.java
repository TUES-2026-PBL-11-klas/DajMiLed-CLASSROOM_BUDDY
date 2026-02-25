package com.DaiMiLed.server.services.Materials;


import com.DaiMiLed.server.dtos.Materials.MaterialRequest;

public interface MaterialsService {
    Long crateMaterial(MaterialRequest materialRequest, String token);
}
