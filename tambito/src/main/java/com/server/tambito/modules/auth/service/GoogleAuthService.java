package com.server.tambito.modules.auth.service;

import java.util.*;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import com.server.tambito.commons.exception.BadRequestException;
import com.server.tambito.core.service.UniqueCodeService;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.enums.*;
import com.server.tambito.modules.auth.repository.CredencialRepository;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;

import jakarta.transaction.Transactional;
import lombok.*;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    @Value("${google.client-id}")
    private String clientId;

    @Value("${google.client-secret}")
    private String clientSecret;

    @Value("${google.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;
    private final CredencialRepository credencialRepository;
    private final ClienteRepository clienteRepository;
    private final UniqueCodeService unidecodeService;
    private final PasswordEncoder passwordEncoder;

    public Map<String, Object> exchangeCode(String code, String redirectUriParam) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "code=" + code +
                "&client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&redirect_uri=" + redirectUriParam +
                "&grant_type=authorization_code";

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                "https://oauth2.googleapis.com/token",
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<>() {
                });

        Map<String, Object> tokenData = response.getBody();

        if (tokenData == null || !tokenData.containsKey("access_token")) {
            throw new BadRequestException("Error obteniendo token de Google");
        }

        String accessToken = (String) tokenData.get("access_token");

        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);

        HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                HttpMethod.GET,
                userRequest,
                new ParameterizedTypeReference<>() {
                });

        return userResponse.getBody();
    }

    public Cliente processGoogleUser(Map<String, Object> userInfo) {

        String email = (String) userInfo.get("email");

        return clienteRepository.findByCorreoCli(email)
                .map(cliente -> {

                    if (cliente.getCredencial().getLoginType() != LoginType.GOOGLE) {
                throw new BadRequestException(
                    "Este correo ya está registrado con login local");
                    }

                    return cliente;
                })
                .orElseGet(() -> createGoogleUser(userInfo));
    }

    @Transactional
    private Cliente createGoogleUser(Map<String, Object> userInfo) {

        String email = (String) userInfo.get("email");

        Credencial cred = new Credencial();
        cred.setUsuario(email);
        cred.setClave(passwordEncoder.encode(UUID.randomUUID().toString()));
        cred.setRol(RolEnum.CLIENTE);
        cred.setLoginType(LoginType.GOOGLE);

        cred = credencialRepository.save(cred);
        String codigo = unidecodeService.generarCodigo("CLI", "cliente_seq");

        Cliente cliente = new Cliente();
        cliente.setCorreoCli(email);
        cliente.setNomCli((String) userInfo.get("given_name"));
        cliente.setApeCli((String) userInfo.get("family_name"));
        cliente.setCredencial(cred);
        cliente.setCodCli(codigo);

        return clienteRepository.save(cliente);
    }

}
