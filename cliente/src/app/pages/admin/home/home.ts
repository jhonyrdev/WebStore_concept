import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';
import { AdminSalesService } from '@/app/features/sales/services/admin-sales/admin-sales.service';
import { ClientesAdminService } from '@/app/features/auth/service/admin/clientes-admin.service';
import { CategoriaService } from '@/app/features/categories/services/categorias/categoria.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly productService = inject(ProductoService);
  private readonly salesService = inject(AdminSalesService);
  private readonly clientesService = inject(ClientesAdminService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly marcaService = inject(MarcaService);

  productos = signal(this.productService.products());
  ventas = signal([] as ReturnType<AdminSalesService['listarTodas']> extends import('rxjs').Observable<infer T> ? T : never);
  clientes = signal([] as ReturnType<ClientesAdminService['listar']> extends import('rxjs').Observable<infer T> ? T : never);
  categorias = this.categoriaService.categories;
  marcas = signal([] as ReturnType<MarcaService['listar']> extends import('rxjs').Observable<infer T> ? T : never);

  isLoading = signal(true);

  readonly totalProductos = computed(() => this.productos().length);
  readonly totalClientes = computed(() => this.clientes().length);
  readonly totalVentas = computed(() => this.ventas().length);
  readonly ingresosTotales = computed(() => this.ventas().reduce((total, venta) => total + venta.total, 0));
  readonly lowStockProducts = computed(() => this.productos().filter((producto) => producto.stock <= 5));
  readonly ventasRecientes = computed(() => this.ventas().slice(0, 5));
  readonly clientesActivos = computed(() =>
    this.clientes().filter((cliente) => cliente.estado.toString().toUpperCase() === 'ACTIVO').length,
  );
  readonly categoriasCount = computed(() => this.categorias().length);
  readonly marcasCount = computed(() => this.marcas().length);

  constructor() {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.productService.listarAdmin().subscribe({
      next: (productos) => this.productos.set(productos as never),
      error: () => this.productos.set([] as never),
    });

    this.salesService.listarTodas().subscribe({
      next: (ventas) => this.ventas.set(ventas as never),
      error: () => this.ventas.set([] as never),
    });

    this.clientesService.listar().subscribe({
      next: (clientes) => this.clientes.set(clientes as never),
      error: () => this.clientes.set([] as never),
    });

    this.marcaService.listar().subscribe({
      next: (marcas) => this.marcas.set(marcas as never),
      error: () => this.marcas.set([] as never),
    });

    this.categoriaService.loadCategories();
    this.isLoading.set(false);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(value);
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}