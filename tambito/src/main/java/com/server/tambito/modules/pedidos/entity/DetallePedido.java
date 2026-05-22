package com.server.tambito.modules.pedidos.entity;

import lombok.*;

import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.entity.Producto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "detalle_pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Integer idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_ped")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_prod")
    private Producto producto;

    @Min(1)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unit", nullable = false, precision = 38, scale = 2)
    private BigDecimal precioUnit;

    @Column(name = "subtotal", nullable = false, precision = 38, scale = 2)
    private BigDecimal subtotal;
}
