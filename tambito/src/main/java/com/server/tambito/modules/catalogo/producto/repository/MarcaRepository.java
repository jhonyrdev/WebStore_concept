package com.server.tambito.modules.catalogo.producto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.server.tambito.modules.catalogo.producto.entity.Marca;
import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;

public interface MarcaRepository extends JpaRepository<Marca, Integer> {

    List<Marca> findDistinctByProductosEstado(EstadoProductoEnum estado);

    List<Marca> findDistinctByProductosSubcategoriaIdSubcat(Integer idSubcat);

    List<Marca> findDistinctByProductosSubcategoriaCategoriaIdCat(Integer idCat);
}
