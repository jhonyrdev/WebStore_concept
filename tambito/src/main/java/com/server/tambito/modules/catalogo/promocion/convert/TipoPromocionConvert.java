package com.server.tambito.modules.catalogo.promocion.convert;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.catalogo.promocion.Enums.TipoPromocionEnum;

import jakarta.persistence.Convert;

@Convert
public class TipoPromocionConvert extends LowerCaseEnumConverter<TipoPromocionEnum> {
    public TipoPromocionConvert() { super(TipoPromocionEnum.class); }
}
