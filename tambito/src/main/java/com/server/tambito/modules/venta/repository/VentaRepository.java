package com.server.tambito.modules.venta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.venta.entity.Venta;

public interface VentaRepository extends JpaRepository<Venta, Integer> {
    List<Venta> findByClienteOrderByFechaDescHoraDesc(Cliente cliente);

    List<Venta> findAllByOrderByFechaDescHoraDesc();
}