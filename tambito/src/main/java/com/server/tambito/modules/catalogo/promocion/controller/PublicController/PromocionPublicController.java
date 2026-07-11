package com.server.tambito.modules.catalogo.promocion.controller.PublicController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.tambito.commons.response.apiResponse;
import com.server.tambito.commons.response.responseUtil;
import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionListDto;
import com.server.tambito.modules.catalogo.promocion.service.PromocionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/promociones")
@CrossOrigin(origins = "http://localhost:4200")
public class PromocionPublicController {

    private final PromocionService promocionService;

    @GetMapping
    public ResponseEntity<apiResponse<List<PromocionListDto>>> listar() {
        List<PromocionListDto> promociones = promocionService.listarPromocionesPublicas();
        return ResponseEntity.ok(responseUtil.success(promociones, "Promociones listadas exitosamente"));
    }
}
