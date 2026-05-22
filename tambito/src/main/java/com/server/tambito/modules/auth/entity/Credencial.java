package com.server.tambito.modules.auth.entity;

import com.server.tambito.modules.auth.Converter.LoginTypeConverter;
import com.server.tambito.modules.auth.Converter.RolConverter;
import com.server.tambito.modules.auth.enums.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "credencial")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credencial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cred")
    private Integer idCred;

    @NotBlank
    @Column(name = "usuario", unique = true, nullable = false, length = 45)
    private String usuario;

    @NotBlank
    @Column(name = "clave", nullable = false, length = 100)
    private String clave;

    @Convert(converter = RolConverter.class)
    @Column(name = "rol", nullable = false)
    private RolEnum rol;

    @Convert(converter = LoginTypeConverter.class)
    @Column(name = "tipo_login", nullable = false)
    private LoginType loginType;
}
