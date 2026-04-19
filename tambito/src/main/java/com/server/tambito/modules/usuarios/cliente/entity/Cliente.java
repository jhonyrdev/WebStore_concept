
package com.server.tambito.modules.usuarios.cliente.entity;

import lombok.*;
import java.time.LocalDate;

import com.server.tambito.modules.auth.entity.Credencial;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    private Integer idCli;
    private String codCli;
    private String nomCli;
    private String apeCli;
    private String correoCli;
    private String telCli;
    private Estado estado = Estado.activo;
    private LocalDate fechaReg;
    private Credencial credencial;
    public enum Estado {
        activo, inactivo
    }
}
