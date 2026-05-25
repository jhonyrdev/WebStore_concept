package com.server.tambito.modules.usuarios.cliente.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.usuarios.cliente.dto.ClienteDto;
import com.server.tambito.modules.usuarios.cliente.dto.ClienteListDto;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(target = "idCli", source = "idCli")
    @Mapping(target = "codCli", source = "codCli")
    @Mapping(target = "nombreCompleto", expression = "java(cliente.getNomCli() + \" \" + cliente.getApeCli())")
    @Mapping(target = "email", source = "correoCli")
    @Mapping(target = "estado", source = "estado")
    ClienteListDto toDto(Cliente cliente);

    List<ClienteListDto> toDtoList(List<Cliente> list);

    @Mapping(target = "idCli", ignore = true)
    @Mapping(target = "codCli", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaReg", ignore = true)
    @Mapping(target = "credencial", ignore = true)

    @Mapping(target = "nomCli", source = "nombre")
    @Mapping(target = "apeCli", source = "apellido")
    @Mapping(target = "correoCli", source = "email")
    @Mapping(target = "telCli", source = "telefono")

    void updateEntity(ClienteDto dto, @MappingTarget Cliente cliente);

    @Mapping(target = "idCli", ignore = true)
    @Mapping(target = "codCli", source = "codigo")
    @Mapping(target = "correoCli", source = "email")
    @Mapping(target = "telCli", ignore = true)
    @Mapping(target = "nomCli", source = "nombre")
    @Mapping(target = "apeCli", source = "apellido")
    @Mapping(target = "estado", expression = "java(com.server.tambito.commons.enums.EstadoUsuarioEnum.ACTIVO)")
    @Mapping(target = "fechaReg", expression = "java(java.time.LocalDate.now())")
    @Mapping(target = "credencial", source = "cred")
    Cliente fromRegisterManual(String nombre, String apellido, String email,
            Credencial cred, String codigo);
}