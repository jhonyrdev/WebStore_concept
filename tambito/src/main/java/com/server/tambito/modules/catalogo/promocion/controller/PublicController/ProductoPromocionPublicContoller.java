package com.server.tambito.modules.catalogo.promocion.controller.PublicController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionResponseDto;
import com.server.tambito.modules.catalogo.promocion.service.ProductoPromocionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/productos-promociones")
@RequiredArgsConstructor
public class ProductoPromocionPublicContoller {

    private final ProductoPromocionService productoPromocionService;

        @GetMapping("/producto/{idProd}")
    public ResponseEntity<List<PromocionResponseDto>> obtenerPromocionesDeProducto(
            @PathVariable Integer idProd) {
        
        List<PromocionResponseDto> result = productoPromocionService.obtenerPromocionesDeProducto(idProd);
        return ResponseEntity.ok(result);
    }
}
