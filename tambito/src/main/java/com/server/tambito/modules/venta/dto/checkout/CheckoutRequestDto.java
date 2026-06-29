package com.server.tambito.modules.venta.dto.checkout;

import java.util.List;

import com.server.tambito.modules.venta.enums.TipoComprobanteEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequestDto {
    private Integer metodoPagoId;
    private TipoComprobanteEnum tipoComprobante;
    private List<CheckoutItemDto> items;
}