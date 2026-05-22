package com.server.tambito.infrastructure.external.dni;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.server.tambito.infrastructure.external.dni.dto.*;
import com.server.tambito.commons.exception.BadRequestException;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;


@Slf4j
@Service("reniec2")
@RequiredArgsConstructor
public class Reniec2LookupService implements DniLookupProvider {

    private final RestTemplate restTemplate;

    @Value("${api.peru.url2}")
    private String apiUrl;

    @Value("${api.peru.v1}")
    private String bearerToken;

    @Override
    public DniResponseDTO lookup(String dni) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);
        String url = apiUrl + dni;

        try {
            ResponseEntity<Reniec2RawResponseDTO> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    request,
                    Reniec2RawResponseDTO.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return toCommonDTO(response.getBody().getData(), dni);
            }
            throw new BadRequestException("Respuesta inválida del proveedor Reniec2");

        } catch (Exception e) {
            log.error("[Reniec2] Error consultando DNI {}: {}", dni, e.getMessage());
            throw new BadRequestException("Error al consultar DNI con Reniec2: " + e.getMessage());
        }
    }

    private DniResponseDTO toCommonDTO(Reniec2RawResponseDTO.Reniec2DataDTO data, String dni) {
        DniResponseDTO dto = new DniResponseDTO();
        dto.setFirstName(data.getNombres());
        dto.setFirstLastName(data.getApellidoPaterno());
        dto.setSecondLastName(data.getApellidoMaterno());
        dto.setFullName(data.getApellidoPaterno()
                + " " + data.getApellidoMaterno()
                + " " + data.getNombres());
        dto.setDocumentNumber(dni);
        return dto;
    }

    @Override
    public String getProviderName() {
        return "reniec2-factiliza";
    }
}