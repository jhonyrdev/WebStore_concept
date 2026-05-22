package com.server.tambito.infrastructure.external.dni;

import com.server.tambito.infrastructure.external.dni.dto.DniResponseDTO;

public interface DniLookupProvider {
    DniResponseDTO lookup(String dni);
    String getProviderName();
}