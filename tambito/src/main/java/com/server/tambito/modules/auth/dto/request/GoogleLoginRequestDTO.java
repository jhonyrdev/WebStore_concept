package com.server.tambito.modules.auth.dto.request;

import lombok.*;

@Data
public class GoogleLoginRequestDTO {
    private String code;
    private String redirectUri;
}