package com.server.tambito.modules.catalogo.categoria.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.BadRequestException;
import com.server.tambito.commons.exception.ResourceNotFoundException;
import com.server.tambito.commons.validator.AsignadoValidator;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.catalogo.categoria.dto.CategoriaCreateDto;
import com.server.tambito.modules.catalogo.categoria.dto.CategoriaListDto;
import com.server.tambito.modules.catalogo.categoria.entity.Categoria;
import com.server.tambito.modules.catalogo.categoria.mapper.CategoriaMapper;
import com.server.tambito.modules.catalogo.categoria.repository.CategoriaRepository;

import jakarta.transaction.Transactional;

@Service

public class CategoriaService extends BaseService<Categoria, Integer> {

    private final CategoriaRepository categoriaRepository;
    private final CategoriaMapper mapper;
    private final AsignadoValidator asignadoValidator;

    public CategoriaService(CategoriaRepository repo, CategoriaMapper mapper, AsignadoValidator asignadoValidator) {
        super(repo);
        this.categoriaRepository = repo;
        this.mapper = mapper;
        this.asignadoValidator = asignadoValidator;
    }

    public List<CategoriaListDto> listarCategorias() {
        return mapper.toDtoList(categoriaRepository.findAll());
    }

    public CategoriaListDto registrarCategoria(CategoriaCreateDto dto) {
        if (categoriaRepository.findByNomCatIgnoreCase(dto.getNombre()).isPresent()) {
            throw new BadRequestException("La categoría '" + dto.getNombre() + "' ya existe");
        }
        Categoria entity = mapper.toEntity(dto);
        Categoria saved = categoriaRepository.save(entity);
        return mapper.toDto(saved);
    }

    public Categoria buscarPorNombre(String nombre) {
        return categoriaRepository.findByNomCatIgnoreCase(nombre)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría '" + nombre + "' no encontrada"));
    }

    @Transactional
    public void eliminar(Integer idCat) {
        if (!findById(idCat).isPresent()) {
            throw new ResourceNotFoundException("Categoría no encontrada con id: " + idCat);
        }
        asignadoValidator.validarCategoriaNoEnUso(idCat);
        deleteById(idCat);
    }
}