package com.server.tambito.modules.venta.mapper;

import java.util.List;
import org.mapstruct.*;
import com.server.tambito.modules.venta.dto.*;
import com.server.tambito.modules.venta.entity.MetodoPago;

@Mapper(componentModel = "spring")
public interface MetodoPagoMapper {

    MetodoPagoListDto toDto(MetodoPago metodoPago);

    List<MetodoPagoListDto> toDtoList(List<MetodoPago> metodosPago);

    @Mapping(target = "idMetodo", ignore = true)
    @Mapping(target = "estado", ignore = true)
    MetodoPago toEntity(MetodoPagoDto dto);
}
