package com.server.tambito.commons.exception;

public class resourceNotFoundException extends RuntimeException {
    public resourceNotFoundException(String message) {
        super(message);
    }
}
