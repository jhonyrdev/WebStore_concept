package com.server.tambito.infrastructure.external.dni.mapper;

import org.mapstruct.*;

import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;
import com.server.tambito.infrastructure.external.dni.dto.Reniec2RawResponseDTO;

@Mapper(componentModel = "spring")
public interface DniResponseMapper {

    @Mapping(target = "firstName", source = "data.nombres")
    @Mapping(target = "firstLastName", source = "data.apellidoPaterno")
    @Mapping(target = "secondLastName", source = "data.apellidoMaterno")
    @Mapping(target = "fullName", expression = "java(data.getApellidoPaterno()+\" \"+data.getApellidoMaterno()+\" \"+data.getNombres())")
    @Mapping(target = "documentNumber", source = "dni")
    DniResponseDTO fromReniec2(Reniec2RawResponseDTO.Reniec2DataDTO data, String dni);
}