package com.server.tambito.modules.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.auth.entity.Credencial;

public interface CredencialRepository extends JpaRepository<Credencial, Integer>   {
    Optional<Credencial> findByUsuario(String usuario);
}
