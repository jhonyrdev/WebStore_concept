import { Injectable, signal, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/product.model';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly url = 'data/producto.json';

  products = signal<Producto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private api: ApiService) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.api.get<Producto[]>(this.url).subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'Error cargando productos');
        this.isLoading.set(false);
      },
    });
  }

  getProductos(): Observable<Producto[]> {
    return this.api.get<Producto[]>(this.url);
  }
}
