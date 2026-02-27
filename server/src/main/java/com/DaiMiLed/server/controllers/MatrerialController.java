package com.DaiMiLed.server.controllers;

import com.DaiMiLed.server.jwt.JwtProvider;
import org.apache.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DaiMiLed.server.dtos.ApiResponse;
import com.DaiMiLed.server.dtos.Materials.MaterialRequest;
import com.DaiMiLed.server.dtos.Materials.MaterialResponse;
import com.DaiMiLed.server.services.Materials.MaterialsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class MatrerialController {
    private final JwtProvider jwtProvider;
    private final MaterialsService materialsService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> uploadMaterial(
            @ModelAttribute MaterialRequest request, @RequestHeader("Authorization") String authHeader) {
            String token = jwtProvider.extractTokenFromHeader(authHeader);

            Long id = materialsService.crateMaterial(request, token);

            return ResponseEntity.ok(new ApiResponse(HttpStatus.SC_CREATED, "Material created successfully", id));
    }

    @GetMapping("/{subject_name}")
    public ResponseEntity<ApiResponse> getMaterialsBySubject(
            @PathVariable String subject_name,
            @PageableDefault Pageable pageable
    ) {
        Page<MaterialResponse> materials = materialsService
                .getMaterialsBySubject(subject_name, pageable);
        ApiResponse response = new ApiResponse(
                HttpStatus.SC_OK,
                "Materials retrieved successfully",
                materials
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getMaterialsForCurrentUser(
            @RequestHeader("Authorization") String authHeader,
            @PageableDefault Pageable pageable
    ) {
        String token = jwtProvider.extractTokenFromHeader(authHeader);

        Page<MaterialResponse> materials = materialsService.getMaterialsByUser(token, pageable);

        ApiResponse response = new ApiResponse(
                HttpStatus.SC_OK,
                "Materials retrieved successfully",
                materials
        );

        return ResponseEntity.ok(response);
    }
}
