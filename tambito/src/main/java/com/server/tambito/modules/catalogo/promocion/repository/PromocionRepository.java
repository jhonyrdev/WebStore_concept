package com.server.tambito.modules.catalogo.promocion.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.server.tambito.commons.enums.EstadoGeneralEnum;
import com.server.tambito.modules.catalogo.promocion.entity.Promocion;

public interface PromocionRepository extends JpaRepository<Promocion, Integer> {

        Optional<Promocion> findByNombreIgnoreCase(String nombre);

        List<Promocion> findByEstadoAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        EstadoGeneralEnum estado,
                        LocalDate fechaInicio,
                        LocalDate fechaFin);

        List<Promocion> findByFechaFinBeforeAndEstado(
                        LocalDate fecha,
                        EstadoGeneralEnum estado);

        List<Promocion> findByNombreContainingIgnoreCase(String nombre);

        @Query("""
                SELECT DISTINCT p
                FROM Promocion p
                LEFT JOIN FETCH p.productos
                WHERE p.idPromocion = ?1        
                """)
        Optional<Promocion> findByIdWithProducts(Integer id);

        List<Promocion> findByEstado(EstadoGeneralEnum estado);
}
