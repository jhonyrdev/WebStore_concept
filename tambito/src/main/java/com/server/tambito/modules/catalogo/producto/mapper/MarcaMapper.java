package com.server.tambito.modules.catalogo.producto.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.catalogo.producto.dto.MarcaDto;
import com.server.tambito.modules.catalogo.producto.dto.MarcaListDto;
import com.server.tambito.modules.catalogo.producto.entity.Marca;

@Mapper(componentModel = "spring")
public interface MarcaMapper {
    MarcaListDto toDto(Marca marca);

    List<MarcaListDto> toDtoList(List<Marca> list);

    @Mapping(target = "idMarca", ignore = true)
    @Mapping(target = "productos", ignore = true)
    Marca toEntity(MarcaDto dto);

    @Mapping(target = "idMarca", ignore = true)
    @Mapping(target = "productos", ignore = true)
    void updateEntity(MarcaDto dto, @MappingTarget Marca marca);
}