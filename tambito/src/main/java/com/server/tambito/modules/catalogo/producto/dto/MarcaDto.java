package com.server.tambito.modules.catalogo.producto.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class MarcaDto {

    @NotBlank(message = "El nombre de la marca es requerido")
    @Size(min = 1, max = 50, message = "El nombre debe tener entre 1 y 50 caracteres")
    private String nombre;
}