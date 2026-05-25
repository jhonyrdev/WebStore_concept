package com.server.tambito.modules.usuarios.cliente.dto;

import com.server.tambito.commons.enums.EstadoUsuarioEnum;
import lombok.Data;

@Data
public class ClienteListDto {
    private Integer idCli;
    private String codCli;
    private String nombreCompleto;
    private String email;
    private EstadoUsuarioEnum estado;
}
