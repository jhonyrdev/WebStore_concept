
package com.server.tambito.modules.historial.entity;

         
import lombok.*; 
import java.time.*;
import com.server.tambito.modules.usuarios.admin.entity.Administrador;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Historial {
private Integer idMov;

    private LocalDate fecha;
    private LocalTime hora;
    private Administrador administrador;
}

