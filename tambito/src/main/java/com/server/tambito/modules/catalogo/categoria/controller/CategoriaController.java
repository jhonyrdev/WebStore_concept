package com.server.tambito.modules.catalogo.categoria.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.catalogo.categoria.dto.CategoriaCreateDto;
import com.server.tambito.modules.catalogo.categoria.dto.CategoriaListDto;
import com.server.tambito.modules.catalogo.categoria.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<apiResponse<List<CategoriaListDto>>> listar() {
        List<CategoriaListDto> categorias = categoriaService.listarCategorias();
        return ResponseEntity.ok(responseUtil.success(categorias, "Categorías listadas exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<apiResponse<CategoriaListDto>> registrar(@RequestBody CategoriaCreateDto dto) {
        CategoriaListDto categoria = categoriaService.registrarCategoria(dto);
        return ResponseEntity.ok(responseUtil.success(categoria, "Categoría registrada exitosamente"));
    }
}
