package com.server.tambito.modules.venta.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.server.tambito.commons.response.*;
import com.server.tambito.modules.venta.dto.*;
import com.server.tambito.modules.venta.service.MetodoPagoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/metodos-pago")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class MetodoPagoController {

    private final MetodoPagoService metodoPagoService;

    @PostMapping
    public ResponseEntity<apiResponse<MetodoPagoListDto>> crear(@Valid @RequestBody MetodoPagoDto dto) {
        MetodoPagoListDto creado = metodoPagoService.crearMetodoPago(dto);
        return ResponseEntity.ok(responseUtil.success(creado, "Método de pago creado exitosamente"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<apiResponse<MetodoPagoListDto>> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody MetodoPagoDto dto) {
        MetodoPagoListDto actualizado = metodoPagoService.actualizarMetodoPago(id, dto);
        return ResponseEntity.ok(responseUtil.success(actualizado, "Método de pago actualizado exitosamente"));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<apiResponse<MetodoPagoListDto>> cambiarEstado(@PathVariable Integer id) {
        MetodoPagoListDto actualizado = metodoPagoService.cambiarEstadoMetodoPago(id);
        return ResponseEntity.ok(responseUtil.success(actualizado, "Estado del método de pago actualizado"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer id) {
        metodoPagoService.eliminarMetodoPago(id);
        return ResponseEntity.ok(responseUtil.success(null, "Método de pago eliminado exitosamente"));
    }
}
