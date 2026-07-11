package com.server.tambito.modules.catalogo.promocion.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.catalogo.promocion.dto.request.PromocionRequestDto;
import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionResponseDto;
import com.server.tambito.modules.catalogo.promocion.service.PromocionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/promociones")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class PromocionController {

    private final PromocionService promocionService;

    @PostMapping
    public ResponseEntity<apiResponse<PromocionResponseDto>> registrar(@Valid @RequestBody PromocionRequestDto dto) {
        PromocionResponseDto creada = promocionService.registrarPromocion(dto);
        return ResponseEntity.ok(responseUtil.success(creada, "Promoción registrada exitosamente"));
    }

    @PutMapping("/{idPromocion}")
    public ResponseEntity<apiResponse<PromocionResponseDto>> actualizar(
            @PathVariable Integer idPromocion,
            @Valid @RequestBody PromocionRequestDto dto) {
        PromocionResponseDto actualizada = promocionService.actualizarPromocion(idPromocion, dto);
        return ResponseEntity.ok(responseUtil.success(actualizada, "Promoción actualizada exitosamente"));
    }

    @DeleteMapping("/{idPromocion}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idPromocion) {
        promocionService.eliminarPromocion(idPromocion);
        return ResponseEntity.ok(responseUtil.success(null, "Promoción eliminada exitosamente"));
    }
}
