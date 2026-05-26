package com.server.tambito.modules.venta.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.venta.entity.DetalleVenta;

public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {
    List<DetalleVenta> findByVenta_IdVentaOrderByIdDetalleAsc(Integer idVenta);

    List<DetalleVenta> findByVenta_IdVentaInOrderByIdDetalleAsc(Collection<Integer> idVentas);
}