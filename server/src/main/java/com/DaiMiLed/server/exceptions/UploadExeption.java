package com.DaiMiLed.server.exceptions;

public class UploadExeption extends RuntimeException{
    public UploadExeption(String message) {
        super(message);
    }

    public UploadExeption(String message, Throwable cause) {
        super(message, cause);
    }
}
