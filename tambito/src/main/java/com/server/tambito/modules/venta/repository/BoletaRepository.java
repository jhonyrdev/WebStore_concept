package com.server.tambito.modules.venta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.venta.entity.Boleta;

public interface BoletaRepository extends JpaRepository<Boleta, Integer> {
}