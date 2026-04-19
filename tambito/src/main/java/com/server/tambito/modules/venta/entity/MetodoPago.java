package com.server.tambito.modules.venta.entity;
       
import lombok.*; 

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetodoPago {

    private Integer idMetodo;
    private String nombreMetodo;
}

