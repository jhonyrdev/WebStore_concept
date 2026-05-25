package com.server.tambito.modules.venta.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.server.tambito.commons.exception.*;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.venta.dto.*;
import com.server.tambito.modules.venta.entity.MetodoPago;
import com.server.tambito.modules.venta.mapper.MetodoPagoMapper;
import com.server.tambito.modules.venta.repository.MetodoPagoRepository;

@Service
public class MetodoPagoService extends BaseService<MetodoPago, Integer> {

    private final MetodoPagoRepository metodoPagoRepository;
    private final MetodoPagoMapper mapper;

    public MetodoPagoService(MetodoPagoRepository repo, MetodoPagoMapper mapper) {
        super(repo);
        this.metodoPagoRepository = repo;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<MetodoPagoListDto> listarMetodosPago() {
        return mapper.toDtoList(metodoPagoRepository.findAll());
    }

    @Transactional(readOnly = true)
    public MetodoPagoListDto obtenerMetodoPagoPorId(Integer id) {
        MetodoPago metodo = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado con ID: " + id));
        return mapper.toDto(metodo);
    }

    @Transactional
    public MetodoPagoListDto crearMetodoPago(MetodoPagoDto dto) {
        if (metodoPagoRepository.findByNombreMetodoIgnoreCase(dto.getNombreMetodo()).isPresent()) {
            throw new BadRequestException("El método de pago '" + dto.getNombreMetodo() + "' ya existe");
        }
        MetodoPago entity = mapper.toEntity(dto);
        MetodoPago saved = metodoPagoRepository.save(entity);
        return mapper.toDto(saved);
    }

    @Transactional
    public MetodoPagoListDto actualizarMetodoPago(Integer id, MetodoPagoDto dto) {
        MetodoPago metodo = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado con ID: " + id));

        metodoPagoRepository.findByNombreMetodoIgnoreCase(dto.getNombreMetodo())
                .ifPresent(existing -> {
                    if (!existing.getIdMetodo().equals(id)) {
                        throw new BadRequestException("El método de pago '" + dto.getNombreMetodo() + "' ya existe");
                    }
                });

        metodo.setNombreMetodo(dto.getNombreMetodo());
        metodo.setTipo(dto.getTipo());

        MetodoPago updated = metodoPagoRepository.save(metodo);
        return mapper.toDto(updated);
    }

    @Transactional
    public MetodoPagoListDto cambiarEstadoMetodoPago(Integer id) {
        MetodoPago metodo = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado con ID: " + id));

        metodo.setEstado(!metodo.getEstado());
        MetodoPago updated = metodoPagoRepository.save(metodo);
        return mapper.toDto(updated);
    }

    @Transactional
    public void eliminarMetodoPago(Integer id) {
        if (!metodoPagoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Método de pago no encontrado con ID: " + id);
        }
        metodoPagoRepository.deleteById(id);
    }
}
