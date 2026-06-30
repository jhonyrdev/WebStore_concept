package com.server.tambito.modules.catalogo.promocion.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.server.tambito.modules.catalogo.promocion.Enums.TipoPromocionEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromocionListDto {
    private String nombre;
    private BigDecimal valorDescuento;
    private TipoPromocionEnum tipoDescuento;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}