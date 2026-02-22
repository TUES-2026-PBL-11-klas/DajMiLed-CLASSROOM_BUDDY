package com.DaiMiLed.server.exceptions;

/**
 * Exception thrown when a role is not found in the database.
 */
public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(String message) {
        super(message);
    }

    public RoleNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

