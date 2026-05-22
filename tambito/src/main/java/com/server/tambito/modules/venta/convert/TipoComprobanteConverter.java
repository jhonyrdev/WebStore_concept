package com.server.tambito.modules.venta.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.venta.enums.TipoComprobanteEnum;

import jakarta.persistence.Converter;

@Converter
public class TipoComprobanteConverter extends LowerCaseEnumConverter<TipoComprobanteEnum> {
    public TipoComprobanteConverter() {
        super(TipoComprobanteEnum.class);
    }
}