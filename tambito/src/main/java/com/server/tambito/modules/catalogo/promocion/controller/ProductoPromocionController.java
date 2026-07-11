package com.server.tambito.modules.catalogo.promocion.controller;

import java.util.List;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.modules.catalogo.promocion.dto.request.ProductoPromocionDto;
import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionResponseDto;
import com.server.tambito.modules.catalogo.promocion.service.ProductoPromocionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/productos-promociones")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
public class ProductoPromocionController {

    private final ProductoPromocionService productoPromocionService;

    @PostMapping("/asignar")
    public ResponseEntity<List<PromocionResponseDto>> asignarPromocion(
            @Valid @RequestBody ProductoPromocionDto requestDto) {
        
        List<PromocionResponseDto> result = productoPromocionService.asignarPromocion(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/quitar")
    public ResponseEntity<List<PromocionResponseDto>> quitarPromocion(
            @Valid @RequestBody ProductoPromocionDto requestDto) {
        
        List<PromocionResponseDto> result = productoPromocionService.quitarPromocion(requestDto);
        return ResponseEntity.ok(result);
    }
 
}
