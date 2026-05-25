package com.server.tambito.modules.catalogo.subcategoria.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoriaDetalleDto {
    private Integer idSubcat;
    private String nombre;
    private String categoriaNombre;
}
