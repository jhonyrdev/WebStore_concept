package com.server.tambito.modules.catalogo.producto.controller.controller_Public;

import java.util.List;

import org.springframework.http.HttpStatus; // 👈 Agregado
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException; // 👈 Agregado

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.*;
import com.server.tambito.modules.catalogo.producto.service.ProductoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/producto")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ProductoPublicController {

    private final ProductoService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<ProductoCardDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarTodos(),
                "Productos listados exitosamente"));
    }

    @GetMapping("/cards")
    public ResponseEntity<apiResponse<List<ProductoCardDto>>> listarCards() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarCards(),
                "Productos listados exitosamente"));
    }

    @GetMapping("/admin")
    public ResponseEntity<apiResponse<List<ProductoAdminDto>>> listarAdmin() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarParaAdmin(), 
                "Productos listados exitosamente"));
    }

    @GetMapping("/{idProd}")
    public ResponseEntity<apiResponse<ProductoListDto>> obtenerPorId(@PathVariable Integer idProd) {
        return ResponseEntity.ok(responseUtil.success(
                service.obtenerPorId(idProd),
                "Producto encontrado exitosamente"));
    }

    // 🚀 MODIFICADO: Aquí es donde realmente está apuntando tu Angular. 
    // Ahora atrapará el error correctamente y enviará el 400.
    @PostMapping("/asignar-promocion")
    public ResponseEntity<?> asignarPromocion(@RequestBody AsignarPromocionDto dto) {
        try {
            service.vincularPromocion(dto);
            return ResponseEntity.ok(responseUtil.success(null, "Promoción asignada exitosamente al producto"));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new apiResponse<>(false, e.getReason(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new apiResponse<>(false, "Error interno inesperado en el servidor", null));
        }
    }
}