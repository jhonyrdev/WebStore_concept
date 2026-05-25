package com.server.tambito.modules.catalogo.producto.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.server.tambito.commons.validator.ProductoValidator;
import com.server.tambito.core.service.*;
import com.server.tambito.modules.catalogo.producto.dto.productoDto.*;
import com.server.tambito.modules.catalogo.producto.entity.*;
import com.server.tambito.modules.catalogo.producto.enums.EstadoProductoEnum;
import com.server.tambito.modules.catalogo.producto.mapper.ProductoMapper;
import com.server.tambito.modules.catalogo.producto.repository.*;
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
        return mapper.toListDto(guardado);
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
        return mapper.toListDto(actualizado);
    }

    public ProductoListDto obtenerPorId(Integer idProd) {
        Producto producto = findById(idProd)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con id: " + idProd));
        return mapper.toListDto(producto);
    }

    public List<ProductoListDto> listarTodos() {
        return mapper.toListDtoList(findAll());
    }

    public List<ProductoCardDto> listarCards() {
        return mapper.toCardDtoList(findAll());
    }

    public List<ProductoAdminDto> listarParaAdmin() {
        return mapper.toTablaAdminDtoList(findAll());
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
}