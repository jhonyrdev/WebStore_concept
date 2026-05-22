package com.server.tambito.modules.catalogo.categoria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.catalogo.categoria.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Categoria findByNomCat(String nombre);
    
    Optional<Categoria> findByNomCatIgnoreCase(String nombre);
    boolean existsByNomCat(String nombre);
}
