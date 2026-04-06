import { CategoriaService } from '@/app/features/categories/services/categoria.service';
import { ProductoService } from '@/app/features/product/services/producto.service';
import { CATEGORIA_CONFIG } from '@/app/shared/constants/categoria.config';
import { sortByNombreAsc, sortByNombreDesc, sortByPrecioAsc, sortByPrecioDesc } from '@/app/shared/utils/sort.utils';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly productoService = inject(ProductoService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly router = inject(Router);

  readonly searchTerm = signal('');
  readonly sortOrder = signal<'relevancia' | 'menor' | 'mayor' | 'az' | 'za'>('relevancia');
  readonly categoriaId = signal<number | null>(null);

  readonly isLoading = computed(
    () => this.productoService.isLoading() || this.categoriaService.isLoading(),
  );
  readonly error = computed(() => this.productoService.error() || this.categoriaService.error());

  readonly categorias = computed(() => this.categoriaService.categories());
  readonly hasCategorias = computed(() => this.categorias().length > 0);

  readonly filteredProducts = computed(() => {
    let list = [...this.productoService.products()];

    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      list = list.filter((p) => p.nombre.toLowerCase().includes(term));
    }

    const catId = this.categoriaId();
    if (catId !== null) {
      list = list.filter((p) => p.categoriaId === catId);
    }

    switch (this.sortOrder()) {
      case 'menor':
        list = sortByPrecioAsc(list);
        break;
      case 'mayor':
        list = sortByPrecioDesc(list);
        break;
      case 'az':
        list = sortByNombreAsc(list);
        break;
      case 'za':
        list = sortByNombreDesc(list);
        break;
    }

    return list;
  });

  readonly totalProductos = computed(() => this.filteredProducts().length);
  readonly activeFilterCount = computed(() => {
    let count = 0;
    return count;
  });

  // ── Acciones ─────────────────────────────────────────────
  selectTodo(): void {
    this.categoriaId.set(null);
    this.router.navigate(['/catalogo']);
  }

  // Llamado desde el sidebar (clic) → navega y actualiza signal
  selectCategoria(id: number): void {
    const config = CATEGORIA_CONFIG[id];
    if (config) {
      this.categoriaId.set(id);
      this.router.navigate([config.route]);
    }
  }

  // Llamado desde el layout al detectar cambio de ruta → solo actualiza signal
  setCategoriaId(id: number): void {
    this.categoriaId.set(id);
  }

  clearFilters(): void {
    this.categoriaId.set(null);
    this.searchTerm.set('');
    this.sortOrder.set('relevancia');
  }
}
