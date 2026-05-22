package com.server.tambito.modules.auth.enums;

public enum RolEnum {
    ADMIN,
    CLIENTE;

    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
