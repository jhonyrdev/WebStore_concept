package com.server.tambito.modules.auth.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
public class DniPreviewResponseDTO {
    private String dni;
    private String nombreCompleto;
}
