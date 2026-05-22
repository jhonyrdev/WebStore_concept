package com.server.tambito.modules.venta.entity;


import lombok.*;
import java.math.BigDecimal;
import com.server.tambito.modules.catalogo.producto.entity.Producto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
@Table(name = "detalle_venta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Integer idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "id_prod")
    private Producto producto;

    @NotBlank
    @Column(name = "nom_prod", nullable = false, length = 100)
    private String nomProd;

    @Min(1)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unit", nullable = false, precision = 38, scale = 2)
    @NotNull
    private BigDecimal precioUnit;

    @Column(name = "subtotal", nullable = false, precision = 38, scale = 2)
    @NotNull
    private BigDecimal subtotal;
}
