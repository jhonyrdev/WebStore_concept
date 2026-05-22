package com.server.tambito.modules.venta.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 *
 * @author Jhonn
 */

@Entity
@Table(name = "factura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Factura {

    @Id
    @Column(name = "id_venta")
    private Integer idVenta;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_venta")
    private Venta venta;

    @NotBlank
    @Column(name = "codigo_factura", nullable = false, unique = true, length = 20)
    private String codigoFactura;

    @NotBlank
    @Pattern(regexp = "\\d{11}")
    @Size(min = 11, max = 11)
    @Column(name = "ruc_cliente", length = 11, nullable = false)
    private String rucCliente;
    
    
    @Column(name = "razon_social_cliente", length = 100)
    private String razonSocialCliente;
}
