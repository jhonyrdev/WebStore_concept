package com.server.tambito.modules.auth.service;


import org.springframework.stereotype.Service;

import lombok.*;

@Service
@RequiredArgsConstructor
public class PasswordRecoveryService {
   /*
    private final PasswordResetTokenRepository tokenRepository;
    private final ClienteRepository clienteRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public void requestReset(String email) {

        Cliente cliente = clienteRepository.findByCorreoCli(email)
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        if (cliente.getCredencial().getLoginType() == LoginType.GOOGLE) {
            throw new RuntimeException("Usa Google login");
        }

        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setCliente(cliente);
        token.setExpiryDate(LocalDateTime.now().plusHours(1));
        token.setUsado(false);

        tokenRepository.save(token);

        emailService.sendPasswordResetEmail(email, token.getToken());
    }

    public void reset(String tokenStr, String newPassword) {

        PasswordResetToken token = tokenRepository.findByToken(tokenStr)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (token.getUsado() || token.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token inválido o expirado");
        }

        Credencial cred = token.getCliente().getCredencial();
        cred.setClave(passwordEncoder.encode(newPassword));

        token.setUsado(true);
    }
*/
}
