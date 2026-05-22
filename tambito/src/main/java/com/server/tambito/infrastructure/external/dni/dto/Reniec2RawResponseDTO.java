package com.server.tambito.infrastructure.external.dni.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Reniec2RawResponseDTO {

    private Reniec2DataDTO data;

    @Data
    public static class Reniec2DataDTO {

        @JsonProperty("nombres")
        private String nombres;

        @JsonProperty("apellido_paterno")
        private String apellidoPaterno;

        @JsonProperty("apellido_materno")
        private String apellidoMaterno;

        @JsonProperty("numero")
        private String numero;
    }
}
