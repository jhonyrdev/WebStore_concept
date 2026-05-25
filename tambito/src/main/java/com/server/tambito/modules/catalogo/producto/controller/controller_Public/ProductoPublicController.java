package com.server.tambito.modules.catalogo.producto.controller.controller_Public;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<apiResponse<List<ProductoListDto>>> listar() {
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
}
