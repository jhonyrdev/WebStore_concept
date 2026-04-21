package com.server.tambito.modules.pedidos.entity;

import lombok.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.entity.Direccion;
import com.server.tambito.modules.pedidos.enums.estadoPedido;
import com.server.tambito.modules.pedidos.enums.tipoEntrega;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

	private Integer idPed;
	private Cliente cliente;
	private Direccion direccion;
	private LocalDate fecha;
	private LocalTime hora;
	private tipoEntrega tipoEntrega;
	private estadoPedido estado;
	private BigDecimal total;
	private List<DetallePedido> detallePedidos = new ArrayList<>();

}
