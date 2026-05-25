package com.server.tambito.modules.usuarios.cliente.controller.controller_Public;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.usuarios.cliente.dto.ClienteListDto;
import com.server.tambito.modules.usuarios.cliente.service.ClienteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/clientes")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ClientePublicController {
    
    private final ClienteService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<ClienteListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(service.listar(), "Clientes listados exitosamente"));
    }

    /*@GetMapping("/{idCli}")
    public ResponseEntity<apiResponse<ClienteListDto>> obtener(@PathVariable Integer idCli) {
        return ResponseEntity.ok(responseUtil.success(service.obtenerPorId(idCli), "Cliente encontrado"));
    }*/
}
