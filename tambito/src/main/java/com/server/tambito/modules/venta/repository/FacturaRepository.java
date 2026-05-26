package com.server.tambito.modules.venta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.venta.entity.Factura;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {
}