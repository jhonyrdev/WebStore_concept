package com.server.tambito.modules.catalogo.producto.entity;

import lombok.*;
import java.math.BigDecimal;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
   
    private Integer idProd;
    private String codProd;
    private String nomProd;
    private String marca;
    private String unidad;
    private Integer cantProd;
    private BigDecimal precioProd;
    private String imgProd;
    private Estado estado = Estado.Disponible;
    private SubCategoria subcategoria; 


    public enum Estado {
        Disponible, Critico, Agotado, Inactivo
    }
}
