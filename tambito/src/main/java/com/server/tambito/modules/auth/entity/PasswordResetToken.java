package com.server.tambito.modules.auth.entity;

import lombok.*;
import java.time.LocalDateTime;

import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "password_reset_token")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String token;

    @NotNull
    @Column(nullable = false)
    private Boolean usado = false;

    @ManyToOne
    @JoinColumn(name = "id_cli", nullable = false)
    private Cliente cliente;
}