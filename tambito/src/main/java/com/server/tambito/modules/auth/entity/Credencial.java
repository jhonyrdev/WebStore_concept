package com.server.tambito.modules.auth.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credencial {

    private Integer idCred;
    private String usuario;
    private String clave;
    private Rol rol = Rol.cliente;

    public enum Rol {
        admin, cliente
    }
}

