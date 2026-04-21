
package com.server.tambito.modules.usuarios.cliente.entity;
        
import com.server.tambito.modules.usuarios.cliente.enums.tipoResidencia;

import lombok.*; 

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Direccion {
    
    private Integer id;
    private String direccion;
	private tipoResidencia tipo;
    private Cliente cliente;

}
