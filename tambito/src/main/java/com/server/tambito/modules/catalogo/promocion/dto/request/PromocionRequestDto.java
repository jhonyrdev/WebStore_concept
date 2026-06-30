package com.server.tambito.modules.catalogo.promocion.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.server.tambito.commons.enums.EstadoGeneralEnum;
import com.server.tambito.modules.catalogo.promocion.Enums.TipoPromocionEnum;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PromocionRequestDto {

    @NotBlank(message = "El nombre de la promoción es requerido")
    @Size(min = 3, max = 100, message = "El nombre de la promoción debe tener entre 3 y 100 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String descripcion;

    @NotNull(message = "El tipo de descuento es requerido")
    private TipoPromocionEnum tipoDescuento;

    @NotNull(message = "El valor del descuento es requerido")
    @DecimalMin(value = "0.01", message = "El valor del descuento debe ser mayor a 0")
    private BigDecimal valorDescuento;

    @NotNull(message = "La fecha de inicio es requerida")
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es requerida")
    private LocalDate fechaFin;

    private EstadoGeneralEnum estado;
}