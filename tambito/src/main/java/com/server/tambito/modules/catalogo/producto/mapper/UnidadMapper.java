package com.server.tambito.modules.catalogo.producto.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.entity.Unidad;

@Mapper(componentModel = "spring")
public interface UnidadMapper {

    @Mapping(target = "idUnidad", ignore = true)
    Unidad toEntity(UnidadDto dto);

    UnidadListDto toListDto(Unidad unidad);

    List<UnidadListDto> toListDtoList(List<Unidad> list);

    @Mapping(target = "idUnidad", ignore = true)
    void updateEntity(UnidadDto dto, @MappingTarget Unidad unidad);
}