package com.server.tambito.modules.catalogo.producto.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.ResourceNotFoundException;
import com.server.tambito.commons.validator.AsignadoValidator;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.catalogo.producto.dto.UnidadDto;
import com.server.tambito.modules.catalogo.producto.dto.UnidadListDto;
import com.server.tambito.modules.catalogo.producto.entity.Unidad;
import com.server.tambito.modules.catalogo.producto.mapper.UnidadMapper;
import com.server.tambito.modules.catalogo.producto.repository.UnidadRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UnidadService extends BaseService<Unidad, Integer> {

    private final UnidadMapper mapper;
    private final AsignadoValidator asignadoValidator;

    public UnidadService(UnidadRepository repository, UnidadMapper mapper, AsignadoValidator asignadoValidator) {
        super(repository);
        this.mapper = mapper;
        this.asignadoValidator = asignadoValidator;
    }

    public List<UnidadListDto> listar() {
        return mapper.toListDtoList(findAll());
    }

    public UnidadListDto obtenerPorId(Integer idUnidad) {
        Unidad unidad = findById(idUnidad)
                .orElseThrow(() -> new EntityNotFoundException("Unidad no encontrada con id: " + idUnidad));
        return mapper.toListDto(unidad);
    }

    @Transactional
    public UnidadListDto guardar(UnidadDto dto) {
        Unidad unidad = mapper.toEntity(dto);
        Unidad guardada = save(unidad);
        return mapper.toListDto(guardada);
    }

    @Transactional
    public UnidadListDto actualizar(Integer idUnidad, UnidadDto dto) {
        Unidad unidad = findById(idUnidad)
                .orElseThrow(() -> new EntityNotFoundException("Unidad no encontrada con id: " + idUnidad));

        mapper.updateEntity(dto, unidad);
        Unidad actualizada = save(unidad);
        return mapper.toListDto(actualizada);
    }

    @Transactional
    public void eliminar(Integer idUnidad) {
        if (!findById(idUnidad).isPresent()) {
            throw new ResourceNotFoundException("Unidad no encontrada con id: " + idUnidad);
        }
        asignadoValidator.validarUnidadNoEnUso(idUnidad);
        deleteById(idUnidad);
    }
}