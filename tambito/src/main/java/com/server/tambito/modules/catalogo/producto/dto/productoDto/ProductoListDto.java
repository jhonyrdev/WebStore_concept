package com.server.tambito.modules.catalogo.producto.dto.productoDto;

import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;

import lombok.Data;

@Data
public class ProductoListDto {
    private Integer idProd;
    private String codProd;
    private String nomProd;
    private String desProd;
    private Integer idMarca;
    private String nombreMarca;
    private Integer idUnidad;
    private String nombreUnidad;
    private Integer cantProd;
    private BigDecimal precioProd;
    private String imgProd;
    private EstadoProductoEnum estado;
    private Integer idSubcat;
    private String nombreSubcat;
    private Integer idCat;
    private String nombreCategoria;
}
