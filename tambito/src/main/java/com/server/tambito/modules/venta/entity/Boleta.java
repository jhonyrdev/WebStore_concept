
package com.server.tambito.modules.venta.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "boleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boleta {

    @Id
    @Column(name = "id_venta")
    private Integer idVenta;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_venta")
    private Venta venta;

    @NotBlank
    @Column(name = "codigo_boleta", nullable = false, unique = true, length = 20)
    private String codigoBoleta;
}

