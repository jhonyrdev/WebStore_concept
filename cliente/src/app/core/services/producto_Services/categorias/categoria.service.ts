import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../models/producto_Models/category.model';
import { CATEGORIA_ROUTES } from '../../../../shared/constants/categoria-routes';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly _categories = signal<Category[]>([]);
  readonly error = signal<string | null>(null);
  readonly isLoading = signal(true);

  readonly categories = computed(() =>
    this._categories().map((cat) => ({
      ...cat,
      route: CATEGORIA_ROUTES[cat.label] ?? '/404',
    })),
  );

  loadCategories(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Category[]>('/data/categorias.json').subscribe({
      next: (data) => {
        this._categories.set(
          data.map((cat) => ({
            label: cat.label,
            imgSrc: cat.imgSrc, 
          })),
        );
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las categorías.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }
}
