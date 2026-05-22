package com.server.tambito.modules.catalogo.producto.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.ResourceNotFoundException;
import com.server.tambito.commons.validator.AsignadoValidator;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.catalogo.producto.dto.*;
import com.server.tambito.modules.catalogo.producto.entity.Marca;
import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;
import com.server.tambito.modules.catalogo.producto.mapper.MarcaMapper;
import com.server.tambito.modules.catalogo.producto.repository.MarcaRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MarcaService extends BaseService<Marca, Integer> {

    private final AsignadoValidator asignadoValidator;

    private final MarcaMapper mapper;

    public MarcaService(MarcaRepository marcarepo, MarcaMapper mapper, AsignadoValidator asignadoValidator) {
        super(marcarepo);
        this.mapper = mapper;
        this.asignadoValidator = asignadoValidator;
    }

    public List<MarcaListDto> listar() {
        return mapper.toDtoList(((MarcaRepository) repo).findDistinctByProductosEstado(EstadoProductoEnum.DISPONIBLE));
    }

    public List<MarcaListDto> listarPorSubCategoria(Integer idSubcat) {
        return mapper.toDtoList(((MarcaRepository) repo).findDistinctByProductosSubcategoriaIdSubcat(idSubcat));
    }

    public List<MarcaListDto> listarPorCategoria(Integer idCat) {
        return mapper.toDtoList(((MarcaRepository) repo).findDistinctByProductosSubcategoriaCategoriaIdCat(idCat));
    }

    @Transactional
    public MarcaListDto crear(MarcaDto dto) {
        Marca marca = mapper.toEntity(dto);
        Marca guardada = save(marca);
        return mapper.toDto(guardada);
    }

    @Transactional
    public MarcaListDto actualizar(Integer idMarca, MarcaDto dto) {
        Marca marca = findById(idMarca)
                .orElseThrow(() -> new EntityNotFoundException("Marca no encontrada con id: " + idMarca));

        mapper.updateEntity(dto, marca);
        Marca actualizada = save(marca);
        return mapper.toDto(actualizada);
    }

    @Transactional
    public void eliminar(Integer idMarca) {
        if (!findById(idMarca).isPresent()) {
            throw new ResourceNotFoundException("Marca no encontrada con id: " + idMarca);
        }
        asignadoValidator.validarMarcaNoEnUso(idMarca);
        deleteById(idMarca);
    }
}