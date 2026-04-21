package com.server.tambito.commons.exception;

public class unauthorizedException extends RuntimeException {
    public unauthorizedException(String message) {
        super(message);
    }
}