package com.server.tambito.modules.usuarios.cliente.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.commons.enums.EstadoUsuarioEnum;

import jakarta.persistence.Converter;

@Converter
public class EstadoClienteConverter extends LowerCaseEnumConverter<EstadoUsuarioEnum> {
    public EstadoClienteConverter() { super(EstadoUsuarioEnum.class); }
}