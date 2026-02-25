package com.DaiMiLed.server.services;

import com.DaiMiLed.server.dtos.AuthResponse;
import com.DaiMiLed.server.dtos.LoginRequest;
import com.DaiMiLed.server.dtos.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}