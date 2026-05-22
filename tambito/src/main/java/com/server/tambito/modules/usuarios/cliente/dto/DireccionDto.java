package com.server.tambito.modules.usuarios.cliente.dto;

import com.server.tambito.modules.usuarios.cliente.enums.TipoDireccionEnum;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DireccionDto {
    @NotBlank(message = "La dirección es requerida")
    private String direccion;

    @NotNull(message = "El tipo de dirección es requerido")
    private TipoDireccionEnum tipo;
}
