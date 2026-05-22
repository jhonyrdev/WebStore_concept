package com.server.tambito.modules.usuarios.admin.entity;

import com.server.tambito.modules.auth.entity.Credencial;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*; 

@Entity
@Table(name = "administrador")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Integer idAdmin;

    @NotBlank
    @Column(name = "nom_admin", nullable = false, length = 45)
    private String nomAdmin;

    @Email
    @NotBlank
    @Column(name = "correo_admin", nullable = false, unique = true, length = 45)
    private String correoAdmin;

    @ManyToOne
    @JoinColumn(name = "id_cred", nullable = false)
    private Credencial credencial;
}

