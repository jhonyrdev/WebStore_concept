package com.server.tambito.modules.usuarios.cliente.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.usuarios.cliente.dto.*;
import com.server.tambito.modules.usuarios.cliente.entity.Direccion;

@Mapper(componentModel = "spring")
public interface DireccionMapper {

    @Mapping(target = "idDir", source = "idDir")
    @Mapping(target = "idCli", source = "cliente.idCli")
    @Mapping(target = "direccion", source = "direccion")
    @Mapping(target = "tipo", source = "tipo")
    DireccionListDto toDto(Direccion direccion);

    List<DireccionListDto> toDtoList(List<Direccion> list);

    @Mapping(target = "idDir", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    void updateEntity(DireccionDto dto, @MappingTarget Direccion direccion);

    @Mapping(target = "idDir", ignore = true)
    @Mapping(target = "cliente", ignore = true)
    Direccion toEntity(DireccionDto dto);
}
