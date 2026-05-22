package com.server.tambito.modules.usuarios.cliente.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClienteDto {
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 45)
    private String nombre;

    @NotBlank(message = "El apellido es requerido")
    @Size(max = 45)
    private String apellido;

    @NotBlank(message = "El email es requerido")
    @Email
    @Size(max = 45)
    private String email;

    @Size(max = 20)
    private String telefono;
}
