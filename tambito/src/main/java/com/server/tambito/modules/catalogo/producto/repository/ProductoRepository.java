package com.server.tambito.modules.catalogo.producto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import com.server.tambito.modules.catalogo.producto.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    @EntityGraph(attributePaths = { "subcategoria", "subcategoria.categoria" })
    List<Producto> findAll();

    int countBySubcategoria_Categoria_NomCat(String nomCat);

    List<Producto> findByCodProdStartingWithOrderByCodProdDesc(String prefijo);

    long countBySubcategoria_IdSubcat(Integer idSubcat);

    long countByUnidad_IdUnidad(Integer idUnidad);

    long countByMarca_IdMarca(Integer idMarca);
}
