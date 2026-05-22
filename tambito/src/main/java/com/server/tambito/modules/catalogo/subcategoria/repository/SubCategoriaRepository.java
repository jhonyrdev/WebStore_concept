package com.server.tambito.modules.catalogo.subcategoria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

public interface SubCategoriaRepository extends JpaRepository<SubCategoria, Integer> {
    List<SubCategoria> findByCategoriaIdCat(Integer idCat); 
}
