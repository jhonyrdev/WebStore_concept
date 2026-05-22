
package com.server.tambito.modules.catalogo.subcategoria.entity;

import lombok.*;
import com.server.tambito.modules.catalogo.categoria.entity.Categoria;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "subcategoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_subcat")
    private Integer idSubcat;

    @NotBlank
    @Column(name = "nom_subcat", nullable = false, length = 45)
    private String nomSubcat;

    @ManyToOne
    @JoinColumn(name = "id_cat", nullable = false)
    private Categoria categoria;
}
