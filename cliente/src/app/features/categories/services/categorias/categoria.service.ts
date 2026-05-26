import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { Category, CategoryWithConfig } from '../../models/category.model';
import { CATEGORIA_CONFIG } from '../../../../shared/constants/categoria.config';
import { FallbackService } from '@/app/core/services/fallback/fallback.service';

interface CategoriaApiDto {
  idCat?: number;
  id?: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly fallback = inject(FallbackService);
  private readonly API_PUBLIC = 'api/public/categorias';

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
      .getWithFallback<{ data: CategoriaApiDto[] } | CategoriaApiDto[]>(
        this.API_PUBLIC,
        'data/categorias.json',
      )
      .pipe(
        map((response) => (Array.isArray(response) ? response : (response.data ?? []))),
        map((items) =>
          items.map(
            (item) =>
              ({
                id: item.id ?? item.idCat ?? 0,
                nombre: item.nombre,
              }) satisfies Category,
          ),
        ),
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
