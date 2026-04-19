package com.server.tambito.modules.pedidos.entity;

import lombok.*;

import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.entity.Producto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {

    private Integer idDetalle;
    private Pedido pedido;
    private Producto producto;
    private Integer cantidad;
    private BigDecimal precioUnit;
    private BigDecimal subtotal;
}
