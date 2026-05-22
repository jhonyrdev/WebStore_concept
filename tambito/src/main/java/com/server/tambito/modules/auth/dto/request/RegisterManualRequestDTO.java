package com.server.tambito.modules.auth.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterManualRequestDTO {

    @NotBlank
    private String nombre;
    private String apellido;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
