package com.server.tambito.modules.auth.dto.response;

import com.server.tambito.modules.auth.enums.*;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
    private Integer userId;
    private String username;
    private String email;
    private RolEnum rol;
    private LoginType loginType;
    private String token;
}
