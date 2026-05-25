package com.server.tambito.modules.catalogo.subcategoria.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.subcategoria.dto.*;
import com.server.tambito.modules.catalogo.subcategoria.service.SubCategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/subcategorias")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SubCategoriaPublicController {
    
    private final SubCategoriaService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<SubCategoriaListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarTodas(),
                "Subcategorías listadas exitosamente"));
    }

    @GetMapping("/detalles")
    public ResponseEntity<apiResponse<List<SubCategoriaDetalleDto>>> listarConDetalles() {
        return ResponseEntity.ok(responseUtil.success(
                service.listarConCategoria(),
                "Subcategorías con detalles listadas exitosamente"));
    }

    @GetMapping("/categoria/{idCat}")
    public ResponseEntity<apiResponse<List<SubCategoriaListDto>>> listar(@PathVariable Integer idCat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorCategoria(idCat),
                "Subcategorías listadas exitosamente"));
    }
}
