package com.server.tambito.modules.catalogo.promocion.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoPromocionDto {
    @NotNull(message = "El ID del producto es requerido")
    private Integer idProd;
 
    @NotNull(message = "El ID de la promoción es requerido")
    private Integer idPromocion;
}
