package com.server.tambito.modules.venta.entity;
        
import lombok.*; 
import java.math.BigDecimal;
import java.time.*;
import com.server.tambito.modules.pedidos.entity.Pedido;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.venta.enums.tipoDocumento;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    private Integer idVenta;
    private LocalDate fecha;
    private LocalTime hora;
    private Cliente cliente;
    private Pedido pedido;
    private MetodoPago metodoPago;
    private BigDecimal total;
    private tipoDocumento tipo;

}
