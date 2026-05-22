package com.server.tambito.modules.catalogo.categoria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaListDto {
    private Integer idCat;
    private String nombre;
}
