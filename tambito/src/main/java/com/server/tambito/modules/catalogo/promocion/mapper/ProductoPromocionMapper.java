package com.server.tambito.modules.catalogo.promocion.mapper;


import java.util.List;

import org.mapstruct.Mapper;

import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionResponseDto;
import com.server.tambito.modules.catalogo.promocion.entity.Promocion;

@Mapper(componentModel = "spring")
public interface ProductoPromocionMapper {
    
    PromocionResponseDto toResponseDto(Promocion promocion);

    List<PromocionResponseDto> toResponseDtoList(List<Promocion> promociones);
}
