package com.server.tambito.modules.venta.dto;

import com.server.tambito.modules.venta.enums.TipoMetodoPagoEnum;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class MetodoPagoDto {
    @NotBlank(message = "El nombre del método de pago es requerido")
    private String nombreMetodo;

    @NotNull(message = "El tipo de método de pago es requerido")
    private TipoMetodoPagoEnum tipo;
}
