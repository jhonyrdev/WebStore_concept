package com.server.tambito.modules.venta.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.venta.dto.checkout.CheckoutRequestDto;
import com.server.tambito.modules.venta.dto.venta.VentaReportDto;
import com.server.tambito.modules.venta.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
@PreAuthorize("hasRole('CLIENTE')")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<apiResponse<VentaReportDto>> checkout(@RequestBody CheckoutRequestDto request) {
        return ResponseEntity.ok(responseUtil.success(ventaService.registrarCompra(request), "Compra registrada"));
    }

    @GetMapping("/mis-compras")
    public ResponseEntity<apiResponse<List<VentaReportDto>>> listarMisCompras() {
        return ResponseEntity.ok(responseUtil.success(ventaService.listarMisCompras(), "Historial de compras"));
    }
}