package com.server.tambito.modules.venta.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.venta.enums.TipoMetodoPagoEnum;

public class TipoMetodoPagoConverter extends LowerCaseEnumConverter<TipoMetodoPagoEnum> {
    public TipoMetodoPagoConverter() {
        super(TipoMetodoPagoEnum.class);
    }
}
