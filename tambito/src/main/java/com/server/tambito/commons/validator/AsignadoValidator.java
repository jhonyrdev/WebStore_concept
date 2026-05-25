package com.server.tambito.commons.validator;

import org.springframework.stereotype.Component;

import com.server.tambito.commons.exception.BadRequestException;
import com.server.tambito.modules.catalogo.producto.repository.ProductoRepository;
import com.server.tambito.modules.catalogo.subcategoria.repository.SubCategoriaRepository;
import com.server.tambito.modules.pedidos.repository.PedidoRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AsignadoValidator {

    private final SubCategoriaRepository subCategoriaRepository;
    private final ProductoRepository productoRepository;
    private final PedidoRepository pedidoRepository;

    public void validarCategoriaNoEnUso(Integer idCat) {
        if (!subCategoriaRepository.findByCategoriaIdCat(idCat).isEmpty()) {
            throw new BadRequestException(
                    "No se puede eliminar la categoría porque tiene subcategorías asignadas");
        }
    }

    public void validarSubcategoriaNoEnUso(Integer idSubcat) {
        long countProductos = productoRepository.countBySubcategoria_IdSubcat(idSubcat);
        if (countProductos > 0) {
            throw new BadRequestException(
                    "No se puede eliminar la subcategoría porque tiene producto(s) asignado(s)");
        }
    }

    public void validarUnidadNoEnUso(Integer idUnidad) {
        long countProductos = productoRepository.countByUnidad_IdUnidad(idUnidad);
        if (countProductos > 0) {
            throw new BadRequestException(
                    "No se puede eliminar la unidad porque tiene producto(s) asignado(s)");
        }
    }

    public void validarDireccionNoEnUso(Integer idDir) {
        if (pedidoRepository.existsByDireccion_IdDir(idDir)) {
            throw new BadRequestException(
                    "No se puede eliminar la dirección porque está en uso en uno o más pedidos");
        }
    }

    public void validarMarcaNoEnUso(Integer idMarca) {
        long countProductos = productoRepository.countByMarca_IdMarca(idMarca);
        if (countProductos > 0) {
            throw new BadRequestException(
                    "No se puede eliminar la marca porque tiene producto(s) asignado(s)");
        }
    }
}