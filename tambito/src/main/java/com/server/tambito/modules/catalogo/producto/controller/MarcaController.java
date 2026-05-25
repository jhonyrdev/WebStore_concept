package com.server.tambito.modules.catalogo.producto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.service.MarcaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class MarcaController {

    private final MarcaService service;

    @PostMapping
    public ResponseEntity<apiResponse<MarcaListDto>> crear(@Valid @RequestBody MarcaDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.crear(dto),
                "Marca creada exitosamente"));
    }

    @PutMapping("/{idMarca}")
    public ResponseEntity<apiResponse<MarcaListDto>> actualizar(@PathVariable Integer idMarca,
            @Valid @RequestBody MarcaDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.actualizar(idMarca, dto),
                "Marca actualizada exitosamente"));
    }

    @DeleteMapping("/{idMarca}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idMarca) {
        service.eliminar(idMarca);
        return ResponseEntity.ok(responseUtil.success(null, "Marca eliminada exitosamente"));
    }
}