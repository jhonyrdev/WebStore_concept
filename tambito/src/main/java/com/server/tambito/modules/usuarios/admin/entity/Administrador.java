package com.server.tambito.modules.usuarios.admin.entity;
 
import com.server.tambito.modules.auth.entity.Credencial;
import lombok.*; 

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Administrador {

    private Integer idAdmin;
    private String nomAdmin;
    private String correoAdmin;
    private Credencial credencial;
}

