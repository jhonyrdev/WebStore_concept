package com.server.tambito.commons.convert;

import com.server.tambito.commons.enums.EstadoGeneralEnum;
import jakarta.persistence.Converter;

@Converter
public class EstadoGeneralConverter extends LowerCaseEnumConverter<EstadoGeneralEnum> {
    public EstadoGeneralConverter() { super(EstadoGeneralEnum.class); }
}
