package com.server.tambito.modules.usuarios.admin.mapper;

import org.mapstruct.*;


import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;

@Mapper(componentModel = "spring")
public interface AdministradorMapper {

    @Mapping(target = "idAdmin", ignore = true)
    @Mapping(target = "nomAdmin",    source = "nombre")
    @Mapping(target = "correoAdmin", source = "email")
    @Mapping(target = "credencial",  source = "cred")
    Administrador fromRegisterAdmin(String nombre, String email, Credencial cred);
}