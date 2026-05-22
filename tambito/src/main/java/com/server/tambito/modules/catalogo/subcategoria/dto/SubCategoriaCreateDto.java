package com.server.tambito.modules.catalogo.subcategoria.dto;

import lombok.Data;

@Data
public class SubCategoriaCreateDto {
    private String nombre;
    private Integer idCategoria;
}