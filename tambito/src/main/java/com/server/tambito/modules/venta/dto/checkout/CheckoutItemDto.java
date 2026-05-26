package com.server.tambito.modules.venta.dto.checkout;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutItemDto {
    private Integer productoId;
    private Integer cantidad;
}