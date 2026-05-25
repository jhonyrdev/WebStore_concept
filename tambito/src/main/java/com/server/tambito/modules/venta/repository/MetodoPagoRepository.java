package com.server.tambito.modules.venta.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.server.tambito.modules.venta.entity.MetodoPago;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Integer> {
    Optional<MetodoPago> findByNombreMetodoIgnoreCase(String nombreMetodo);
}
