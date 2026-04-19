package com.server.tambito.modules.venta.entity;

import lombok.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;

import com.server.tambito.modules.pedidos.entity.DetallePedido;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.entity.Direccion;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {


	private Integer idPed;
	private Cliente cliente;
	private Direccion direccion;

	private LocalDate fecha;
	private LocalTime hora;
	private TipoEntrega tipoEntrega;
	private Estado estado = Estado.Nuevo;
	private BigDecimal total;
	private List<DetallePedido> detallePedidos = new ArrayList<>();

	public enum TipoEntrega {
		envio, recojo
	}

	public enum Estado {
		Nuevo, Realizado, Rechazado
	}
}
