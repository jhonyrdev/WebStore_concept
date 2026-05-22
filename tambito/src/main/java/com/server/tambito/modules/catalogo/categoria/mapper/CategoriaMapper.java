package com.server.tambito.modules.catalogo.categoria.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.server.tambito.modules.catalogo.categoria.dto.*;
import com.server.tambito.modules.catalogo.categoria.entity.Categoria;

@Mapper(componentModel = "spring")
public interface CategoriaMapper {

    @Mapping(target = "nombre", source = "nomCat")
    CategoriaListDto toDto(Categoria categoria);

    List<CategoriaListDto> toDtoList(List<Categoria> categorias);

    @Mapping(target = "idCat", ignore = true)
    @Mapping(target = "nomCat", source = "nombre")
    Categoria toEntity(CategoriaCreateDto dto);
}