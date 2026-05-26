import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { Category, CategoryWithConfig } from '../../models/category.model';
import { CATEGORIA_CONFIG } from '../../../../shared/constants/categoria.config';
import { FallbackService } from '@/app/core/services/fallback/fallback.service';

interface CategoriaListDto {
  idCat: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly api = inject(ApiService);
  private readonly fallback = inject(FallbackService);

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

    this.fallback
      .getWithFallback<ApiResponse<CategoriaListDto[]> | Category[]>('api/public/categorias', 'data/categorias.json')
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          return (response.data ?? []).map((item) => ({
            id: item.idCat,
            nombre: item.nombre,
          }));
        }),
      )
      .subscribe({
      next: (data) => {
        this._categories.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las categorías.');
        this.isLoading.set(false);
      },
    });
  }
}
