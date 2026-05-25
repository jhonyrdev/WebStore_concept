package com.server.tambito.modules.catalogo.producto.controller.controller_Public;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.MarcaListDto;
import com.server.tambito.modules.catalogo.producto.service.MarcaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/marcas")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MarcaPublicController {
    
    private final MarcaService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<MarcaListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listar(),
                "Marcas listadas exitosamente"));
    }

    @GetMapping("/subcategoria/{idSubcat}")
    public ResponseEntity<apiResponse<List<MarcaListDto>>> porSubCategoria(@PathVariable Integer idSubcat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorSubCategoria(idSubcat),
                "Marcas listadas exitosamente"));
    }

    @GetMapping("/categoria/{idCat}")
    public ResponseEntity<apiResponse<List<MarcaListDto>>> porCategoria(@PathVariable Integer idCat) {
        return ResponseEntity.ok(responseUtil.success(
                service.listarPorCategoria(idCat),
                "Marcas listadas exitosamente"));
    }
}
