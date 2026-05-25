package com.server.tambito.modules.catalogo.producto.dto.productoDto;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductoDto {
    
    @NotBlank(message = "El nombre del producto es requerido")
    @Size(min = 1, max = 45, message = "El nombre debe tener entre 1 y 45 caracteres")
    private String nomProd;

    @Size(max = 100, message = "La descripción no puede exceder 100 caracteres")
    private String desProd;

    @NotNull(message = "La marca es requerida")
    private Integer idMarca;

    @NotNull(message = "La unidad es requerida")
    private Integer idUnidad;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 0, message = "La cantidad no puede ser negativa")
    private Integer cantProd;

    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal precioProd;

    @Size(max = 255, message = "La URL de imagen no puede exceder 255 caracteres")
    private String imgProd;

    @NotNull(message = "La subcategoría es requerida")
    private Integer idSubcat;
}
