package com.server.tambito.modules.catalogo.subcategoria.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.catalogo.subcategoria.dto.SubCategoriaCreateDto;
import com.server.tambito.modules.catalogo.subcategoria.dto.SubCategoriaListDto;
import com.server.tambito.modules.catalogo.subcategoria.service.SubCategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/subcategorias")
@RequiredArgsConstructor
public class SubCategoriaController {

    private final SubCategoriaService service;

    @GetMapping("/categoria/{idCat}")
    public ResponseEntity<apiResponse<List<SubCategoriaListDto>>> listar(@PathVariable Integer idCat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorCategoria(idCat),
                "Subcategorías listadas exitosamente"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<apiResponse<SubCategoriaListDto>> registrar(@RequestBody SubCategoriaCreateDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.registrar(dto),
                "Subcategoría registrada exitosamente"));
    }
}
