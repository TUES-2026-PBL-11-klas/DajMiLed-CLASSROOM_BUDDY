package com.DaiMiLed.server.services.Materials.MaterialsImpl;

import java.io.IOException;
import java.util.Map;

import com.DaiMiLed.server.dtos.Materials.MaterialResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.DaiMiLed.server.dtos.Materials.MaterialRequest;
import com.DaiMiLed.server.exceptions.ObjectNotFound;
import com.DaiMiLed.server.exceptions.UploadExeption;
import com.DaiMiLed.server.jwt.JwtProvider;
import com.DaiMiLed.server.models.Material;
import com.DaiMiLed.server.models.User;
import com.DaiMiLed.server.repositories.MaterialsRepository;
import com.DaiMiLed.server.repositories.UserRepository;
import com.DaiMiLed.server.services.Materials.MaterialsService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaterialsServiceImpl implements MaterialsService{

    private final MaterialsRepository materialsRepository;
        
    private final Cloudinary cloudinary;

    private final JwtProvider jwtProvider;

    private final UserRepository userRepository;


    @Override
    public Long crateMaterial(MaterialRequest materialRequest, String token) {

        String username = jwtProvider.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ObjectNotFound("Object user not found. Invalid token maybe."));

        String url;

        System.out.println(materialRequest.getSubject());
        System.out.println(materialRequest.getFile().getOriginalFilename());

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    materialRequest.getFile().getBytes(),
                    ObjectUtils.asMap(
                            "folder", "Materials/documents",
                            "public_id", "document_for_" + user.getId() + "_" + System.currentTimeMillis(),
                            "resource_type", "auto",
                            "overwrite", true)
                        );

            url = (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new UploadExeption("Upload failed");
        }

        Material material = new Material(materialRequest.getSubject(), url, user);

        materialsRepository.save(material);

        return material.getId();
    }

    @Override
    public Page<MaterialResponse> getMaterialsBySubject(String subject, Pageable pageable) {
        return materialsRepository
                .findBySubjectWithUser(subject, pageable)
                .map(MaterialResponse::new);
    }

    @Override
    public Page<MaterialResponse> getMaterialsByUser(String token, Pageable pageable) {
        String username = jwtProvider.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ObjectNotFound("Object user not found. Invalid token maybe."));

        return materialsRepository
                .findByUserWithUser(user, pageable)
                .map(MaterialResponse::new);
    }
}
