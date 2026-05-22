package com.server.tambito.modules.pedidos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.pedidos.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    boolean existsByDireccion_IdDir(Integer idDir);
}
