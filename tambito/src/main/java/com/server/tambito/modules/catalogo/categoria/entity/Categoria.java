
package com.server.tambito.modules.catalogo.categoria.entity;

import lombok.*;
import java.util.List;

import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"subcategorias"})
public class Categoria {

    private Integer idCat;
    private String nomCat;
    private String desCat;
    private List<SubCategoria> subcategorias;
}
