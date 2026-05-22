package com.server.tambito.modules.usuarios.admin.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {
    Optional<Administrador> findByCorreoAdmin(String correoAdmin);
}
