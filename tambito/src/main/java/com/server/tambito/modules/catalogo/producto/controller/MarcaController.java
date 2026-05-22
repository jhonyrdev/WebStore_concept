package com.server.tambito.modules.catalogo.producto.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.service.MarcaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/marcas")
@RequiredArgsConstructor
public class MarcaController {

    private final MarcaService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<MarcaListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listar(),
                "Marcas listadas exitosamente"));
    }

    @GetMapping("/subcategoria/{idSubcat}")
    public ResponseEntity<apiResponse<List<MarcaListDto>>> porSubCategoria(@PathVariable Integer idSubcat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorSubCategoria(idSubcat),
                "Marcas listadas exitosamente"));
    }

    @GetMapping("/categoria/{idCat}")
    public ResponseEntity<apiResponse<List<MarcaListDto>>> porCategoria(@PathVariable Integer idCat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorCategoria(idCat),
                "Marcas listadas exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<apiResponse<MarcaListDto>> crear(@Valid @RequestBody MarcaDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.crear(dto),
                "Marca creada exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{idMarca}")
    public ResponseEntity<apiResponse<MarcaListDto>> actualizar(@PathVariable Integer idMarca,
            @Valid @RequestBody MarcaDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.actualizar(idMarca, dto),
                "Marca actualizada exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{idMarca}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idMarca) {
        service.eliminar(idMarca);
        return ResponseEntity.ok(responseUtil.success(null, "Marca eliminada exitosamente"));
    }
}