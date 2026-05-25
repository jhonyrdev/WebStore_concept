package com.server.tambito.modules.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginLocalRequestDTO {
    @NotBlank(message = "El username es requerido")
    private String username;
    @NotBlank(message = "La contraseña es requerida")
    private String password;
}
