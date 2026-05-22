package com.server.tambito.modules.auth.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.server.tambito.commons.response.*;
import com.server.tambito.infrastructure.security.JwtUtils;
import com.server.tambito.modules.auth.Mapper.AuthMapper;
import com.server.tambito.modules.auth.dto.request.*;
import com.server.tambito.modules.auth.dto.response.*;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.service.*;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final LocalAuthService localAuthService;
    private final GoogleAuthService googleAuthService;
    private final RegistrationService registrationService;
    private final JwtUtils jwtUtils;
    private final AuthMapper authMapper;
    // private final PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/login/cliente")
    public ResponseEntity<apiResponse<AuthResponseDTO>> loginCliente(@RequestBody LoginLocalRequestDTO dto) {
        Credencial cred = localAuthService.authenticateCliente(
                dto.getUsername(),
                dto.getPassword());

        String token = jwtUtils.generateToken(cred.getUsuario(), cred.getRol().name());
        AuthResponseDTO response = authMapper.from(cred, token);

        return ResponseEntity.ok(responseUtil.success(response, "Login de cliente exitoso"));
    }

    @PostMapping("/google")
    public ResponseEntity<apiResponse<AuthResponseDTO>> loginGoogle(@RequestBody GoogleLoginRequestDTO dto) {
        Map<String, Object> googleUser = googleAuthService.exchangeCode(dto.getCode(), dto.getRedirectUri());
        Cliente cliente = googleAuthService.processGoogleUser(googleUser);
        Credencial cred = cliente.getCredencial();
        String token = jwtUtils.generateToken(cred.getUsuario(), cred.getRol().name());
        AuthResponseDTO response = authMapper.from(cred, token);

        return ResponseEntity.ok(responseUtil.success(response, "Login exitoso"));
    }

    @GetMapping("/dni/{numero}")
    public ResponseEntity<apiResponse<DniPreviewResponseDTO>> consultarDni(
            @PathVariable @Pattern(regexp = "\\d{8}", message = "DNI inválido") String numero) {

        DniPreviewResponseDTO preview = registrationService.consultarDni(numero);
        return ResponseEntity.ok(responseUtil.success(preview, "Datos encontrados"));
    }

    @PostMapping("/register/cliente/manual")
    public ResponseEntity<apiResponse<Cliente>> registerClienteManual(
            @Valid @RequestBody RegisterManualRequestDTO dto) {

        Cliente cliente = registrationService.registerClienteManual(
                dto.getNombre(),
                dto.getApellido(),
                dto.getEmail(),
                dto.getPassword());

        return ResponseEntity.ok(responseUtil.success(cliente, "Cliente registrado exitosamente"));
    }

    @PostMapping("/register/cliente/dni")
    public ResponseEntity<apiResponse<Cliente>> registerClienteDni(
            @Valid @RequestBody RegisterDniRequestDTO dto) {

        Cliente cliente = registrationService.registerClienteDni(
                dto.getDni(),
                dto.getEmail(),
                dto.getPassword());

        return ResponseEntity.ok(responseUtil.success(cliente, "Cliente registrado exitosamente"));
    }

    @PostMapping("/login/admin")
    public ResponseEntity<apiResponse<AuthResponseDTO>> loginAdmin(@RequestBody LoginLocalRequestDTO dto) {
        Credencial cred = localAuthService.authenticateAdmin(
                dto.getUsername(),
                dto.getPassword());

        String token = jwtUtils.generateToken(cred.getUsuario(), cred.getRol().name());
        AuthResponseDTO response = authMapper.from(cred, token);

        return ResponseEntity.ok(responseUtil.success(response, "Login de admin exitoso"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register/admin")
    public ResponseEntity<apiResponse<Administrador>> registerAdmin(@Valid @RequestBody RegisterManualRequestDTO dto) {
        Administrador admin = registrationService.registerAdmin(
                dto.getNombre(),
                dto.getEmail(),
                dto.getPassword());

        return ResponseEntity.ok(responseUtil.success(admin, "Administrador registrado exitosamente"));
    }

    /*
     * @PostMapping("/password/request")
     * public ResponseEntity<String> requestReset(@RequestBody
     * PasswordResetRequestDTO dto) {
     * 
     * passwordRecoveryService.requestReset(dto.getEmail());
     * 
     * return ResponseEntity.ok("Si el correo existe, se envió el enlace");
     * }
     * 
     * @PostMapping("/password/reset")
     * public ResponseEntity<String> resetPassword(@RequestBody PasswordResetDTO
     * dto) {
     * 
     * passwordRecoveryService.reset(dto.getToken(), dto.getNewPassword());
     * 
     * return ResponseEntity.ok("Contraseña actualizada correctamente");
     * }
     */
}
