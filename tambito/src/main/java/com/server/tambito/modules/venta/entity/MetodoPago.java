package com.server.tambito.modules.venta.entity;
       
import com.server.tambito.modules.venta.convert.TipoMetodoPagoConverter;
import com.server.tambito.modules.venta.enums.TipoMetodoPagoEnum;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*; 

@Entity
@Table(name = "metodo_pago")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_metodo")
    private Integer idMetodo;

    @NotBlank
    @Column(name = "nombre_metodo", nullable = false, unique = true, length = 50)
    private String nombreMetodo;

    @Convert(converter = TipoMetodoPagoConverter.class)
    @Column(name = "tipo_metodo", nullable = false)
    private TipoMetodoPagoEnum tipo;

    @Column(name = "estado_metodo", nullable = false)
    private Boolean estado = true;
}

