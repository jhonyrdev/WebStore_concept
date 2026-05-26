import { CommonModule } from '@angular/common';
import { Component, computed, signal, inject, effect, OnInit } from '@angular/core';
import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import {
  DataTableComponent,
  TableActionEvent,
  TableColumn,
} from '@/app/shared/components/ui/data-table/data-table.component';
import {
  SortOption,
  SortSelectComponent,
} from '@/app/shared/components/ui/sort-select/sort-select.component';
import { PaginationComponent } from '@/app/shared/components/ui/pagination/pagination.component';
import { ScreenSizeService } from '@/app/core/services/screen-size/screen-size.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';
import { MarcaFormComponent } from './components/marca-form/marca-form.component';
import { MarcaListDto, MarcaDto } from '@/app/features/product/models/marca.model';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';
import { ToastService } from '@/app/shared/services/toast.service';
import { AlertService } from '@/app/shared/services/alert.service';
import { TableSearchComponent } from '@/app/shared/components/ui/search/table-search/table-search.component';
import { SubcategoriaFacade } from '@/app/features/categories/services/subcategorias/subcategoria.facade';
import { ProductoAdminDto } from '@/app/features/product/models/product.model';

type Tab = 'productos' | 'categorias' | 'marca';
type ProductField = 'nomProd' | 'nombreCategoria' | 'precioProd';
type ProductOrder = 'az' | 'za' | 'menorPrecio' | 'mayorPrecio';

@Component({
  selector: 'app-productos-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    DataTableComponent,
    SortSelectComponent,
    PaginationComponent,
    MarcaFormComponent,
    TableSearchComponent,
  ],
  templateUrl: './productos-admin-page.html',
  styleUrl: './productos-admin-page.css',
})
export class ProductosAdminPage implements OnInit {
  private screenSizeService = inject(ScreenSizeService);
  private marcaService = inject(MarcaService);
  private productoService = inject(ProductoService);
  private subcategoriaFacade = inject(SubcategoriaFacade);
  private toastService = inject(ToastService);
  private alertService = inject(AlertService);

  activeTab = signal<Tab>('productos');
  productField = signal<ProductField>('nomProd');
  productOrder = signal<ProductOrder>('az');
  searchQuery = signal('');

  // Marcas
  marcas = signal<MarcaListDto[]>([]);
  selectedMarca = signal<MarcaListDto | null>(null);
  showMarcaModal = signal(false);

  readonly categorias = this.subcategoriaFacade.subcategorias;
  productos = signal<ProductoAdminDto[]>([]);

  // Pagination
  currentPage = signal(1);
  pageSize = this.screenSizeService.pageSize;

