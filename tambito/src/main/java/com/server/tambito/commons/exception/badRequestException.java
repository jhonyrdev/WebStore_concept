package com.server.tambito.commons.exception;

public class badRequestException extends RuntimeException {
    public badRequestException(String message) {
        super(message);
    }
}
