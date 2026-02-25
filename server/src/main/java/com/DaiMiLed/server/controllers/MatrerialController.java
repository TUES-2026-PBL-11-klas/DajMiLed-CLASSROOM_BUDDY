package com.DaiMiLed.server.controllers;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DaiMiLed.server.dtos.ApiResponse;
import com.DaiMiLed.server.dtos.Materials.MaterialRequest;
import com.DaiMiLed.server.services.Materials.MaterialsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class MatrerialController {

    private final MaterialsService materialsService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse> uploadMaterial(
            @ModelAttribute MaterialRequest request, @RequestHeader("Authorization") String authHeader) {

            String token = authHeader.substring(7);

            // if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // }

            Long id = materialsService.crateMaterial(request, token);

            return ResponseEntity.ok(new ApiResponse(HttpStatus.SC_CREATED, "Material created sucsessfully", id));
    }
}
