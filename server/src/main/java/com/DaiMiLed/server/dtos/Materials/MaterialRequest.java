package com.DaiMiLed.server.dtos.Materials;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MaterialRequest {
    private String subject;
    private MultipartFile file;
}
