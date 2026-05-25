package com.server.tambito.modules.catalogo.producto.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UnidadDto {
    
    @NotBlank(message = "El nombre de la unidad es requerido")
    @Size(min = 1, max = 20, message = "El nombre debe tener entre 1 y 20 caracteres")
    private String nombre;

    @NotBlank(message = "El simbolo de la unidad es requerido")
    @Size(min = 1, max = 20, message = "El nombre debe tener entre 1 y 20 caracteres")
    private String simbolo;
}
