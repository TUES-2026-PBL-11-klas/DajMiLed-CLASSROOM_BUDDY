package com.DaiMiLed.server.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * Standard error response format for REST API exceptions.
 * Used by GlobalExceptionHandler to return consistent error messages.
 */
@Data
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private String detail;
}

