package com.server.tambito.modules.usuarios.cliente.dto;

import com.server.tambito.modules.usuarios.cliente.enums.TipoDireccionEnum;

import lombok.Data;

@Data
public class DireccionListDto {
    private Integer idDir;
    private Integer idCli;
    private String direccion;
    private TipoDireccionEnum tipo;
}
