package com.server.tambito.modules.auth.Converter;

import com.server.tambito.commons.convert.LowerCaseEnumConverter;
import com.server.tambito.modules.auth.enums.LoginType;

public class LoginTypeConverter extends LowerCaseEnumConverter<LoginType> {
    public LoginTypeConverter() { super(LoginType.class); }
}
