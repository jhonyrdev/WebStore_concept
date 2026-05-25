package com.server.tambito.modules.catalogo.producto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.service.UnidadService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/unidad")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class UnidadController {
    
    private final UnidadService service;

    @PostMapping
    public ResponseEntity<apiResponse<UnidadListDto>> crear(@Valid @RequestBody UnidadDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.guardar(dto),
                "Unidad creada exitosamente"));
    }

    @PutMapping("/{idUnidad}")
    public ResponseEntity<apiResponse<UnidadListDto>> actualizar(@PathVariable Integer idUnidad,
            @Valid @RequestBody UnidadDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.actualizar(idUnidad, dto),
                "Unidad actualizada exitosamente"));
    }

    @DeleteMapping("/{idUnidad}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idUnidad) {
        service.eliminar(idUnidad);
        return ResponseEntity.ok(responseUtil.success(null, "Unidad eliminada exitosamente"));
    }
}
