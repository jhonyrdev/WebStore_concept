package com.server.tambito.modules.venta.entity;

import lombok.*;

/**
 *
 * @author Jhonn
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Factura {

    private Integer idVenta;
    private Venta venta;
    private String codigoFactura;
    private String rucCliente;
    private String razonSocialCliente;
}
