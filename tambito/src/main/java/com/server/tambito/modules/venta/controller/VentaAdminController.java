package com.server.tambito.modules.venta.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.venta.dto.venta.VentaReportDto;
import com.server.tambito.modules.venta.service.VentaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ventas/admin")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class VentaAdminController {

    private final VentaService ventaService;

    @GetMapping
    public ResponseEntity<apiResponse<List<VentaReportDto>>> listarTodas() {
        return ResponseEntity.ok(responseUtil.success(
                ventaService.listarTodasLasVentas(),
                "Ventas listadas exitosamente"));
    }
}