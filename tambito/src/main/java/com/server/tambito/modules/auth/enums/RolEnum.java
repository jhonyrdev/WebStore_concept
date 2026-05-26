package com.server.tambito.modules.auth.enums;

public enum RolEnum {

    ADMIN("ROLE_ADMIN"),
    CLIENTE("ROLE_CLIENTE");

    private final String authority;

    RolEnum(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }
}