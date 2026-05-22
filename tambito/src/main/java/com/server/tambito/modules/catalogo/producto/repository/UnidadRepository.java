package com.server.tambito.modules.catalogo.producto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.catalogo.producto.entity.Unidad;

public interface UnidadRepository extends JpaRepository<Unidad, Integer>{
    
}
