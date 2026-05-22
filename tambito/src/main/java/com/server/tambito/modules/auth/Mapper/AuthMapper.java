package com.server.tambito.modules.auth.Mapper;

import org.mapstruct.*;

import com.server.tambito.modules.auth.dto.response.AuthResponseDTO;
import com.server.tambito.modules.auth.entity.Credencial;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "userId", source = "cred.idCred")
    @Mapping(target = "username", source = "cred.usuario")
    @Mapping(target = "email", expression = "java(getEmail(cred))")
    @Mapping(target = "rol", source = "cred.rol")
    @Mapping(target = "loginType", source = "cred.loginType")
    @Mapping(target = "token", source = "token")
    AuthResponseDTO from(Credencial cred, String token);

    default String getEmail(Credencial cred) {
        if (cred == null) return null;
        String usuario = cred.getUsuario();
        if (usuario != null && usuario.contains("@")) return usuario;
        return null;
    }

    default AuthResponseDTO from(Credencial cred) {
        return from(cred, null);
    }
}