package com.server.tambito.modules.auth.Mapper;

import org.mapstruct.*;

import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.enums.RolEnum;

@Mapper(componentModel = "spring")
public interface CredencialMapper {

    @Mapping(target = "idCred", ignore = true)
    @Mapping(target = "usuario", source = "usuario")
    @Mapping(target = "clave", source = "claveEncoded")
    @Mapping(target = "rol", source = "rol")
    @Mapping(target = "loginType", expression = "java(com.server.tambito.modules.auth.enums.LoginType.LOCAL)")
    Credencial fromRegistration(String usuario, String claveEncoded, RolEnum rol);
}
