package com.server.tambito.modules.catalogo.promocion.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.server.tambito.modules.catalogo.producto.entity.Producto;
import com.server.tambito.modules.catalogo.producto.repository.ProductoRepository;
import com.server.tambito.modules.catalogo.promocion.dto.request.ProductoPromocionDto;
import com.server.tambito.modules.catalogo.promocion.dto.response.PromocionResponseDto;
import com.server.tambito.modules.catalogo.promocion.entity.Promocion;
import com.server.tambito.modules.catalogo.promocion.mapper.ProductoPromocionMapper;
import com.server.tambito.modules.catalogo.promocion.repository.PromocionRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductoPromocionService {

    private final ProductoRepository productoRepository;
    private final PromocionRepository promocionRepository;
    private final ProductoPromocionMapper mapper;

    public List<PromocionResponseDto> asignarPromocion(ProductoPromocionDto requestDto) {

        Producto producto = productoRepository.findById(requestDto.getIdProd())
                .orElseThrow(() -> new RuntimeException(
                        "Producto no encontrado con ID: " + requestDto.getIdProd()));

        Promocion promocion = promocionRepository.findById(requestDto.getIdPromocion())
                .orElseThrow(() -> new RuntimeException(
                        "Promoción no encontrada con ID: " + requestDto.getIdPromocion()));

        boolean yaAsignada = producto.getPromociones().stream()
                .anyMatch(p -> p.getIdPromocion().equals(requestDto.getIdPromocion()));

        if (yaAsignada) {
            throw new RuntimeException("La promoción ya está asignada a este producto");
        }

        producto.getPromociones().add(promocion);
        productoRepository.save(producto);

        // 5. Retornar las promociones actuales del producto
        return mapper.toResponseDtoList(
                producto.getPromociones().stream().collect(Collectors.toList()));
    }

    public List<PromocionResponseDto> quitarPromocion(ProductoPromocionDto requestDto) {

        // 1. Validar que el producto exista
        Producto producto = productoRepository.findById(requestDto.getIdProd())
                .orElseThrow(() -> new RuntimeException(
                        "Producto no encontrado con ID: " + requestDto.getIdProd()));

        // 2. Validar que la promoción exista
        Promocion promocion = promocionRepository.findById(requestDto.getIdPromocion())
                .orElseThrow(() -> new RuntimeException(
                        "Promoción no encontrada con ID: " + requestDto.getIdPromocion()));

        // 3. Quitar la promoción del producto
        boolean fueQuitada = producto.getPromociones().remove(promocion);

        if (!fueQuitada) {
            throw new RuntimeException("La promoción no estaba asignada a este producto");
        }

        productoRepository.save(producto);

        // 4. Retornar las promociones actuales del producto
        return mapper.toResponseDtoList(
                producto.getPromociones().stream().collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public List<PromocionResponseDto> obtenerPromocionesDeProducto(Integer idProd) {

        // 1. Validar que el producto exista
        Producto producto = productoRepository.findById(idProd)
                .orElseThrow(() -> new RuntimeException(
                        "Producto no encontrado con ID: " + idProd));

        // 2. Retornar sus promociones mapeadas
        return mapper.toResponseDtoList(
                producto.getPromociones().stream().collect(Collectors.toList()));
    }
}
