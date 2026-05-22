package com.server.tambito.modules.auth.dto.request;

import lombok.*;

@Data
public class LoginLocalRequestDTO {
    private String username;
    private String password;
}
