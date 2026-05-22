package com.server.tambito.infrastructure.external.dni;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
public class DniLookupService {

    private final DniLookupProvider primary;
    private final DniLookupProvider fallback;

    @Value("${dni.fallback.enabled:false}")
    private boolean fallbackEnabled;

    public DniLookupService(
            @Qualifier("reniec1") DniLookupProvider primary,
            @Qualifier("reniec2") DniLookupProvider fallback) {
        this.primary = primary;
        this.fallback = fallback;
    }

    public DniResponseDTO consultar(String dni) {
        try {
            log.info("Consultando DNI {} con proveedor primario: {}", dni, primary.getProviderName());
            return primary.lookup(dni);
        } catch (Exception e) {
            if (fallbackEnabled) {
                log.warn("Proveedor primario [{}] falló. Usando fallback: {}",
                        primary.getProviderName(), fallback.getProviderName());
                return fallback.lookup(dni);
            }
            throw e;
        }
    }
}
