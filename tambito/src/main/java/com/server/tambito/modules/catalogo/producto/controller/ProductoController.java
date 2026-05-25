package com.server.tambito.modules.catalogo.producto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.*;
import com.server.tambito.modules.catalogo.producto.service.ProductoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService service;

    @PostMapping
    public ResponseEntity<apiResponse<ProductoListDto>> registrar(@Valid @RequestBody ProductoDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.guardar(dto),
                "Producto registrado exitosamente"));
    }

    @PutMapping("/{idProd}")
    public ResponseEntity<apiResponse<ProductoListDto>> actualizar(@PathVariable Integer idProd,
            @Valid @RequestBody ProductoDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.actualizar(idProd, dto),
                "Producto actualizado exitosamente"));
    }

    @PostMapping("/{idProd}/stock")
    public ResponseEntity<apiResponse<Void>> incrementarStock(@PathVariable Integer idProd,
            @RequestParam int cantidad) {
        service.incrementarStock(idProd, cantidad);
        return ResponseEntity.ok(responseUtil.success(null, "Stock actualizado exitosamente"));
    }

    @DeleteMapping("/{idProd}")
    public ResponseEntity<apiResponse<Void>> eliminar(@PathVariable Integer idProd) {
        service.eliminar(idProd);
        return ResponseEntity.ok(responseUtil.success(null, "Producto eliminado exitosamente"));
    }
}
