package com.server.tambito.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.infrastructure.persistence.entity.Sequence;

public interface SequenceRepository extends JpaRepository<Sequence, String> {

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE sequence_generator
            SET value = LAST_INSERT_ID(value + 1)
            WHERE name = :name
            """, nativeQuery = true)
    void increment(@Param("name") String name);

    @Query(value = "SELECT LAST_INSERT_ID()", nativeQuery = true)
    Long getLastId();
}