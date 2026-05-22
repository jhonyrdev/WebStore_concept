package com.server.tambito.modules.catalogo.producto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.server.tambito.modules.catalogo.producto.dto.ProductoDto;
import com.server.tambito.modules.catalogo.producto.dto.ProductoListDto;
import com.server.tambito.modules.catalogo.producto.entity.Producto;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    @Mapping(target = "idProd", ignore = true)
    @Mapping(target = "codProd", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "marca", ignore = true)
    @Mapping(target = "unidad", ignore = true)
    @Mapping(target = "subcategoria", ignore = true)
    Producto toEntity(ProductoDto dto);

    @Mapping(target = "idMarca", source = "marca.idMarca")
    @Mapping(target = "nombreMarca", source = "marca.nombre")
    @Mapping(target = "idUnidad", source = "unidad.idUnidad")
    @Mapping(target = "nombreUnidad", source = "unidad.nombre")
    @Mapping(target = "idSubcat", source = "subcategoria.idSubcat")
    @Mapping(target = "nombreSubcat", source = "subcategoria.nomSubcat")
    @Mapping(target = "idCat", source = "subcategoria.categoria.idCat")
    @Mapping(target = "nombreCategoria", source = "subcategoria.categoria.nomCat")
    ProductoListDto toListDto(Producto producto);

    List<ProductoListDto> toListDtoList(List<Producto> list);

    @Mapping(target = "idProd", ignore = true)
    @Mapping(target = "codProd", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "marca", ignore = true)
    @Mapping(target = "unidad", ignore = true)
    @Mapping(target = "subcategoria", ignore = true)
    void updateEntity(ProductoDto dto, @MappingTarget Producto producto);
}