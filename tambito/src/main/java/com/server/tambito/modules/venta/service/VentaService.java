package com.server.tambito.modules.venta.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.core.service.BaseService;
import com.server.tambito.modules.auth.entity.Credencial;
import com.server.tambito.modules.auth.repository.CredencialRepository;
import com.server.tambito.modules.catalogo.producto.entity.Producto;
import com.server.tambito.modules.catalogo.producto.repository.ProductoRepository;
import com.server.tambito.modules.usuarios.cliente.entity.Cliente;
import com.server.tambito.modules.usuarios.cliente.repository.ClienteRepository;
import com.server.tambito.modules.venta.dto.checkout.CheckoutItemDto;
import com.server.tambito.modules.venta.dto.checkout.CheckoutRequestDto;
import com.server.tambito.modules.venta.dto.venta.DetalleVentaReportDto;
import com.server.tambito.modules.venta.dto.venta.VentaReportDto;
import com.server.tambito.modules.venta.entity.DetalleVenta;
import com.server.tambito.modules.venta.entity.MetodoPago;
import com.server.tambito.modules.venta.entity.Venta;
import com.server.tambito.modules.venta.enums.TipoComprobanteEnum;
import com.server.tambito.modules.venta.repository.DetalleVentaRepository;
import com.server.tambito.modules.venta.repository.MetodoPagoRepository;
import com.server.tambito.modules.venta.repository.VentaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VentaService extends BaseService<Venta, Integer> {

    private final VentaRepository ventaRepository;
    private final DetalleVentaRepository detalleVentaRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
    private final CredencialRepository credencialRepository;

    public VentaService(
            VentaRepository ventaRepository,
            DetalleVentaRepository detalleVentaRepository,
            MetodoPagoRepository metodoPagoRepository,
            ProductoRepository productoRepository,
            ClienteRepository clienteRepository,
            CredencialRepository credencialRepository) {
        super(ventaRepository);
        this.ventaRepository = ventaRepository;
        this.detalleVentaRepository = detalleVentaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
        this.credencialRepository = credencialRepository;
    }

    @Transactional
    public VentaReportDto registrarCompra(CheckoutRequestDto request) {
        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("La compra no puede registrarse sin productos");
        }

        Cliente cliente = obtenerClienteAutenticado();
        MetodoPago metodoPago = metodoPagoRepository.findById(request.getMetodoPagoId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Método de pago no encontrado con id: " + request.getMetodoPagoId()));

        if (Boolean.FALSE.equals(metodoPago.getEstado())) {
            throw new IllegalStateException("El método de pago seleccionado no está activo");
        }

        List<LineaCompra> lineas = new ArrayList<>();
        BigDecimal subtotalCompra = BigDecimal.ZERO;
        LocalDate hoy = LocalDate.now();

        for (CheckoutItemDto item : request.getItems()) {
            if (item == null || item.getProductoId() == null || item.getCantidad() == null || item.getCantidad() <= 0) {
                throw new IllegalArgumentException("Cada producto debe tener un id y una cantidad válida");
            }

            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Producto no encontrado con id: " + item.getProductoId()));

            if (producto.getCantProd() < item.getCantidad()) {
                throw new IllegalStateException("No hay stock suficiente para el producto: " + producto.getNomProd());
            }

            // --- DETECCIÓN DE PROMOCIÓN ACTIVA Y VIGENTE ---
            BigDecimal precioAplicado = producto.getPrecioProd();
            
            if (producto.getPromociones() != null) {
                for (com.server.tambito.modules.catalogo.promocion.entity.Promocion promo : producto.getPromociones()) {
                    if (promo.getEstado() == com.server.tambito.commons.enums.EstadoGeneralEnum.ACTIVO && 
                        !hoy.isBefore(promo.getFechaInicio()) && 
                        !hoy.isAfter(promo.getFechaFin())) {
                        
                        BigDecimal descuento = producto.getPrecioProd()
                                .multiply(promo.getValorDescuento())
                                .divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
                        
                        precioAplicado = producto.getPrecioProd().subtract(descuento);
                        break; 
                    }
                }
            }

            BigDecimal subtotalLinea = precioAplicado.multiply(BigDecimal.valueOf(item.getCantidad()));
            subtotalCompra = subtotalCompra.add(subtotalLinea);
            lineas.add(new LineaCompra(producto, item.getCantidad(), subtotalLinea, precioAplicado));
        }

        BigDecimal igv = subtotalCompra.multiply(BigDecimal.valueOf(0.18));
        BigDecimal total = subtotalCompra.add(igv);

        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setMetodoPago(metodoPago);
        venta.setFecha(LocalDate.now());
        venta.setHora(LocalTime.now());
        venta.setTipo(request.getTipoComprobante() != null ? request.getTipoComprobante() : TipoComprobanteEnum.BOLETA);
        venta.setTotal(total);
        venta.setPedido(null);
        venta = save(venta);

        List<DetalleVenta> detalles = new ArrayList<>();
        for (LineaCompra linea : lineas) {
            Producto producto = linea.producto();
            producto.setCantProd(producto.getCantProd() - linea.cantidad());
            productoRepository.save(producto);

            DetalleVenta detalle = new DetalleVenta();
            detalle.setVenta(venta);
            detalle.setProducto(producto);
            detalle.setNomProd(producto.getNomProd());
            detalle.setCantidad(linea.cantidad());
            detalle.setPrecioUnit(linea.precioCobrado()); 
            detalle.setSubtotal(linea.subtotal());
            detalles.add(detalle);
        }

        detalleVentaRepository.saveAll(detalles);
        return toReportDto(venta, detalles);
    }

    @Transactional(readOnly = true)
    public List<VentaReportDto> listarMisCompras() {
        Cliente cliente = obtenerClienteAutenticado();
        List<Venta> ventas = ventaRepository.findByClienteOrderByFechaDescHoraDesc(cliente);

        return ventas.stream()
                .map(venta -> toReportDto(venta,
                        detalleVentaRepository.findByVenta_IdVentaOrderByIdDetalleAsc(venta.getIdVenta())))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<VentaReportDto> listarTodasLasVentas() {
        List<Venta> ventas = ventaRepository.findAllByOrderByFechaDescHoraDesc();

        return ventas.stream()
            .map(venta -> toReportDto(venta,
                detalleVentaRepository.findByVenta_IdVentaOrderByIdDetalleAsc(venta.getIdVenta())))
            .toList();
    }

    private Cliente obtenerClienteAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            throw new IllegalStateException("No se pudo identificar al usuario autenticado");
        }

        String username = authentication.getName().trim();
        Credencial credencial = credencialRepository.findByUsuario(username)
                .orElseThrow(() -> new EntityNotFoundException(
                        "No se encontró la credencial asociada al usuario autenticado"));

        return clienteRepository.findByCredencial_IdCred(credencial.getIdCred())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No se encontró el cliente asociado a la credencial autenticada"));
    }

    private VentaReportDto toReportDto(Venta venta, List<DetalleVenta> detalles) {
        List<DetalleVentaReportDto> items = detalles.stream()
                .map(detalle -> new DetalleVentaReportDto(
                        detalle.getProducto() != null ? detalle.getProducto().getIdProd() : null,
                        detalle.getNomProd(),
                        detalle.getCantidad(),
                        detalle.getPrecioUnit(),
                        detalle.getSubtotal()))
                .toList();

        Cliente cliente = venta.getCliente();
        String nombreCliente = cliente == null
                ? "Cliente"
                : (cliente.getNomCli() + " " + cliente.getApeCli()).trim();

        return new VentaReportDto(
                venta.getIdVenta(),
                venta.getFecha(),
                venta.getHora(),
                nombreCliente,
                cliente != null ? cliente.getCorreoCli() : null,
                venta.getMetodoPago() != null ? venta.getMetodoPago().getNombreMetodo() : null,
                venta.getTipo() != null ? venta.getTipo().name() : null,
                detalles.stream().map(DetalleVenta::getSubtotal).reduce(BigDecimal.ZERO, BigDecimal::add),
                detalles.stream().map(DetalleVenta::getSubtotal).reduce(BigDecimal.ZERO, BigDecimal::add).multiply(BigDecimal.valueOf(0.18)),
                venta.getTotal(),
                "Realizado",
                items);
    }

    private record LineaCompra(Producto producto, Integer cantidad, BigDecimal subtotal, BigDecimal precioCobrado) {
    }
}