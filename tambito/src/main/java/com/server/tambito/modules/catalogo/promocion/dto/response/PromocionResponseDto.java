package com.server.tambito.modules.catalogo.promocion.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.server.tambito.commons.enums.EstadoGeneralEnum;
import com.server.tambito.modules.catalogo.promocion.Enums.TipoPromocionEnum;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromocionResponseDto {
    private Integer idPromocion;
    private String nombre;
    private String descripcion;
    private TipoPromocionEnum tipoDescuento;
    private BigDecimal valorDescuento;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoGeneralEnum estado;
}