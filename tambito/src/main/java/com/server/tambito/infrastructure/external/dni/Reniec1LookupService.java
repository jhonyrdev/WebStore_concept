package com.server.tambito.infrastructure.external.dni;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;
import com.server.tambito.commons.exception.BadRequestException;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

@Slf4j
@Service("reniec1")
@RequiredArgsConstructor
public class Reniec1LookupService implements DniLookupProvider {

    private final RestTemplate restTemplate;

    @Value("${api.peru.url1}")
    private String apiUrl;

    @Value("${api.peru.v1}")
    private String bearerToken;

    @Override
    public DniResponseDTO lookup(String dni) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);
        String url = apiUrl + "?numero=" + dni;

        try {
            ResponseEntity<DniResponseDTO> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    request,
                    DniResponseDTO.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
            throw new BadRequestException("Respuesta inválida del proveedor Reniec1");

        } catch (Exception e) {
            log.error("[Reniec1] Error consultando DNI {}: {}", dni, e.getMessage());
            throw new BadRequestException("Error al consultar DNI con Reniec1: " + e.getMessage());
        }
    }

    @Override
    public String getProviderName() {
        return "reniec1-decolecta";
    }
}