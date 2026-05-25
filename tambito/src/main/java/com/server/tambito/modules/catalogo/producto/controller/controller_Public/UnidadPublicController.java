package com.server.tambito.modules.catalogo.producto.controller.controller_Public;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.catalogo.producto.dto.UnidadListDto;
import com.server.tambito.modules.catalogo.producto.service.UnidadService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/unidad")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UnidadPublicController {
    private final UnidadService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<UnidadListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(
                service.listar(),
                "Unidades listadas exitosamente"));
    }

    @GetMapping("/{idUnidad}")
    public ResponseEntity<apiResponse<UnidadListDto>> obtenerPorId(@PathVariable Integer idUnidad) {
        return ResponseEntity.ok(responseUtil.success(
                service.obtenerPorId(idUnidad),
                "Unidad encontrada exitosamente"));
    }
}
