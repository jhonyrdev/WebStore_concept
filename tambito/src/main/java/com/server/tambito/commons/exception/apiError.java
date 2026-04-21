package com.server.tambito.commons.exception;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class apiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;

    public apiError(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
