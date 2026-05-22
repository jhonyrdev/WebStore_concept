package com.server.tambito.modules.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.ResourceNotFoundException;
import com.server.tambito.commons.validator.RegistrationValidator;
import com.server.tambito.core.service.UniqueCodeService;
import com.server.tambito.infrastructure.external.dni.DniLookupService;
import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;
import com.server.tambito.modules.auth.Mapper.CredencialMapper;
import com.server.tambito.modules.auth.dto.response.DniPreviewResponseDTO;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.enums.*;
import com.server.tambito.modules.auth.repository.CredencialRepository;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;
import com.server.tambito.modules.usuarios.admin.mapper.AdministradorMapper;
import com.server.tambito.modules.usuarios.admin.repository.AdministradorRepository;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.mapper.ClienteMapper;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final ClienteRepository clienteRepository;
    private final CredencialRepository credencialRepository;
    private final PasswordEncoder passwordEncoder;
    private final UniqueCodeService uniqueCodeService;
    private final AdministradorRepository administradorRepository;
    private final RegistrationValidator registrationValidator;
    private final DniLookupService dniLookupService;
    private final ClienteMapper clienteMapper;
    private final CredencialMapper credencialMapper;
    private final AdministradorMapper administradorMapper;

    public DniPreviewResponseDTO consultarDni(String dni) {
        DniResponseDTO datos = buscarDni(dni);
        return new DniPreviewResponseDTO(dni, datos.getFullName());
    }

    public Cliente registerClienteManual(String nombre, String apellido,
            String email, String password) {
        return buildAndSaveCliente(nombre, apellido, email, password);
    }

    public Cliente registerClienteDni(String dni, String email, String password) {
        DniResponseDTO datos = buscarDni(dni);
        String nombre = datos.getFirstName();
        String apellido = datos.getFirstLastName() + " " + datos.getSecondLastName();
        return buildAndSaveCliente(nombre, apellido, email, password);
    }

    public Administrador registerAdmin(String nombre, String email, String password) {
        registrationValidator.validateAdminRegistration(nombre, email, password);

        String usuario = uniqueCodeService.generarUsuario(nombre);
        String hash = passwordEncoder.encode(password);
        Credencial cred = credencialRepository.save(
                credencialMapper.fromRegistration(usuario, hash, RolEnum.ADMIN));

        return administradorRepository.save(
                administradorMapper.fromRegisterAdmin(nombre, email, cred));
    }

    private Cliente buildAndSaveCliente(String nombre, String apellido,
            String email, String password) {
        registrationValidator.validateClienteRegistration(nombre, apellido, email, password);

        String usuario = uniqueCodeService.generarUsuario(nombre);
        String codigo = uniqueCodeService.generarCodigo("CLI", "cliente_seq");
        String hash = passwordEncoder.encode(password);

        Credencial cred = credencialRepository.save(
                credencialMapper.fromRegistration(usuario, hash, RolEnum.CLIENTE));

        return clienteRepository.save(
                clienteMapper.fromRegisterManual(nombre, apellido, email, cred, codigo));
    }

    public DniResponseDTO consultarDniFull(String dni) {
        return buscarDni(dni);
    }

    private DniResponseDTO buscarDni(String dni) {
        try {
            return dniLookupService.consultar(dni);
        } catch (RuntimeException ex) {
            throw new ResourceNotFoundException("No se encontró información para el DNI " + dni);
        }
    }

}
