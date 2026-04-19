package com.server.tambito.modules.venta.entity;


import lombok.*;
import java.math.BigDecimal;
import com.server.tambito.modules.catalogo.producto.entity.Producto;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVenta {

    private Integer idDetalle;
    private Venta venta;
    private Producto producto;
    private String nomProd;
    private Integer cantidad;
    private BigDecimal precioUnit;
    private BigDecimal subtotal;
}
