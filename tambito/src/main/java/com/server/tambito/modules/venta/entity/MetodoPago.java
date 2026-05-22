package com.server.tambito.modules.venta.entity;
       
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
}

