package com.server.tambito.commons.validator;

import org.springframework.stereotype.Component;

import com.server.tambito.commons.exception.BadRequestException;
import com.server.tambito.modules.usuarios.admin.repository.AdministradorRepository;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;

import lombok.*;

@Component
@RequiredArgsConstructor
public class RegistrationValidator {

    private final ClienteRepository clienteRepository;
    private final AdministradorRepository administradorRepository;

    public void validateString(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new BadRequestException(fieldName + " es obligatorio");
        }
    }

    public void validatePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new BadRequestException("La contraseña es obligatoria");
        }
        if (password.length() < 6) {
            throw new BadRequestException("La contraseña debe tener al menos 6 caracteres");
        }
    }

    public void validateClienteRegistration(String nombre, String apellido, String email, String password) {
        validateString(nombre, "El nombre");
        validateString(apellido, "El apellido");
        validateString(email, "El email");
        validatePassword(password);
        validateClienteEmailNotExists(email);
    }

    private void validateClienteEmailNotExists(String email) {
        if (clienteRepository.findByCorreoCli(email).isPresent()) {
            throw new BadRequestException("El email ya está registrado");
        }
    }

    public void validateAdminRegistration(String nombre, String email, String password) {
        validateString(nombre, "El nombre");
        validateString(email, "El email");
        validatePassword(password);
        validateAdminEmailNotExists(email);
    }

    private void validateAdminEmailNotExists(String email) {
        if (administradorRepository.findByCorreoAdmin(email).isPresent()) {
            throw new BadRequestException("El email ya está registrado");
        }
    }
}