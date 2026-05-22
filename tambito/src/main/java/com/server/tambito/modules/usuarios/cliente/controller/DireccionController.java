package com.server.tambito.modules.usuarios.cliente.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.usuarios.cliente.dto.*;
import com.server.tambito.modules.usuarios.cliente.service.DireccionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/direcciones")
@RequiredArgsConstructor
public class DireccionController {

    private final DireccionService service;


    @GetMapping
    public ResponseEntity<apiResponse<List<DireccionListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(service.listar(), "Direcciones listadas exitosamente"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/cliente/{idCli}")
    public ResponseEntity<apiResponse<List<DireccionListDto>>> listarPorCliente(@PathVariable Integer idCli) {
        return ResponseEntity.ok(responseUtil.success(service.listarPorCliente(idCli), "Direcciones del cliente listadas exitosamente"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/{idDir}")
    public ResponseEntity<apiResponse<DireccionListDto>> obtener(@PathVariable Integer idDir) {
        return ResponseEntity.ok(responseUtil.success(service.obtenerPorId(idDir), "Dirección encontrada"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @PostMapping("/cliente/{idCli}")
    public ResponseEntity<apiResponse<DireccionListDto>> agregar(
            @PathVariable Integer idCli,
            @Valid @RequestBody DireccionDto dto) {
        return ResponseEntity.ok(responseUtil.success(service.agregar(idCli, dto), "Dirección agregada exitosamente"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @PutMapping("/{idDir}")
    public ResponseEntity<apiResponse<DireccionListDto>> actualizar(
            @PathVariable Integer idDir,
            @Valid @RequestBody DireccionDto dto) {
        return ResponseEntity.ok(responseUtil.success(service.actualizar(idDir, dto), "Dirección actualizada exitosamente"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @DeleteMapping("/{idDir}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idDir) {
        service.eliminar(idDir);
        return ResponseEntity.ok(responseUtil.success(null, "Dirección eliminada exitosamente"));
    }
}
