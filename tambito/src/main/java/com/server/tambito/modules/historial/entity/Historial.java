
package com.server.tambito.modules.historial.entity;
    
import lombok.*; 
import java.time.*;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
@Table(name = "historial")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mov")
    private Integer idMov;

    @NotNull
    @Column(nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(nullable = false)
    private LocalTime hora;

    @ManyToOne
    @JoinColumn(name = "id_admin", nullable = false)
    private Administrador administrador;
}

