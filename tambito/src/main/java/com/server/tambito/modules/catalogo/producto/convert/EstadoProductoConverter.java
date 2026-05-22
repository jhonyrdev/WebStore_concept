package com.server.tambito.modules.catalogo.producto.convert;

import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;

import jakarta.persistence.*;

@Converter
public class EstadoProductoConverter implements AttributeConverter<EstadoProductoEnum, String> {

    @Override
    public String convertToDatabaseColumn(EstadoProductoEnum attribute) {
        if (attribute == null) return null;
        String lower = attribute.name().toLowerCase();
        return Character.toUpperCase(lower.charAt(0)) + lower.substring(1);
    }

    @Override
    public EstadoProductoEnum convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoProductoEnum.valueOf(dbData.toUpperCase());
    }
}