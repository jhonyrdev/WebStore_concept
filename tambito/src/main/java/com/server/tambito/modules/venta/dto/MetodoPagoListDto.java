package com.server.tambito.modules.venta.dto;

import com.server.tambito.modules.venta.enums.TipoMetodoPagoEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetodoPagoListDto {
    private Integer idMetodo;
    private String nombreMetodo;
    private TipoMetodoPagoEnum tipo;
    private Boolean estado;
}
