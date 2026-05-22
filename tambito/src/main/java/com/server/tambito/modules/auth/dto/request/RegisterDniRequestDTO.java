package com.server.tambito.modules.auth.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDniRequestDTO {

    @NotBlank
    @Size(min = 8, max = 8, message = "El DNI debe tener 8 dígitos")
    @Pattern(regexp = "\\d{8}", message = "El DNI solo debe contener números")
    private String dni;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}