  constructor() {
    // Reset page when tab or filters change
    effect(
      () => {
        this.activeTab();
        this.productField();
        this.productOrder();
        this.searchQuery();
        this.currentPage.set(1);
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarMarcas();
    this.cargarCategorias();
  }

  cargarProductos() {
    this.productoService.listarAdmin().subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  cargarMarcas() {
    this.marcaService.listar().subscribe({
      next: (data) => this.marcas.set(data),
      error: (err) => console.error('Error al cargar marcas:', err),
    });
  }

  cargarCategorias() {
    this.subcategoriaFacade.loadSubcategoriasConDetalles();
  }

  tabs: TabItem<Tab>[] = [
    { key: 'productos', label: 'Productos' },
    { key: 'categorias', label: 'Categorias' },
    { key: 'marca', label: 'Marca' },
  ];

  productFieldOptions: SortOption<ProductField>[] = [
    { value: 'nomProd', label: 'Producto' },
    { value: 'nombreCategoria', label: 'Categoria' },
    { value: 'precioProd', label: 'Precio' },
  ];

  productOrderOptions: SortOption<ProductOrder>[] = [
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'menorPrecio', label: 'Menor precio' },
    { value: 'mayorPrecio', label: 'Mayor precio' },
  ];

  productoColumns: TableColumn[] = [
    { key: 'codProd', label: 'Codigo', align: 'center', width: 'w-28' },
    { key: 'nomProd', label: 'Producto', align: 'left' },
    { key: 'precioProd', label: 'Precio', align: 'center', width: 'w-28' },
    { key: 'cantProd', label: 'Cantidad', align: 'center', width: 'w-28' },
    { key: 'nombreCategoria', label: 'Categoria', align: 'center', width: 'w-40' },
    { key: 'estado', label: 'Estado', align: 'center', width: 'w-32' },
    { key: 'accion', label: 'Accion', align: 'center', width: 'w-32' },
  ];

  categoriaColumns: TableColumn[] = [
    { key: 'categoriaNombre', label: 'Categoria', align: 'left' },
    { key: 'nombre', label: 'Subcategoria', align: 'center', width: 'w-56' },
    { key: 'accion', label: 'Accion', align: 'center', width: 'w-32' },
  ];

  marcaColumns: TableColumn[] = [
    { key: 'nombre', label: 'Marca', align: 'left' },
    { key: 'accion', label: 'Acción', align: 'center', width: 'w-32' },
  ];

  productosOrdenados = computed(() => {
    const field = this.productField();
    const order = this.productOrder();
    const query = this.searchQuery().toLowerCase().trim();

    const filtered = this.productos().filter((producto) => {
      const matchesSearch =
        !query ||
        producto.nomProd.toLowerCase().includes(query) ||
        producto.nombreCategoria.toLowerCase().includes(query);
      return matchesSearch;
    });

    return [...filtered].sort((left, right) => {
      if (order === 'menorPrecio' || order === 'mayorPrecio' || field === 'precioProd') {
        const direction = order === 'mayorPrecio' || order === 'za' ? -1 : 1;
        return (left.precioProd - right.precioProd) * direction;
      }

      const leftValue = String(left[field]);
      const rightValue = String(right[field]);
      const direction = order === 'za' ? -1 : 1;

      return leftValue.localeCompare(rightValue, 'es') * direction;
    });
  });

  productosPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.productosOrdenados().slice(start, start + this.pageSize());
  });

  totalProductosPages = computed(() =>
    Math.ceil(this.productosOrdenados().length / this.pageSize()),
  );

  categoriasPaginadas = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.categorias().slice(start, start + this.pageSize());
  });

  totalCategoriasPages = computed(() => Math.ceil(this.categorias().length / this.pageSize()));

  marcasPaginadas = computed(() => {
    const data = this.marcas();
    const start = (this.currentPage() - 1) * this.pageSize();
    return data.slice(start, start + this.pageSize());
  });

  totalMarcasPages = computed(() => Math.ceil(this.marcas().length / this.pageSize()));

  changeTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  changeProductField(field: ProductField) {
    this.productField.set(field);
  }

  changeProductOrder(order: ProductOrder) {
    this.productOrder.set(order);
  }

  openAddModal() {
    if (this.activeTab() === 'marca') {
      this.selectedMarca.set(null);
      this.showMarcaModal.set(true);
      return;
    }
    console.log('Agregar registro');
  }

  onMarcaSubmit(dto: MarcaDto) {
    const selected = this.selectedMarca();
    if (selected) {
      this.marcaService.actualizar(selected.idMarca, dto).subscribe({
        next: () => {
          this.toastService.success('Marca actualizada correctamente');
          this.cargarMarcas();
        },
        error: () => this.toastService.error('Error al actualizar marca'),
      });
    } else {
      this.marcaService.crear(dto).subscribe({
        next: () => {
          this.toastService.success('Marca registrada correctamente');
          this.cargarMarcas();
        },
        error: () => this.toastService.error('Error al registrar marca'),
      });
    }
  }

  editItem(item: any) {
    if (this.activeTab() === 'marca') {
      this.selectedMarca.set(item as MarcaListDto);
      this.showMarcaModal.set(true);
      return;
    }
    console.log('Editar', item);
  }

  deleteItem(item: any) {
    if (this.activeTab() === 'marca') {
      this.alertService
        .confirm('¿Estás seguro?', 'Esta acción no se puede deshacer', 'Eliminar')
        .then((result) => {
          if (result.isConfirmed) {
            this.marcaService.eliminar(item.idMarca).subscribe({
              next: () => {
                this.toastService.success('Marca eliminada correctamente');
                this.cargarMarcas();
              },
              error: () => this.toastService.error('Error al eliminar marca'),
            });
          }
        });
      return;
    }
    console.log('Eliminar', item);
  }

  onTableAction(event: TableActionEvent) {
    if (event.type === 'edit') {
      this.editItem(event.row);
      return;
    }

    if (event.type === 'delete') {
      this.deleteItem(event.row);
    }
  }
}
