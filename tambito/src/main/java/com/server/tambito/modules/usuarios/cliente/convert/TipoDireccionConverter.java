package com.server.tambito.modules.usuarios.cliente.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.usuarios.cliente.enums.TipoDireccionEnum;

import jakarta.persistence.Converter;

@Converter
public class TipoDireccionConverter extends LowerCaseEnumConverter<TipoDireccionEnum> {
    public TipoDireccionConverter() {
        super(TipoDireccionEnum.class);
    }
}
