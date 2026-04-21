package com.server.tambito.modules.auth.entity;

import com.server.tambito.modules.auth.enumS.rol;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credencial {

    private Integer idCred;
    private String usuario;
    private String clave;
    private rol rol;

    
}

