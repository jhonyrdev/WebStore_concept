package com.server.tambito.modules.venta.entity;
        
import lombok.*; 
import java.math.BigDecimal;
import java.time.*;
import com.server.tambito.modules.pedidos.entity.Pedido;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.venta.convert.TipoComprobanteConverter;
import com.server.tambito.modules.venta.enums.TipoComprobanteEnum;

import jakarta.persistence.*;

@Entity
@Table(name = "venta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Integer idVenta;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @ManyToOne
    @JoinColumn(name = "id_cli")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_ped")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_metodo")
    private MetodoPago metodoPago;

    @Column(name = "total", nullable = false, precision = 38, scale = 2)
    private BigDecimal total;

    @Convert(converter = TipoComprobanteConverter.class)
    @Column(name = "tipo", nullable = false)
    private TipoComprobanteEnum tipo;
}
