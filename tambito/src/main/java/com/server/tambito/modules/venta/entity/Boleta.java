
package com.server.tambito.modules.venta.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boleta {

    private Integer idVenta;
    private Venta venta;
    private String codigoBoleta;
}

