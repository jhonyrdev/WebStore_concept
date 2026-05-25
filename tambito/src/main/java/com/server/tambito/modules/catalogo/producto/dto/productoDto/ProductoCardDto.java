package com.server.tambito.modules.catalogo.producto.dto.productoDto;

import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;

import lombok.Data;

@Data
public class ProductoCardDto {
    private String imgProd;
    private String nomProd;
    private String desProd;
    private Integer cantProd;
    private BigDecimal precioProd;
    private EstadoProductoEnum estado;
}
