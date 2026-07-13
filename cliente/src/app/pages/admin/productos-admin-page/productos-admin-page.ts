import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '@/app/features/categories/services/categorias/categoria.service';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';
import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import { ProductoAdminDto } from '@/app/features/product/models/product.model';
import { MarcaListDto } from '@/app/features/product/models/marca.model';

// 🛠️ ACTUALIZADO: Se incluye 'promociones' en el tipo estricto de la pestaña
type Tab = 'productos' | 'categorias' | 'marca' | 'stock' | 'promociones';

interface ProductoCritico {
  nombre: string;
  stockActual: number;
  ventasDiariasPromedio: number;
  diasRestantes: number;
  estado: 'CRÍTICO' | 'ALERTA' | 'OK';
  proveedor: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  sugerencia: string;
}

@Component({
  selector: 'app-productos-admin-page',
  standalone: true,
  imports: [CommonModule, TabsComponent],
  templateUrl: './productos-admin-page.html',
  styleUrl: './productos-admin-page.css',
})
export class ProductosAdminPage {
  private readonly categoriaService = inject(CategoriaService);
  private readonly productService = inject(ProductoService);
  private readonly marcaService = inject(MarcaService);
  private readonly route = inject(ActivatedRoute);

  activeTab = signal<Tab>('productos');
  
  productos = signal<(ProductoAdminDto & { descuento?: number })[]>([]);
  
  readonly categorias = this.categoriaService.categories;
  marcas = signal<MarcaListDto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  pageSize = signal(12);
  currentPage = signal(1);
  readonly totalAgotados = 3;
  readonly totalEnRiesgo = 5;
  readonly categoriaCritica = 'RTDs / Cervezas';
  readonly productosCriticos: ProductoCritico[] = [
    {
      nombre: 'Cerveza Pilsen Callao 310ml (Sixpack)',
      stockActual: 0,
      ventasDiariasPromedio: 12,
      diasRestantes: 0,
      estado: 'CRÍTICO',
      proveedor: 'Backus',
      prioridad: 'Alta',
      sugerencia: '+360 unid',
    },
    {
      nombre: 'Four Loko Gold 473ml',
      stockActual: 4,
      ventasDiariasPromedio: 8,
      diasRestantes: 0.5,
      estado: 'CRÍTICO',
      proveedor: 'Perufarma',
      prioridad: 'Media',
      sugerencia: '+240 unid',
    },
    {
      nombre: "Papas Nativas Lay's Al Hilo 100g",
      stockActual: 15,
      ventasDiariasPromedio: 10,
      diasRestantes: 1.5,
      estado: 'ALERTA',
      proveedor: 'Pepsico',
      prioridad: 'Media',
      sugerencia: '+180 unid',
    },
    {
      nombre: 'Pisco Cuatro Gallos Acholado 750ml',
      stockActual: 8,
      ventasDiariasPromedio: 3,
      diasRestantes: 2.6,
      estado: 'ALERTA',
      proveedor: 'Santiago Queirolo',
      prioridad: 'Baja',
      sugerencia: '+90 unid',
    },
    {
      nombre: 'Whisky Johnnie Walker Red Label 1L',
      stockActual: 45,
      ventasDiariasPromedio: 15,
      diasRestantes: 3.0,
      estado: 'OK',
      proveedor: 'Diageo',
      prioridad: 'Baja',
      sugerencia: '+45 unid',
    },
  ];

  tabs: TabItem<Tab>[] = [
    { key: 'productos', label: 'Productos' },
    { key: 'categorias', label: 'Categorias' },
    { key: 'marca', label: 'Marca' },
    { key: 'stock', label: 'Stock' },
    { key: 'promociones', label: 'Promociones' },
  ];

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.productos().length / this.pageSize())),
  );
  readonly paginatedProductos = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.productos().slice(start, start + this.pageSize());
  });
  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );

  constructor() {
    const initialTab = this.route.snapshot.data['initialTab'] as Tab | undefined;

    if (initialTab) {
      this.activeTab.set(initialTab);
    }

    this.cargarProductos();
    this.cargarCategorias();
    this.cargarMarcas();
  }

  guardarNuevaPromocion(idProdInput: string, idPromocionInput: string): void {
    if (!idProdInput || !idPromocionInput) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    // 🚀 Al recibir directamente el ID limpio desde el HTML, hacemos el parse directo
    const idProd = parseInt(idProdInput, 10);
    const idPromocion = parseInt(idPromocionInput, 10);

    if (isNaN(idProd) || isNaN(idPromocion)) {
      alert('Los identificadores numéricos no son válidos.');
      return;
    }

    const bodyToSend = {
      idProd: idProd,
      idPromocion: idPromocion
    };

    console.log("🚀 Enviando IDs oficiales a la base de datos:", bodyToSend);

    const apiEndpoint = 'api/public/producto/asignar-promocion';
    const apiService = (this.productService as any).api;

    if (apiService && typeof apiService.post === 'function') {
      apiService.post(apiEndpoint, bodyToSend).subscribe({
        next: () => {
          alert('¡Golazo! Descuento aplicado y guardado directamente en la base de datos de Tambito.');
          this.cargarProductos(); // Recarga la grilla al instante
        },
        error: (err: any) => {
          console.error("Error del servidor:", err);
          alert('Error al procesar la asignación.');
        }
      });
    } else {
      alert('Error crítico: El servicio de comunicación API no se encuentra disponible.');
    }
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
    return this.productos().filter((producto) => producto.estado.toLowerCase() !== 'agotado')
      .length;
  }

  get categoriaCount(): number {
    return this.categorias().length;
  }

  get marcaCount(): number {
    return this.marcas().length;
  }

  get stockByDays(): ProductoCritico[] {
    return [...this.productosCriticos].sort((a, b) => a.diasRestantes - b.diasRestantes);
  }

  get estadoClase(): Record<string, string> {
    return {
      disponible: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
      critico: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
      agotado: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
    };
  }

  get stockEstadoClase(): Record<ProductoCritico['estado'], string> {
    return {
      CRÍTICO: 'border-red-700 bg-red-900/50 text-red-400',
      ALERTA: 'border-amber-700 bg-amber-900/50 text-amber-400',
      OK: 'border-green-700 bg-green-900/50 text-green-400',
    };
  }

  get stockPrioridadClase(): Record<ProductoCritico['prioridad'], string> {
    return {
      Alta: 'text-red-400',
      Media: 'text-amber-400',
      Baja: 'text-cyan-300',
    };
  }

  formatearEstado(estado: string): string {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  }

  formatearDiasRestantes(diasRestantes: number): string {
    if (diasRestantes === 0) {
      return '0 días (Agotado)';
    }

    return `${diasRestantes} days`;
  }

  obtenerAnchoBarra(diasRestantes: number): string {
    const ancho = Math.max(0, Math.min((diasRestantes / 4) * 100, 100));

    return `${ancho}%`;
  }
}