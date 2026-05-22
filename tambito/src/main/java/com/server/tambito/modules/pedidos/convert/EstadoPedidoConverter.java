package com.server.tambito.modules.pedidos.convert;

import com.server.tambito.modules.pedidos.enums.EstadoPedidoEnum;

import jakarta.persistence.*;

@Converter
public class EstadoPedidoConverter implements AttributeConverter<EstadoPedidoEnum, String> {

    @Override
    public String convertToDatabaseColumn(EstadoPedidoEnum attribute) {
        if (attribute == null) return null;
        String lower = attribute.name().toLowerCase();
        return Character.toUpperCase(lower.charAt(0)) + lower.substring(1);
    }

    @Override
    public EstadoPedidoEnum convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoPedidoEnum.valueOf(dbData.toUpperCase());
    }
}