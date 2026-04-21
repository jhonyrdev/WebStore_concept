package com.server.tambito.commons.exception;

import org.apache.coyote.BadRequestException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class globalExceptionHandler {
    @ExceptionHandler(resourceNotFoundException.class)
    public ResponseEntity<apiError> handleNotFound(resourceNotFoundException ex) {
        return new ResponseEntity<>(
                new apiError(404, ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<apiError> handleBadRequest(BadRequestException ex) {
        return new ResponseEntity<>(
                new apiError(400, ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(unauthorizedException.class)
    public ResponseEntity<apiError> handleUnauthorized(unauthorizedException ex) {
        return new ResponseEntity<>(
                new apiError(401, ex.getMessage()),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<apiError> handleGeneral(Exception ex) {
        return new ResponseEntity<>(
                new apiError(500, "Error interno del servidor"),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
