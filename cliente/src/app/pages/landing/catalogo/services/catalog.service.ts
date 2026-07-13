import { CategoriaService } from '@/app/features/categories/services/categorias/categoria.service';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';
import { CATEGORIA_CONFIG } from '@/app/shared/constants/categoria.config';
import {
  sortByNombreAsc,
  sortByNombreDesc,
  sortByPrecioAsc,
  sortByPrecioDesc,
} from '@/app/shared/utils/sort.utils';
import { computed, inject, Injectable, signal } from '@angular/core'; // Importación correcta del core
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
  readonly subCategoriaId = signal<number | null>(null);
  readonly marcaId = signal<number | null>(null);

  readonly isLoading = computed(
    () => this.productoService.isLoading() || this.categoriaService.isLoading(),
  );
  readonly error = computed(() => this.productoService.error() || this.categoriaService.error());

  readonly categorias = computed(() => this.categoriaService.categories());
  readonly hasCategorias = computed(() => this.categorias().length > 0);

  readonly filteredProducts = computed(() => {
    let list = [...this.productoService.products()];

    // 1. Filtro por término de búsqueda
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      list = list.filter((p) => p.nombre?.toLowerCase().includes(term));
    }

    // 2. Filtro por Categoría Principal (Tolerante a tipos String/Number)
    const catId = this.categoriaId();
    if (catId !== null) {
      list = list.filter((p) => Number(p.categoriaId) === Number(catId));
    }

    // 3. Filtro por Sub-Categoría
    const subId = this.subCategoriaId();
    if (subId !== null) {
      list = list.filter((p) => Number(p.subCategoriaId) === Number(subId));
    }

    // 4. Filtro por Marca
    const mId = this.marcaId();
    if (mId !== null) {
      list = list.filter((p) => Number(p.marcaId) === Number(mId));
    }

    // 5. Ordenamiento
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
    if (this.subCategoriaId() !== null) count++;
    if (this.marcaId() !== null) count++;
    return count;
  });

  selectTodo(): void {
    this.clearAllSignals();
    this.router.navigate(['/catalogo']);
  }

  selectCategoria(id: number): void {
    const config = CATEGORIA_CONFIG[id];
    if (config) {
      this.categoriaId.set(id);
      this.subCategoriaId.set(null);
      this.marcaId.set(null);
      this.router.navigate([config.route]);
    }
  }

  selectSubCategoria(id: number): void {
    this.subCategoriaId.update(current => current === id ? null : id);
  }

  selectMarca(id: number): void {
    this.marcaId.update(current => current === id ? null : id);
  }

  setCategoriaId(id: number): void {
    this.categoriaId.set(id);
  }

  clearFilters(): void {
    this.subCategoriaId.set(null);
    this.marcaId.set(null);
  }

  private clearAllSignals(): void {
    this.categoriaId.set(null);
    this.subCategoriaId.set(null);
    this.marcaId.set(null);
    this.searchTerm.set('');
    this.sortOrder.set('relevancia');
  }
}