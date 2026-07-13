package com.server.tambito.modules.catalogo.producto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.server.tambito.modules.catalogo.producto.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    
    @EntityGraph(attributePaths = { "subcategoria", "subcategoria.categoria" })
    List<Producto> findAll();

    int countBySubcategoria_Categoria_NomCat(String nomCat);

    List<Producto> findByCodProdStartingWithOrderByCodProdDesc(String prefijo);

    long countBySubcategoria_IdSubcat(Integer idSubcat);

    long countByUnidad_IdUnidad(Integer idUnidad);

    long countByMarca_IdMarca(Integer idMarca);

    @Query(value = "SELECT p.valor_descuento FROM promocion p " +
                   "JOIN producto_promocion pp ON p.id_promocion = pp.id_promocion " +
                   "WHERE pp.id_prod = :idProd AND p.estado = 'ACTIVO' " +
                   "ORDER BY pp.id_promocion DESC LIMIT 1", 
           nativeQuery = true)
    Double findPorcentajeDescuentoActivo(@Param("idProd") Integer idProd);
    
    // 🧹 Limpiador automático: Borra cualquier promoción previa de este producto
    @Modifying
    @Query(value = "DELETE FROM producto_promocion WHERE id_prod = :idProd", nativeQuery = true)
    void eliminarPromocionesAnteriores(@Param("idProd") Integer idProd);

    // 🚀 AGREGADO: Registra la nueva vinculación en la tabla intermedia
    @Modifying
    @Query(value = "INSERT INTO producto_promocion (id_prod, id_promocion) VALUES (:idProd, :idPromocion)", nativeQuery = true)
    void asignarPromocionAProducto(@Param("idProd") Integer idProd, @Param("idPromocion") Integer idPromocion);
}