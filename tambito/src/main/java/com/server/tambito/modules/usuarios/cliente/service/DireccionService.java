package com.server.tambito.modules.usuarios.cliente.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.*;
import com.server.tambito.commons.validator.AsignadoValidator;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.pedidos.repository.PedidoRepository;
import com.server.tambito.modules.usuarios.cliente.dto.*;
import com.server.tambito.modules.usuarios.cliente.entity.*;
import com.server.tambito.modules.usuarios.cliente.mapper.DireccionMapper;
import com.server.tambito.modules.usuarios.cliente.repository.*;

import jakarta.transaction.Transactional;

@Service
public class DireccionService extends BaseService<Direccion, Integer> {

    private final DireccionRepository direccionRepository;
    private final ClienteRepository clienteRepository;
    private final DireccionMapper mapper;
    private final PedidoRepository pedidoRepository;
    private final AsignadoValidator asignadoValidator;

    public DireccionService(
            DireccionRepository direccionRepository,
            ClienteRepository clienteRepository,
            DireccionMapper mapper,
            PedidoRepository pedidoRepository, AsignadoValidator asignadoValidator) {
        super(direccionRepository);
        this.direccionRepository = direccionRepository;
        this.clienteRepository = clienteRepository;
        this.mapper = mapper;
        this.pedidoRepository = pedidoRepository;
        this.asignadoValidator = asignadoValidator;
    }

    public List<DireccionListDto> listar() {
        return mapper.toDtoList(findAll());
    }

    public List<DireccionListDto> listarPorCliente(Integer idCli) {
        return mapper.toDtoList(direccionRepository.findByCliente_IdCli(idCli));
    }

    public DireccionListDto obtenerPorId(Integer idDir) {
        Direccion direccion = findById(idDir)
                .orElseThrow(() -> new ResourceNotFoundException("Dirección no encontrada con id: " + idDir));
        return mapper.toDto(direccion);
    }

    @Transactional
    public DireccionListDto agregar(Integer idCli, DireccionDto dto) {
        Cliente cliente = clienteRepository.findById(idCli)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + idCli));

        Direccion direccion = mapper.toEntity(dto);
        direccion.setCliente(cliente);

        Direccion guardada = save(direccion);
        return mapper.toDto(guardada);
    }

    @Transactional
    public DireccionListDto actualizar(Integer idDir, DireccionDto dto) {
        Direccion direccion = findById(idDir)
                .orElseThrow(() -> new ResourceNotFoundException("Dirección no encontrada con id: " + idDir));

        mapper.updateEntity(dto, direccion);

        Direccion actualizada = save(direccion);
        return mapper.toDto(actualizada);
    }

    @Transactional
    public void eliminar(Integer idDir) {
        Direccion direccion = findById(idDir)
                .orElseThrow(() -> new ResourceNotFoundException("Dirección no encontrada con id: " + idDir));

        asignadoValidator.validarDireccionNoEnUso(idDir);

        deleteById(direccion.getIdDir());
    }

    public boolean estaEnUso(Integer idDir) {
        return pedidoRepository.existsByDireccion_IdDir(idDir);
    }
}
