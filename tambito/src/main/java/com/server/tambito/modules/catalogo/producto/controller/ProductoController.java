package com.server.tambito.modules.catalogo.producto.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.service.ProductoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/producto")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<ProductoListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarTodos(),
                "Productos listados exitosamente"));
    }

    @GetMapping("/{idProd}")
    public ResponseEntity<apiResponse<ProductoListDto>> obtenerPorId(@PathVariable Integer idProd) {
        return ResponseEntity.ok(responseUtil.success(
                service.obtenerPorId(idProd),
                "Producto encontrado exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<apiResponse<ProductoListDto>> registrar(@Valid @RequestBody ProductoDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.guardar(dto),
                "Producto registrado exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{idProd}")
    public ResponseEntity<apiResponse<ProductoListDto>> actualizar(@PathVariable Integer idProd,
            @Valid @RequestBody ProductoDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.actualizar(idProd, dto),
                "Producto actualizado exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{idProd}/stock")
    public ResponseEntity<apiResponse<Void>> incrementarStock(@PathVariable Integer idProd,
            @RequestParam int cantidad) {
        service.incrementarStock(idProd, cantidad);
        return ResponseEntity.ok(responseUtil.success(null, "Stock actualizado exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{idProd}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idProd) {
        service.eliminar(idProd);
        return ResponseEntity.ok(responseUtil.success(null, "Producto eliminado exitosamente"));
    }
}
