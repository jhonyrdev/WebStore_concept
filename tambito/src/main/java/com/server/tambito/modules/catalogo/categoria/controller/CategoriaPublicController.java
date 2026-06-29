package com.server.tambito.modules.catalogo.categoria.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.categoria.dto.CategoriaListDto;
import com.server.tambito.modules.catalogo.categoria.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaPublicController {
    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<apiResponse<List<CategoriaListDto>>> listar() {
        List<CategoriaListDto> categorias = categoriaService.listarCategorias();
        return ResponseEntity.ok(responseUtil.success(categorias, "Categorías listadas exitosamente"));
    }
}
