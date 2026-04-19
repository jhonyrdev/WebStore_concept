
package com.server.tambito.modules.catalogo.subcategoria.entity;

import lombok.*;
import java.util.List;
import com.server.tambito.modules.catalogo.categoria.entity.Categoria;
import com.server.tambito.modules.catalogo.producto.entity.Producto;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"categoria", "productos"})
public class SubCategoria {

    private Integer idSubcat;
    private String nomSubcat;
    private Categoria categoria;
    private List<Producto> productos;
}
