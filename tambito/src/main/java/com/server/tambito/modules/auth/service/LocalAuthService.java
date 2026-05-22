package com.server.tambito.modules.auth.service;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.UnAuthorizedException;
import com.server.tambito.commons.service.RequestAttemptService;
import com.server.tambito.commons.validator.LoginValidator;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.enums.*;
import com.server.tambito.modules.auth.repository.CredencialRepository;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class LocalAuthService {
    
    private static final int CLIENT_MAX_ATTEMPTS = 3;
    private static final int ADMIN_MAX_ATTEMPTS = 2;
    private static final long WINDOW_SECONDS = 180;

    private final CredencialRepository credencialRepository;
    private final ClienteRepository clienteRepository;
    private final LoginValidator loginValidator;
    private final RequestAttemptService requestAttemptService;

    public Credencial authenticateCliente(String username, String password) {
        String key = buildKey("cliente", username);

        if (requestAttemptService.isBlocked(key, CLIENT_MAX_ATTEMPTS, WINDOW_SECONDS)) {
            throw new UnAuthorizedException("Demasiados intentos, intenta más tarde");
        }

        try {
            Credencial cred = credencialRepository.findByUsuario(username)
                    .orElseGet(() -> clienteRepository.findByCorreoCli(username)
                            .map(cliente -> cliente.getCredencial())
                            .orElseThrow(() -> new UnAuthorizedException("Credenciales inválidas")));

            loginValidator.validateCredentials(cred, password, LoginType.LOCAL, RolEnum.CLIENTE);
            requestAttemptService.clearAttempts(key);
            return cred;
        } catch (RuntimeException ex) {
            requestAttemptService.registerAttempt(key, CLIENT_MAX_ATTEMPTS, WINDOW_SECONDS);
            throw ex;
        }
    }

    public Credencial authenticateAdmin(String username, String password) {
        String key = buildKey("admin", username);

        if (requestAttemptService.isBlocked(key, ADMIN_MAX_ATTEMPTS, WINDOW_SECONDS)) {
            throw new UnAuthorizedException("Demasiados intentos, intenta más tarde");
        }

        try {
            Credencial cred = credencialRepository.findByUsuario(username)
                    .orElseThrow(() -> new UnAuthorizedException("Credenciales inválidas"));

            loginValidator.validateCredentials(cred, password, LoginType.LOCAL, RolEnum.ADMIN);
            requestAttemptService.clearAttempts(key);
            return cred;
        } catch (RuntimeException ex) {
            requestAttemptService.registerAttempt(key, ADMIN_MAX_ATTEMPTS, WINDOW_SECONDS);
            throw ex;
        }
    }

    private String buildKey(String prefix, String username) {
        return prefix + ":" + username.trim().toLowerCase();
    }

}
