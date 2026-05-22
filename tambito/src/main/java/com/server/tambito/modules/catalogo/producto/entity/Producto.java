package com.server.tambito.modules.catalogo.producto.entity;

import lombok.*;
import java.math.BigDecimal;

import com.server.tambito.modules.catalogo.producto.convert.EstadoProductoConverter;
import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
   
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prod")
    private Integer idProd;

    @NotBlank
    @Column(name = "cod_prod", nullable = false, unique = true, length = 10)
    private String codProd;

    @NotBlank
    @Column(name = "nom_prod", nullable = false, length = 45)
    private String nomProd;

    @Column(name = "des_prod", length = 100)
    private String desProd;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "id_unidad")
    private Unidad unidad;

    @Min(0)
    @Column(name = "cant_prod", nullable = false)
    private Integer cantProd;

    @DecimalMin("0.0")
    @Column(name = "precio_prod", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioProd;

    @Column(name = "img_prod", length = 255)
    private String imgProd;

    @Convert(converter = EstadoProductoConverter.class)
    @Column(name = "estado", nullable = false)
    private EstadoProductoEnum estado;

    @ManyToOne
    @JoinColumn(name = "id_subcat", nullable = false)
    private SubCategoria subcategoria;

}
