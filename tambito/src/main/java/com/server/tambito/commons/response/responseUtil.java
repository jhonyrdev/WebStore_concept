package com.server.tambito.commons.response;

public class responseUtil {
    public static <T> apiResponse<T> success(T data, String message) {
        return new apiResponse<>(true, message, data);
    }

    public static <T> apiResponse<T> success(T data) {
        return new apiResponse<>(true, "Operación exitosa", data);
    }

    public static <T> apiResponse<T> error(String message) {
        return new apiResponse<>(false, message, null);
    }
}
