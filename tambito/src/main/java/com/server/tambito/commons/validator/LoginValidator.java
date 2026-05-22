package com.server.tambito.commons.validator;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.server.tambito.commons.exception.UnAuthorizedException;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.enums.*;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoginValidator {

    private final PasswordEncoder passwordEncoder;

    public void validateLoginType(Credencial cred, LoginType expectedLoginType) {
        if (cred.getLoginType() != expectedLoginType) {
            throw new UnAuthorizedException("Este usuario usa autenticación " + cred.getLoginType().name());
        }
    }

    public void validateRole(Credencial cred, RolEnum expectedRole) {
        if (cred.getRol() != expectedRole) {
            throw new UnAuthorizedException("No tienes permisos para acceder");
        }
    }

    public void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new UnAuthorizedException("Credenciales inválidas");
        }
    }

    public void validateCredentials(Credencial cred, String password, LoginType expectedLoginType, RolEnum expectedRole) {
        validateLoginType(cred, expectedLoginType);
        validateRole(cred, expectedRole);
        validatePassword(password, cred.getClave());
    }
}