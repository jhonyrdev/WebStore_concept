package com.server.tambito.modules.auth.Converter;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.auth.enums.RolEnum;

import jakarta.persistence.Converter;

@Converter
public class RolConverter extends LowerCaseEnumConverter<RolEnum> {
    public RolConverter() { super(RolEnum.class); }
}