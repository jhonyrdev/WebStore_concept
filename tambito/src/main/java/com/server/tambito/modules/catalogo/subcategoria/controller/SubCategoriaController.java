package com.server.tambito.modules.catalogo.subcategoria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.*;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.subcategoria.dto.*;
import com.server.tambito.modules.catalogo.subcategoria.service.SubCategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subcategorias")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class SubCategoriaController {

    private final SubCategoriaService service;

    @PostMapping
    public ResponseEntity<apiResponse<SubCategoriaListDto>> registrar(@RequestBody SubCategoriaCreateDto dto) {
        return ResponseEntity.ok(responseUtil.success(
                service.registrar(dto),
                "Subcategoría registrada exitosamente"));
    }
}
