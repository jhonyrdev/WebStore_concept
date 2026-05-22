
package com.server.tambito.modules.usuarios.cliente.entity;
        
import com.server.tambito.modules.usuarios.cliente.convert.TipoDireccionConverter;
import com.server.tambito.modules.usuarios.cliente.enums.TipoDireccionEnum;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*; 

@Entity
@Table(name = "direccion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Direccion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dir")
    private Integer idDir;

    @ManyToOne
    @JoinColumn(name = "id_cli", nullable = false)
    private Cliente cliente;

    @NotBlank
    @Column(name = "direccion", nullable = false, columnDefinition = "TEXT")
    private String direccion;

    @Convert(converter = TipoDireccionConverter.class)
    @Column(name = "tipo", nullable = false)
    private TipoDireccionEnum tipo;

}
