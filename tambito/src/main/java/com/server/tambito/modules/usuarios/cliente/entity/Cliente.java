
package com.server.tambito.modules.usuarios.cliente.entity;

import lombok.*;
import java.time.LocalDate;

import com.server.tambito.commons.enums.EstadoUsuarioEnum;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.usuarios.cliente.convert.EstadoClienteConverter;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cli")
    private Integer idCli;

    @NotBlank
    @Column(name = "cod_cli", nullable = false, unique = true, length = 20)
    private String codCli;

    @NotBlank
    @Column(name = "nom_cli", nullable = false, length = 45)
    private String nomCli;

    @NotBlank
    @Column(name = "ape_cli", nullable = false, length = 45)
    private String apeCli;

    @Email
    @NotBlank
    @Column(name = "correo_cli", nullable = false, unique = true, length = 45)
    private String correoCli;

    @Column(name = "tel_cli", length = 20)
    private String telCli;

    @Convert(converter = EstadoClienteConverter.class)
    @Column(name = "estado", nullable = false)
    private EstadoUsuarioEnum estado;

    @NotNull
    @Column(name = "fecha_reg", nullable = false)
    private LocalDate fechaReg;

    @ManyToOne
    @JoinColumn(name = "id_cred")
    private Credencial credencial;

}
