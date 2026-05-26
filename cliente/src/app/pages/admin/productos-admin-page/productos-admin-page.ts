import { Component, computed, inject, signal } from '@angular/core';
import { CategoriaService } from '@/app/features/categories/services/categorias/categoria.service';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';
import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import { CategoryWithConfig } from '@/app/features/categories/models/category.model';
import { ProductoAdminDto } from '@/app/features/product/models/product.model';
import { MarcaListDto } from '@/app/features/product/models/marca.model';

type Tab = 'productos' | 'categorias' | 'marca';

@Component({
  selector: 'app-productos-admin-page',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './productos-admin-page.html',
  styleUrl: './productos-admin-page.css',
})
export class ProductosAdminPage {
  private readonly categoriaService = inject(CategoriaService);
  private readonly productService = inject(ProductoService);
  private readonly marcaService = inject(MarcaService);

  activeTab = signal<Tab>('productos');
  productos = signal<ProductoAdminDto[]>([]);
  readonly categorias = this.categoriaService.categories;
  marcas = signal<MarcaListDto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  pageSize = signal(12);
  currentPage = signal(1);

  tabs: TabItem<Tab>[] = [
    { key: 'productos', label: 'Productos' },
    { key: 'categorias', label: 'Categorias' },
    { key: 'marca', label: 'Marca' },
  ];

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.productos().length / this.pageSize())));
  readonly paginatedProductos = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.productos().slice(start, start + this.pageSize());
  });
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  constructor() {
    this.cargarProductos();
    this.cargarCategorias();
    this.cargarMarcas();
  }

  changeTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  cargarProductos(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.listarAdmin().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.currentPage.set(1);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'No se pudieron cargar los productos');
        this.isLoading.set(false);
      },
    });
  }

  cargarCategorias(): void {
    this.categoriaService.loadCategories();
  }

  cargarMarcas(): void {
    this.marcaService.listar().subscribe({
      next: (marcas) => this.marcas.set(marcas),
      error: () => this.marcas.set([]),
    });
  }

  get totalProductos(): number {
    return this.productos().length;
  }

  get totalStock(): number {
    return this.productos().reduce((total, producto) => total + producto.cantProd, 0);
  }

  get inventarioDisponible(): number {
    return this.productos().filter((producto) => producto.estado.toLowerCase() !== 'agotado').length;
  }

  get categoriaCount(): number {
    return this.categorias().length;
  }

  get marcaCount(): number {
    return this.marcas().length;
  }

  get estadoClase(): Record<string, string> {
    return {
      disponible: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
      critico: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
      agotado: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
    };
  }

  formatearEstado(estado: string): string {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  }
}
