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
        this.products.set(data.filter((p) => p.stock > 0));
        this.isLoading.set(false);
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
      .getWithFallback<ApiResponse<ProductoListDto[]> | ProductoLocalDto[]>(
        this.API_PUBLIC,
        'data/producto.json',
      )
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((item) => this.toProductoLocal(item));
          }

          return (response.data ?? []).map((item) => this.toProducto(item));
        }),
      );
  }

  listarCards(): Observable<ProductoCardDto[]> {
    return this.fallback
      .getWithFallback<ApiResponse<ProductoCardDto[]>>(
        `${this.API_PUBLIC}/cards`,
        'data/producto-cards.json',
      )
      .pipe(map((response) => response.data ?? []));
  }

  listarAdmin(): Observable<ProductoAdminDto[]> {
    return this.api
      .get<ApiResponse<ProductoAdminDto[]>>(`${this.API_PUBLIC}/admin`)
      .pipe(map((response) => response.data ?? []));
  }

  obtenerPorId(idProd: number): Observable<Producto> {
    return this.api
      .get<ApiResponse<ProductoListDto>>(`${this.API_PUBLIC}/${idProd}`)
      .pipe(map((response) => this.toProducto(response.data)));
  }

  getProductos(): Observable<Producto[]> {
    return this.listarConFallback();
  }

  private toProducto(dto: ProductoListDto): Producto {
    return {
      id: dto.idProd,
      nombre: dto.nomProd,
      precio: dto.precioProd,
      stock: dto.cantProd,
      categoriaId: dto.idCat,
      imagen: dto.imgProd,
    };
  }

  private toProductoLocal(dto: ProductoLocalDto): Producto {
    return {
      id: dto.id,
      nombre: dto.nombre,
      precio: dto.precio,
      stock: dto.stock,
      categoriaId: dto.categoriaId,
      imagen: dto.imagen,
    };
  }
}