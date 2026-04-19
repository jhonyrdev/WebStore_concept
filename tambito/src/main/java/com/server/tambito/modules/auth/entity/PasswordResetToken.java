package com.server.tambito.modules.auth.entity;

import lombok.*;
import java.time.LocalDateTime;

import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {


    private String token;
    private Cliente cliente;
    private LocalDateTime expiryDate;
    private boolean usado = false;
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }
}
