package com.server.tambito.modules.usuarios.cliente.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.modules.usuarios.cliente.dto.ClienteDto;
import com.server.tambito.modules.usuarios.cliente.dto.ClienteListDto;
import com.server.tambito.modules.usuarios.cliente.service.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;

    @GetMapping
    public ResponseEntity<apiResponse<List<ClienteListDto>>> listar() {
        return ResponseEntity.ok(responseUtil.success(service.listar(), "Clientes listados exitosamente"));
    }

    @GetMapping("/{idCli}")
    public ResponseEntity<apiResponse<ClienteListDto>> obtener(@PathVariable Integer idCli) {
        return ResponseEntity.ok(responseUtil.success(service.obtenerPorId(idCli), "Cliente encontrado"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @PutMapping("/{idCli}")
    public ResponseEntity<apiResponse<ClienteListDto>> actualizar(@PathVariable Integer idCli,
            @Valid @RequestBody ClienteDto dto) {
        return ResponseEntity
                .ok(responseUtil.success(service.actualizar(idCli, dto), "Cliente actualizado exitosamente"));
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @PutMapping("/{idCli}/dni/{dni}")
    public ResponseEntity<apiResponse<ClienteListDto>> actualizarPorDni(@PathVariable Integer idCli,
            @PathVariable String dni) {
        return ResponseEntity.ok(responseUtil.success(service.actualizarPorDni(idCli, dni),
                "Cliente actualizado por DNI exitosamente"));
    }
}