package com.server.tambito.modules.catalogo.promocion.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import com.server.tambito.commons.convert.EstadoGeneralConverter;
import com.server.tambito.commons.enums.EstadoGeneralEnum;
import com.server.tambito.modules.catalogo.producto.entity.Producto;
import com.server.tambito.modules.catalogo.promocion.Enums.TipoPromocionEnum;
import com.server.tambito.modules.catalogo.promocion.convert.TipoPromocionConvert;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "promocion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idPromocion;
 
    @NotBlank
    @Size(min = 3, max = 100)
    @Column(nullable = false, length = 100)
    private String nombre;
 
    @Size(max = 255)
    private String descripcion;
 
    @NotNull
    @Convert(converter = TipoPromocionConvert.class)
    @Column(nullable = false)
    private TipoPromocionEnum tipoDescuento;
 
    @NotNull
    @DecimalMin("0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorDescuento;
 
    @NotNull
    @Column(nullable = false)
    private LocalDate fechaInicio;
 
    @NotNull
    @Column(nullable = false)
    private LocalDate fechaFin;
 
    @NotNull
    @Convert(converter = EstadoGeneralConverter.class)
    @Column(nullable = false)
    private EstadoGeneralEnum estado;
 
    @ManyToMany(mappedBy = "promociones", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Producto> productos = new HashSet<>();
 
    @AssertTrue(message = "La fecha de inicio no puede ser después de la fecha de fin")
    private boolean isFechasValidas() {
        return fechaInicio == null || fechaFin == null || !fechaInicio.isAfter(fechaFin);
    }
}
