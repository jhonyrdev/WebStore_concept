package com.server.tambito.modules.catalogo.producto.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.commons.validator.ProductoValidator;
import com.server.tambito.core.service.BaseService;
import com.server.tambito.core.service.UniqueCodeService;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.AsignarPromocionDto;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.ProductoAdminDto;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.ProductoCardDto;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.ProductoDto;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.ProductoListDto;
import com.server.tambito.modules.catalogo.producto.entity.Marca;
import com.server.tambito.modules.catalogo.producto.entity.Producto;
import com.server.tambito.modules.catalogo.producto.entity.Unidad;
import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;
import com.server.tambito.modules.catalogo.producto.mapper.ProductoMapper;
import com.server.tambito.modules.catalogo.producto.repository.ProductoRepository;
import com.server.tambito.modules.catalogo.subcategoria.entity.SubCategoria;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductoService extends BaseService<Producto, Integer> {

    private final ProductoValidator productoValidator;
    private final ProductoMapper mapper;
    private final UniqueCodeService uniqueCodeService;

    public ProductoService(ProductoRepository productoRepository,
            ProductoValidator productoValidator,
            ProductoMapper mapper,
            UniqueCodeService uniqueCodeService) {
        super(productoRepository);
        this.productoValidator = productoValidator;
        this.mapper = mapper;
        this.uniqueCodeService = uniqueCodeService;
    }

    public void calcularYAsignarEstado(Producto producto) {
        if (producto == null || producto.getSubcategoria() == null) {
            throw new IllegalArgumentException("El producto y su subcategoría no pueden ser nulos");
        }

        String nombreCategoria = producto.getSubcategoria().getCategoria().getNomCat();
        int stock = producto.getCantProd();

        if (stock == 0) {
            producto.setEstado(EstadoProductoEnum.AGOTADO);
            return;
        }

        int stockMinimo = nombreCategoria.equalsIgnoreCase("comidas") ? 2 : 5;

        if (stock <= stockMinimo) {
            producto.setEstado(EstadoProductoEnum.CRITICO);
        } else {
            producto.setEstado(EstadoProductoEnum.DISPONIBLE);
        }
    }

    @Transactional
    public ProductoListDto guardar(ProductoDto dto) {
        Object[] entidades = productoValidator.validarYCargarEntidadesRelacionadas(dto);
        Marca marca = (Marca) entidades[0];
        Unidad unidad = (Unidad) entidades[1];
        SubCategoria subcategoria = (SubCategoria) entidades[2];

        Producto producto = mapper.toEntity(dto);
        producto.setMarca(marca);
        producto.setUnidad(unidad);
        producto.setSubcategoria(subcategoria);

        String nombreCategoria = subcategoria.getCategoria().getNomCat();
        String prefijo = uniqueCodeService.construirPrefijoProducto(nombreCategoria);
        String ultimoCodigo = ((ProductoRepository) repo).findByCodProdStartingWithOrderByCodProdDesc(prefijo)
                .stream()
                .findFirst()
                .map(Producto::getCodProd)
                .orElse(null);

        producto.setCodProd(uniqueCodeService.generarCodigoProducto(prefijo, ultimoCodigo));

        calcularYAsignarEstado(producto);
        Producto guardado = save(producto);
        
        ProductoListDto resultado = mapper.toListDto(guardado);
        asignarDescuento(resultado);
        return resultado;
    }

    @Transactional
    public ProductoListDto actualizar(Integer idProd, ProductoDto dto) {
        Producto producto = findById(idProd)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id: " + idProd));

        Object[] entidades = productoValidator.validarYCargarEntidadesRelacionadas(dto);
        Marca marca = (Marca) entidades[0];
        Unidad unidad = (Unidad) entidades[1];
        SubCategoria subcategoria = (SubCategoria) entidades[2];

        mapper.updateEntity(dto, producto);
        producto.setMarca(marca);
        producto.setUnidad(unidad);
        producto.setSubcategoria(subcategoria);
        calcularYAsignarEstado(producto);

        Producto actualizado = save(producto);
        
        ProductoListDto resultado = mapper.toListDto(actualizado);
        asignarDescuento(resultado);
        return resultado;
    }

    public ProductoListDto obtenerPorId(Integer idProd) {
        Producto producto = findById(idProd)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id: " + idProd));
        
        ProductoListDto resultado = mapper.toListDto(producto);
        asignarDescuento(resultado);
        return resultado;
    }

    public List<ProductoCardDto> listarTodos() {
        List<Producto> productos = findAll();
        ProductoRepository productoRepo = (ProductoRepository) repo;

        // Procesamos de forma emparejada cada producto con su DTO de manera exacta
        return productos.stream().map(prod -> {
            // 1. Mapeamos el producto individual a su DTO
            ProductoCardDto dto = mapper.toCardDto(prod); 

            // 2. Inyección segura de IDs para el filtro del catálogo de Angular
            if (prod.getSubcategoria() != null) {
                dto.setIdSubcat(prod.getSubcategoria().getIdSubcat());
                if (prod.getSubcategoria().getCategoria() != null) {
                    dto.setIdCat(prod.getSubcategoria().getCategoria().getIdCat());
                }
            }
            if (prod.getMarca() != null) {
                dto.setIdMarca(prod.getMarca().getIdMarca());
            }

            // 3. Buscamos el descuento usando el ID exacto de ESTE producto
            Double porcentaje = productoRepo.findPorcentajeDescuentoActivo(prod.getIdProd());
            dto.setPorcentajeDescuento(convertirValorDescuentoAEntero(porcentaje));

            return dto;
        }).toList();
    }

    public List<ProductoCardDto> listarCards() {
        return listarTodos();
    }

    public List<ProductoAdminDto> listarParaAdmin() {
        List<Producto> productos = findAll(); 
        List<ProductoAdminDto> listaDto = mapper.toTablaAdminDtoList(productos);
        ProductoRepository productoRepo = (ProductoRepository) repo;
        
        for (ProductoAdminDto dto : listaDto) {
            Producto prodOriginal = productos.stream()
                    .filter(p -> p.getCodProd().equals(dto.getCodProd()))
                    .findFirst()
                    .orElse(null);

            if (prodOriginal != null) {
                Double valor = productoRepo.findPorcentajeDescuentoActivo(prodOriginal.getIdProd());
                int descuentoFinal = this.convertirValorDescuentoAEntero(valor);
              
                // 🎯 Vuelve a la normalidad:
                dto.setDescuento(descuentoFinal); 
                
                System.out.println("DEBUG Admin: " + dto.getCodProd() + " | Descuento asignado: " + descuentoFinal);
            } else {
                dto.setDescuento(0); // 🎯 Vuelve a la normalidad
            }
        }
        return listaDto;
    }
    
    private int convertirValorDescuentoAEntero(Double valor) {
        if (valor == null) {
            return 0;
        }
        return (int) Math.round(valor > 1 ? valor : valor * 100);
    }

    @Transactional
    public void incrementarStock(Integer idProd, int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad a incrementar debe ser mayor a 0");
        }

        Producto producto = findById(idProd)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id: " + idProd));

        producto.setCantProd(producto.getCantProd() + cantidad);
        calcularYAsignarEstado(producto);
        save(producto);
    }

    @Transactional
    public void eliminar(Integer idProd) {
        if (!findById(idProd).isPresent()) {
            throw new EntityNotFoundException("Producto no encontrado con id: " + idProd);
        }
        deleteById(idProd);
    }

   private void asignarDescuento(ProductoListDto dto) {
        if (dto == null) return;
        Double descuento = ((ProductoRepository) repo).findPorcentajeDescuentoActivo(dto.getIdProd());
        dto.setPorcentajeDescuento(convertirValorDescuentoAEntero(descuento));
    }

    private void asignarDescuentoCard(ProductoCardDto dto) {
        if (dto == null) return;
        Double descuento = ((ProductoRepository) repo).findPorcentajeDescuentoActivo(dto.getIdProd());
        dto.setPorcentajeDescuento(convertirValorDescuentoAEntero(descuento));
    }

    private void asignarDescuentosCards(List<ProductoCardDto> dtoList) {
        if (dtoList == null) return;
        dtoList.forEach(this::asignarDescuentoCard);
    }

    @Transactional
    public void vincularPromocion(AsignarPromocionDto dto) {
        ProductoRepository productoRepo = (ProductoRepository) repo;
        
        // 1. 🔥 REEMPLAZO AUTOMÁTICO: Borramos cualquier promoción que tuviera el producto antes
        productoRepo.eliminarPromocionesAnteriores(dto.getIdProd());
        
        // 2. 🚀 Insertamos la nueva promoción limpia (sea la 1, 2, 3, etc.)
        productoRepo.asignarPromocionAProducto(dto.getIdProd(), dto.getIdPromocion());
    }

}