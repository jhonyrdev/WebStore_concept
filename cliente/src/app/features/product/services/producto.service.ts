import { Injectable, signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { FallbackService } from '@/app/core/services/fallback/fallback.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private readonly fallback = inject(FallbackService);

  products = signal<Producto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }
  private loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.fallback.getWithFallback<Producto[]>('productos', 'data/producto.json').subscribe({
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

  getProductos(): Observable<Producto[]> {
    return this.fallback.getWithFallback<Producto[]>('productos', 'data/producto.json');
  }
}
