
package com.server.tambito.modules.catalogo.categoria.entity;

import lombok.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cat")
    private Integer idCat;

    @NotBlank
    @Column(name = "nom_cat", nullable = false, unique = true, length = 45)
    private String nomCat;

}
