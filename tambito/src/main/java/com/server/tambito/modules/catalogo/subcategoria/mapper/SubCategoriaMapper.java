package com.server.tambito.modules.catalogo.subcategoria.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.catalogo.subcategoria.dto.*;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

@Mapper(componentModel = "spring")
public interface SubCategoriaMapper {

    @Mapping(target = "idSubcat", source = "idSubcat")
    @Mapping(target = "nombre", source = "nomSubcat")
    SubCategoriaListDto toDto(SubCategoria subcategoria);

    List<SubCategoriaListDto> toDtoList(List<SubCategoria> list);

    @Mapping(target = "idSubcat", source = "idSubcat")
    @Mapping(target = "nombre", source = "nomSubcat")
    @Mapping(target = "categoriaNombre", source = "categoria.nomCat")
    SubCategoriaDetalleDto toDetalleDto(SubCategoria subcategoria);

    List<SubCategoriaDetalleDto> toDetalleDtoList(List<SubCategoria> list);

    @Mapping(target = "idSubcat", ignore = true)
    @Mapping(target = "nomSubcat", source = "nombre")
    @Mapping(target = "categoria", ignore = true)
    SubCategoria toEntity(SubCategoriaCreateDto dto);
}