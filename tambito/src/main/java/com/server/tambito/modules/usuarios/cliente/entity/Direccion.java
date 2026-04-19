
package com.server.tambito.modules.usuarios.cliente.entity;
        
import lombok.*; 

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Direccion {
    
    private Integer id;
    private String direccion;
	private Tipo tipo = Tipo.casa;
    private Cliente cliente;

	public enum Tipo {
		casa, oficina, otro
	}
}
