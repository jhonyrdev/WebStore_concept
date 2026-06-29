package com.server.tambito.commons.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class apiResponse<T> {
     private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public apiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
}