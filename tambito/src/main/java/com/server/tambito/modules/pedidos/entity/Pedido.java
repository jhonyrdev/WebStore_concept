package com.server.tambito.modules.pedidos.entity;

import lombok.*;
import java.math.BigDecimal;
import java.time.*;
import com.server.tambito.modules.usuarios.cliente.entity.*;
import com.server.tambito.modules.venta.convert.TipoEntregaConverter;

import jakarta.persistence.*;

import com.server.tambito.modules.pedidos.convert.EstadoPedidoConverter;
import com.server.tambito.modules.pedidos.enums.*;

@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ped")
    private Integer idPed;

    @ManyToOne
    @JoinColumn(name = "id_cli", nullable = false)
    private Cliente cliente;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Convert(converter = TipoEntregaConverter.class)
    @Column(name = "tipo_entrega", nullable = false)
    private TipoEntregaEnum tipoEntrega;

    @Convert(converter = EstadoPedidoConverter.class)
    @Column(name = "estado", nullable = false)
    private EstadoPedidoEnum estado;

    @ManyToOne
    @JoinColumn(name = "id_dir")
    private Direccion direccion;

    @Column(name = "total", nullable = false, precision = 38, scale = 2)
    private BigDecimal total;

}
