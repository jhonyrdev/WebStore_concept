import { Component, computed, inject, signal } from '@angular/core';
import { AdminSaleRecord, AdminSalesService } from '@/app/features/sales/services/admin-sales/admin-sales.service';

@Component({
  selector: 'app-ventas-admin-page',
  standalone: true,
  templateUrl: './ventas-admin-page.html',
  styleUrl: './ventas-admin-page.css',
})
export class VentasAdminPage {
  private readonly salesService = inject(AdminSalesService);

  ventas = signal<AdminSaleRecord[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  readonly totalVentas = computed(() => this.ventas().length);
  readonly ingresosTotales = computed(() => this.ventas().reduce((total, venta) => total + venta.total, 0));
  readonly ticketPromedio = computed(() => {
    const count = this.totalVentas();
    return count === 0 ? 0 : this.ingresosTotales() / count;
  });
  readonly totalItemsVendidos = computed(() =>
    this.ventas().reduce((total, venta) => total + venta.items.reduce((sum, item) => sum + item.cantidad, 0), 0),
  );
  readonly ventasPorMetodo = computed(() => {
    const mapVentas = new Map<string, { metodo: string; ventas: number; ingresos: number }>();

    for (const venta of this.ventas()) {
      const metodo = venta.metodoPago ?? 'Sin método';
      const current = mapVentas.get(metodo) ?? { metodo, ventas: 0, ingresos: 0 };
      current.ventas += 1;
      current.ingresos += venta.total;
      mapVentas.set(metodo, current);
    }

    return [...mapVentas.values()].sort((a, b) => b.ingresos - a.ingresos);
  });
  readonly ventasPorDia = computed(() => {
    const mapVentas = new Map<string, { fecha: string; ventas: number; ingresos: number }>();

    for (const venta of this.ventas()) {
      const current = mapVentas.get(venta.fecha) ?? { fecha: venta.fecha, ventas: 0, ingresos: 0 };
      current.ventas += 1;
      current.ingresos += venta.total;
      mapVentas.set(venta.fecha, current);
    }

    return [...mapVentas.values()].sort((a, b) => b.fecha.localeCompare(a.fecha));
  });
  readonly topProductos = computed(() => {
    const mapProductos = new Map<string, { nombre: string; unidades: number; ingresos: number }>();

    for (const venta of this.ventas()) {
      for (const item of venta.items) {
        const key = item.productId?.toString() ?? item.nombreProducto;
        const current = mapProductos.get(key) ?? { nombre: item.nombreProducto, unidades: 0, ingresos: 0 };
        current.unidades += item.cantidad;
        current.ingresos += item.subtotal;
        mapProductos.set(key, current);
      }
    }

    return [...mapProductos.values()].sort((a, b) => b.unidades - a.unidades).slice(0, 10);
  });
  readonly ventasRecientes = computed(() => this.ventas().slice(0, 10));

  constructor() {
    this.loadVentas();
  }

  loadVentas(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.salesService.listarTodas().subscribe({
      next: (ventas) => {
        this.ventas.set(ventas);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'No se pudieron cargar las ventas');
        this.isLoading.set(false);
      },
    });
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

  formatTime(value: string): string {
    return value?.slice(0, 5) ?? '--:--';
  }

}
