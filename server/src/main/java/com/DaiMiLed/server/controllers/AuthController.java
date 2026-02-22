package com.DaiMiLed.server.controllers;


import com.DaiMiLed.server.dtos.RegisterRequest;
import com.DaiMiLed.server.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register/student")
    public ResponseEntity<String> registerStudent(
            @Valid @RequestBody RegisterRequest request) {

        authService.registerStudent(request);
        return ResponseEntity.ok("Student registered successfully");
    }

    @PostMapping("/register/teacher")
    public ResponseEntity<String> registerTeacher(
            @Valid @RequestBody RegisterRequest request) {

        authService.registerTeacher(request);
        return ResponseEntity.ok("Teacher registered successfully");
    }
}
