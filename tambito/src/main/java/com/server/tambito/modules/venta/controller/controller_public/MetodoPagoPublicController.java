package com.server.tambito.modules.venta.controller.controller_public;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.server.tambito.commons.response.*;
import com.server.tambito.modules.venta.dto.MetodoPagoListDto;
import com.server.tambito.modules.venta.service.MetodoPagoService;
import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/metodos-pago")
@CrossOrigin(origins = "http://localhost:4200")
public class MetodoPagoPublicController {

    private final MetodoPagoService metodoPagoService;

    @GetMapping
    public ResponseEntity<apiResponse<List<MetodoPagoListDto>>> listar() {
        List<MetodoPagoListDto> metodos = metodoPagoService.listarMetodosPago();
        return ResponseEntity.ok(responseUtil.success(metodos, "Métodos de pago listados exitosamente"));
    }
}
