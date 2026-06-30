package com.server.tambito.modules.catalogo.promocion.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.commons.enums.EstadoGeneralEnum;
import com.server.tambito.commons.exception.*;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.catalogo.promocion.dto.request.PromocionRequestDto;
import com.server.tambito.modules.catalogo.promocion.dto.response.*;
import com.server.tambito.modules.catalogo.promocion.entity.Promocion;
import com.server.tambito.modules.catalogo.promocion.mapper.PromocionMapper;
import com.server.tambito.modules.catalogo.promocion.repository.PromocionRepository;

@Service

public class PromocionService extends BaseService<Promocion, Integer> {

    private final PromocionRepository promocionRepository;
    private final PromocionMapper mapper;

    public PromocionService(PromocionRepository repo, PromocionMapper mapper) {
        super(repo);
        this.promocionRepository = repo;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<PromocionListDto> listarPromocionesPublicas() {
        return mapper.toListDtoList(promocionRepository.findAll());
    }

    @Transactional
    public PromocionResponseDto registrarPromocion(PromocionRequestDto dto) {
        validarNombreUnico(dto.getNombre(), null);

        Promocion promocion = mapper.toEntity(dto);
        promocion.setEstado(dto.getEstado() != null ? dto.getEstado() : EstadoGeneralEnum.ACTIVO);

        Promocion guardada = promocionRepository.save(promocion);
        return mapper.toResponseDto(guardada);
    }

    @Transactional
    public PromocionResponseDto actualizarPromocion(Integer idPromocion, PromocionRequestDto dto) {
        Promocion promocion = promocionRepository.findById(idPromocion)
                .orElseThrow(() -> new ResourceNotFoundException("Promoción no encontrada con id: " + idPromocion));

        validarNombreUnico(dto.getNombre(), idPromocion);

        mapper.updateEntity(dto, promocion);
        if (dto.getEstado() != null) {
            promocion.setEstado(dto.getEstado());
        }

        Promocion actualizada = promocionRepository.save(promocion);
        return mapper.toResponseDto(actualizada);
    }

    @Transactional
    public void eliminarPromocion(Integer idPromocion) {
        Promocion promocion = promocionRepository.findByIdWithProducts(idPromocion)
                .orElseThrow(() -> new ResourceNotFoundException("Promoción no encontrada con id: " + idPromocion));

        if (promocion.getProductos() != null && !promocion.getProductos().isEmpty()) {
            throw new BadRequestException(
                    "No se puede eliminar la promoción porque está siendo utilizada por uno o más productos");
        }

        promocionRepository.delete(promocion);
    }

    private void validarNombreUnico(String nombre, Integer idActual) {
        promocionRepository.findByNombreIgnoreCase(nombre).ifPresent(existing -> {
            if (idActual == null || !existing.getIdPromocion().equals(idActual)) {
                throw new BadRequestException("La promoción '" + nombre + "' ya existe");
            }
        });
    }

}
