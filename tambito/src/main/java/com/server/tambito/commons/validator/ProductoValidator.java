package com.server.tambito.commons.validator;

import org.springframework.stereotype.Component;

import com.server.tambito.modules.catalogo.producto.dto.ProductoDto;
import com.server.tambito.modules.catalogo.producto.entity.*;
import com.server.tambito.modules.catalogo.producto.repository.*;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;
import com.server.tambito.modules.catalogo.subcategoria.repository.SubCategoriaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductoValidator {

    private final MarcaRepository marcaRepository;
    private final UnidadRepository unidadRepository;
    private final SubCategoriaRepository subCategoriaRepository;

    public Object[] validarYCargarEntidadesRelacionadas(ProductoDto dto) {
        validarIdsNoNulos(dto);

        Marca marca = marcaRepository.findById(dto.getIdMarca())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Marca no encontrada con id: " + dto.getIdMarca()));

        Unidad unidad = unidadRepository.findById(dto.getIdUnidad())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Unidad no encontrada con id: " + dto.getIdUnidad()));

        SubCategoria subcategoria = subCategoriaRepository.findById(dto.getIdSubcat())
                .orElseThrow(() -> new EntityNotFoundException(
                        "SubCategoria no encontrada con id: " + dto.getIdSubcat()));

        return new Object[] { marca, unidad, subcategoria };
    }


    private void validarIdsNoNulos(ProductoDto dto) {
        if (dto.getIdMarca() == null) {
            throw new IllegalArgumentException("El ID de la marca es requerido");
        }
        if (dto.getIdUnidad() == null) {
            throw new IllegalArgumentException("El ID de la unidad es requerida");
        }
        if (dto.getIdSubcat() == null) {
            throw new IllegalArgumentException("El ID de la subcategoría es requerido");
        }
    }
}
