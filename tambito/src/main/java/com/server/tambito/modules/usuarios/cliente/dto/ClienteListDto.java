package com.server.tambito.modules.usuarios.cliente.dto;

import java.time.LocalDate;

import com.server.tambito.commons.enums.EstadoUsuarioEnum;

import lombok.Data;

@Data
public class ClienteListDto {
    private Integer idCli;
    private String codCli;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private EstadoUsuarioEnum estado;
    private LocalDate fechaReg;
}
