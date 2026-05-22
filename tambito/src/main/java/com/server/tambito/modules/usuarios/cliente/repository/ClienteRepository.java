package com.server.tambito.modules.usuarios.cliente.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
    Optional<Cliente> findByCorreoCli(String correoCli);
}
