import { Injectable, computed, inject, signal } from '@angular/core';
import { Category, CategoryWithConfig } from '../models/category.model';
import { CATEGORIA_CONFIG } from '../../../shared/constants/categoria.config';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly api = inject(ApiService);

  private readonly _categories = signal<Category[]>([]);

  readonly error = signal<string | null>(null);
  readonly isLoading = signal(true);

  readonly categories = computed(() =>
    this._categories().map(
      (cat) =>
        ({
          ...cat,
          imgSrc: CATEGORIA_CONFIG[cat.id]?.img || '',
          route: CATEGORIA_CONFIG[cat.id]?.route || '/404',
        }) as CategoryWithConfig,
    ),
  );

  loadCategories(): void {
    if (this._categories().length > 0) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.api.get<Category[]>('data/categorias.json').subscribe({
      next: (data: unknown) => {
        this._categories.set(data as Category[]);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las categorías.');
        this.isLoading.set(false);
      },
    });
  }
}
