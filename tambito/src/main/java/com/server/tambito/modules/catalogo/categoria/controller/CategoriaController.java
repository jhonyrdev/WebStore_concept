package com.server.tambito.modules.catalogo.categoria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.categoria.dto.*;
import com.server.tambito.modules.catalogo.categoria.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<apiResponse<CategoriaListDto>> registrar(@RequestBody CategoriaCreateDto dto) {
        CategoriaListDto categoria = categoriaService.registrarCategoria(dto);
        return ResponseEntity.ok(responseUtil.success(categoria, "Categoría registrada exitosamente"));
    }
}
