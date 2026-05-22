package com.server.tambito.modules.venta.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.pedidos.enums.TipoEntregaEnum;

import jakarta.persistence.*;

@Converter
public class TipoEntregaConverter extends LowerCaseEnumConverter<TipoEntregaEnum> {
    public TipoEntregaConverter() {
        super(TipoEntregaEnum.class);
    }
}