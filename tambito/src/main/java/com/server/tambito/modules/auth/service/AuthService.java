package com.server.tambito.modules.auth.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.server.tambito.modules.auth.dto.request.LoginLocalRequestDTO;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

import lombok.*;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final LocalAuthService localAuthService;
    private final GoogleAuthService googleAuthService;

    public Credencial loginCliente(LoginLocalRequestDTO dto) {
        return localAuthService.authenticateCliente(dto.getUsername(), dto.getPassword());
    }

    public Credencial loginAdmin(LoginLocalRequestDTO dto) {
        return localAuthService.authenticateAdmin(dto.getUsername(), dto.getPassword());
    }

    public Cliente loginGoogle(Map<String, Object> googleUser) {
        return googleAuthService.processGoogleUser(googleUser);
    }

}
