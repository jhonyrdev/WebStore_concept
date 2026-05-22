package com.server.tambito.modules.catalogo.subcategoria.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.server.tambito.commons.exception.ResourceNotFoundException;
import com.server.tambito.commons.validator.AsignadoValidator;
import com.server.tambito.modules.catalogo.categoria.entity.Categoria;
import com.server.tambito.modules.catalogo.categoria.repository.CategoriaRepository;
import com.server.tambito.modules.catalogo.subcategoria.dto.*;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;
import com.server.tambito.modules.catalogo.subcategoria.mapper.SubCategoriaMapper;
import com.server.tambito.modules.catalogo.subcategoria.repository.SubCategoriaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubCategoriaService {

    private final SubCategoriaRepository subCategoriaRepository;
    private final CategoriaRepository categoriaRepo;
    private final SubCategoriaMapper mapper;
    private final AsignadoValidator asignadoValidator;

    public List<SubCategoriaListDto> listarPorCategoria(Integer idCat) {
        return mapper.toDtoList(subCategoriaRepository.findByCategoriaIdCat(idCat));
    }

    public SubCategoriaListDto registrar(SubCategoriaCreateDto dto) {

        Categoria categoria = categoriaRepo.findById(dto.getIdCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        SubCategoria entity = mapper.toEntity(dto);
        entity.setCategoria(categoria);

        SubCategoria saved = subCategoriaRepository.save(entity);

        return mapper.toDto(saved);
    }

    @Transactional
    public void eliminar(Integer idSubcat) {
        if (!subCategoriaRepository.findById(idSubcat).isPresent()) {
            throw new ResourceNotFoundException("SubCategoría no encontrada con id: " + idSubcat);
        }
        asignadoValidator.validarSubcategoriaNoEnUso(idSubcat);
        subCategoriaRepository.deleteById(idSubcat);
    }
}
