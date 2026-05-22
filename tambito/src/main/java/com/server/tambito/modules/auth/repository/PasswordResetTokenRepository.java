package com.server.tambito.modules.auth.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.tambito.modules.auth.entity.PasswordResetToken;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer>{
    Optional<PasswordResetToken> findByToken(String token);
    
    Optional<PasswordResetToken> findByCliente(Cliente cliente);
    
    void deleteByExpiryDateBefore(LocalDateTime now);
    
    void deleteByCliente(Cliente cliente);
}
