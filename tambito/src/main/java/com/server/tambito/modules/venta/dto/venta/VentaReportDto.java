package com.server.tambito.modules.venta.dto.venta;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaReportDto {
    private Integer idVenta;
    private LocalDate fecha;
    private LocalTime hora;
    private String clienteNombre;
    private String clienteCorreo;
    private String metodoPago;
    private String tipoComprobante;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String estado;
    private List<DetalleVentaReportDto> items;
}