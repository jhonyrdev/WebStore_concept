package com.server.tambito.modules.catalogo.promocion.mapper;

import java.util.List;

import org.mapstruct.*;

import com.server.tambito.modules.catalogo.promocion.dto.request.PromocionRequestDto;
import com.server.tambito.modules.catalogo.promocion.dto.response.*;
import com.server.tambito.modules.catalogo.promocion.entity.Promocion;

@Mapper(componentModel = "spring")
public interface PromocionMapper {

    PromocionListDto toListDto(Promocion promocion);

    List<PromocionListDto> toListDtoList(List<Promocion> promociones);

    PromocionResponseDto toResponseDto(Promocion promocion);

    List<PromocionResponseDto> toResponseDtoList(List<Promocion> promociones);

    @Mapping(target = "idPromocion", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "productos", ignore = true)
    Promocion toEntity(PromocionRequestDto dto);

    @Mapping(target = "idPromocion", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "productos", ignore = true)
    void updateEntity(PromocionRequestDto dto, @MappingTarget Promocion promocion);
}