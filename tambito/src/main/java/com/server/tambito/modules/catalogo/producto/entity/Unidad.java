package com.server.tambito.modules.catalogo.producto.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "unidad")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Unidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidad")
    private Integer idUnidad;

    @NotBlank
    @Column(name = "nom_unid", nullable = false, unique = true, length = 50)
    private String nombre;

    @NotBlank
    @Column(name = "simb_unid", nullable = false, unique = true, length = 20)
    private String simbolo;
}