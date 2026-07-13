package com.server.tambito.modules.catalogo.producto.dto.productoDto;

import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;

import lombok.Data;

@Data
public class ProductoAdminDto {
    private Integer idProd;
    private String codProd;
    private String nomProd;
    private BigDecimal precioProd;
    private Integer cantProd;
    private String nombreCategoria;
    private EstadoProductoEnum estado;
    private Integer descuento;


    
}
