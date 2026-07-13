import { Injectable, signal, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { FallbackService } from '@/app/core/services/fallback/fallback.service';
import { ApiResponse } from '@/app/core/models/api-response';
import {
  Producto,
  ProductoAdminDto,
  ProductoCardDto,
  ProductoListDto,
} from '../../models/product.model';

interface ProductoLocalDto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  imagen?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly api = inject(ApiService);
  private readonly fallback = inject(FallbackService);
  private readonly API_PUBLIC = 'api/public/producto';

  products = signal<Producto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.listarConFallback().subscribe({
      next: (data) => {
        // Aseguramos filtrar por stock real considerando ambas variaciones de nombres (frontend y backend)
        const productosDisponibles = data.filter((p: any) => {
          const cantidad = p.stock !== undefined ? p.stock : (p.cantProd || p.cant || 0);
          return cantidad > 0;
        });

        this.products.set(productosDisponibles);
        this.isLoading.set(false);
        console.log("🔥 PRODUCTOS REALES CARGADOS EN EL SERVICIO PÚBLICO:", productosDisponibles.length);
      },
      error: (err) => {
        this.error.set(err?.message || 'Error cargando productos');
        this.isLoading.set(false);
      },
    });
  }

  listar(): Observable<Producto[]> {
    return this.api
      .get<ApiResponse<ProductoListDto[]>>(this.API_PUBLIC)
      .pipe(map((response) => (response.data ?? []).map((item) => this.toProducto(item))));
  }

  listarConFallback(): Observable<Producto[]> {
    return this.fallback
      .getWithFallback<
        ApiResponse<ProductoListDto[]> | ProductoLocalDto[]
      >(this.API_PUBLIC, 'data/producto.json')
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((item) => this.toProductoLocal(item));
          }

          return (response.data ?? []).map((item) => this.toProducto(item));
        }),
      );
  }

  listarCards(): Observable<Producto[]> {
    return this.fallback
      .getWithFallback<
        ApiResponse<ProductoCardDto[]>
      >(`${this.API_PUBLIC}/cards`, 'data/producto-cards.json')
      .pipe(
        map((response) => 
          (response.data ?? []).map((item) => ({
            id: 0, 
            nombre: item.nomProd,
            precio: item.precioProd,
            stock: item.cantProd,
            categoriaId: 0,
            subCategoriaId: 0,
            marcaId: 0,
            imagen: item.imgProd,
            porcentajeDescuento: item.porcentajeDescuento || 0
          }))
        )
      );
  }

  listarAdmin(): Observable<ProductoAdminDto[]> {
  return this.api
    .get<ApiResponse<ProductoAdminDto[]>>('api/producto/admin') 
    .pipe(
      map((response) =>
        (response.data ?? []).map((item) => ({
          ...item,
          descuento: item.descuento ?? item.porcentajeDescuento ?? 0,
        })),
      ),
    );
  }

  obtenerPorId(idProd: number): Observable<Producto> {
    return this.api
      .get<ApiResponse<ProductoListDto>>(`${this.API_PUBLIC}/${idProd}`)
      .pipe(map((response) => this.toProducto(response.data)));
  }

  getProductos(): Observable<Producto[]> {
    return this.listarConFallback();
  }

  private toProducto(dto: any): Producto {
    return {
      id: dto.idProd || dto.id,
      nombre: dto.nomProd || dto.nombre,
      precio: dto.precioProd || dto.precio,
      stock: dto.cantProd || dto.cant || dto.stock,
      categoriaId: dto.idCat || dto.categoriaId || dto.idCategoria,
      subCategoriaId: dto.idSubcat || dto.subCategoriaId || dto.idSubcategoria,
      marcaId: dto.idMarca || dto.marcaId,
      imagen: dto.imgProd || dto.imagen,
      porcentajeDescuento: dto.porcentajeDescuento || dto.descuento || 0, 
    };
  }

  private toProductoLocal(dto: ProductoLocalDto): Producto {
    return {
      id: dto.id,
      nombre: dto.nombre,
      precio: dto.precio,
      stock: dto.stock,
      categoriaId: dto.categoriaId,
      subCategoriaId: 0, 
      marcaId: 0,
      imagen: dto.imagen,
      porcentajeDescuento: 0
    };
  }
}