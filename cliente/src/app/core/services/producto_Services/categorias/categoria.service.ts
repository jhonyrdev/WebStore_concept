import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../models/producto_Models/category.model';
import { CATEGORIA_CONFIG } from '../../../../shared/constants/categoria.config';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly _categories = signal<Category[]>([]);

  readonly error = signal<string | null>(null);
  readonly isLoading = signal(true);

  readonly categories = computed(() =>
    this._categories().map((cat) => ({
      ...cat,
      imgSrc: CATEGORIA_CONFIG[cat.id]?.img,
      route: CATEGORIA_CONFIG[cat.id]?.route ?? '/404',
    })),
  );

  loadCategories(): void {
    if (this._categories().length > 0) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Category[]>('/data/categorias.json').subscribe({
      next: (data) => {
        this._categories.set(data);
        this.isLoading.set(false);
      },

      error: (err) => {
        console.error(err);
        this.error.set('No se pudieron cargar las categorías.');
        this.isLoading.set(false);
      },
    });
  }
}
