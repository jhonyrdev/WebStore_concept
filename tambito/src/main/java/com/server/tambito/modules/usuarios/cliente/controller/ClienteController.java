package com.server.tambito.modules.usuarios.cliente.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.usuarios.cliente.dto.*;
import com.server.tambito.modules.usuarios.cliente.service.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('CLIENTE')")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;
    
    @PutMapping("/{idCli}")
    public ResponseEntity<apiResponse<ClienteListDto>> actualizar(@PathVariable Integer idCli,
            @Valid @RequestBody ClienteDto dto) {
        return ResponseEntity
                .ok(responseUtil.success(service.actualizar(idCli, dto), "Cliente actualizado exitosamente"));
    }
    
    @PutMapping("/{idCli}/dni/{dni}")
    public ResponseEntity<apiResponse<ClienteListDto>> actualizarPorDni(@PathVariable Integer idCli,
            @PathVariable String dni) {
        return ResponseEntity.ok(responseUtil.success(service.actualizarPorDni(idCli, dni),
                "Cliente actualizado por DNI exitosamente"));
    }
}