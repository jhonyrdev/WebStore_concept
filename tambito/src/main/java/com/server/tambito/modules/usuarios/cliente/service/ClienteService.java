package com.server.tambito.modules.usuarios.cliente.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.core.service.BaseService;
import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;
import com.server.tambito.modules.auth.service.RegistrationService;
import com.server.tambito.modules.usuarios.cliente.dto.*;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.mapper.ClienteMapper;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ClienteService extends BaseService<Cliente, Integer> {

    private final ClienteMapper mapper;
    private final RegistrationService registrationService;

    public ClienteService(ClienteRepository repo, ClienteMapper mapper, RegistrationService registrationService) {
        super(repo);
        this.mapper = mapper;
        this.registrationService = registrationService;
    }

    public List<ClienteListDto> listar() {
        return mapper.toDtoList(findAll());
    }

    public ClienteListDto obtenerPorId(Integer idCli) {
        Cliente c = findById(idCli)
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con id: " + idCli));
        return mapper.toDto(c);
    }

    @Transactional
    public ClienteListDto actualizar(Integer idCli, ClienteDto dto) {
        Cliente cliente = findById(idCli)
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con id: " + idCli));

        mapper.updateEntity(dto, cliente);
        Cliente actualizado = save(cliente);
        return mapper.toDto(actualizado);
    }

    @Transactional
    public ClienteListDto actualizarPorDni(Integer idCli, String dni) {
        DniResponseDTO datos = registrationService.consultarDniFull(dni);

        Cliente cliente = findById(idCli)
                .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con id: " + idCli));

        String nombre = datos.getFirstName();
        String apellido = (datos.getFirstLastName() == null ? "" : datos.getFirstLastName())
                + (datos.getSecondLastName() == null ? "" : " " + datos.getSecondLastName());

        cliente.setNomCli(nombre);
        cliente.setApeCli(apellido.trim());

        Cliente actualizado = save(cliente);
        return mapper.toDto(actualizado);
    }
}