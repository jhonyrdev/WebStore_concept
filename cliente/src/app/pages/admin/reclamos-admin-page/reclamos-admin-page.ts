import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { StatisCardComponent } from '@/app/shared/components/ui/cards/statis-card/statis-card.component';
import {
  SortOption,
  SortSelectComponent,
} from '@/app/shared/components/ui/sort-select/sort-select.component';
import { TableSearchComponent } from '@/app/shared/components/ui/search/table-search/table-search.component';
import {
  DataTableComponent,
  TableColumn,
} from '@/app/shared/components/ui/data-table/data-table.component';
import { PaginationComponent } from '@/app/shared/components/ui/pagination/pagination.component';
import { ScreenSizeService } from '@/app/core/services/screen-size/screen-size.service';

interface Reclamo {
  codigo: string;
  asunto: string;
  correo: string;
  resuelto: boolean;
}
type ReclamoEstadoFilter = 'all' | 'true' | 'false';
type ReclamoOrder = 'az' | 'za';

@Component({
  selector: 'app-reclamos-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    StatisCardComponent,
    SortSelectComponent,
    TableSearchComponent,
    DataTableComponent,
    PaginationComponent,
  ],
  templateUrl: './reclamos-admin-page.html',
  styleUrl: './reclamos-admin-page.css',
})
export class ReclamosAdminPage {
  private screenSizeService = inject(ScreenSizeService);

  estadoFilter = signal<ReclamoEstadoFilter>('all');
  order = signal<ReclamoOrder>('az');
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize = this.screenSizeService.pageSize;

  estadoOptions: SortOption<ReclamoEstadoFilter>[] = [
    { value: 'all', label: 'Todos' },
    { value: 'true', label: 'Resuelto' },
    { value: 'false', label: 'Pendiente' },
  ];

  orderOptions: SortOption<ReclamoOrder>[] = [
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
  ];

  clienteColumns: TableColumn[] = [
    { key: 'codigo', label: 'Código', align: 'left' },
    { key: 'asunto', label: 'Asunto', align: 'left' },
    { key: 'correo', label: 'Correo', align: 'left' },
    { key: 'resuelto', label: 'Estado', align: 'center', width: 'w-32' },
    { key: 'accion', label: 'Acción', align: 'center', width: 'w-40' },
  ];

  reclamos: Reclamo[] = [
    {
      codigo: 'RCL-001',
      asunto: 'Producto dañado al recibir',
      correo: 'cliente1@correo.com',
      resuelto: false,
    },
    {
      codigo: 'RCL-002',
      asunto: 'Pedido incompleto',
      correo: 'cliente2@correo.com',
      resuelto: true,
    },
    {
      codigo: 'RCL-003',
      asunto: 'Demora en la entrega',
      correo: 'cliente3@correo.com',
      resuelto: false,
    },
  ];

  reclamosOrdenados = computed(() => {
    const estado = this.estadoFilter();
    const order = this.order();
    const query = this.searchQuery().toLowerCase().trim();

    const filtered = this.reclamos.filter((reclamo) => {
      const matchesEstado = estado === 'all' || reclamo.resuelto.toString() === estado;

      const matchesQuery = !query || reclamo.asunto.toLowerCase().includes(query);

      return matchesEstado && matchesQuery;
    });

    return [...filtered].sort((left, right) => {
      const comparison = left.asunto.localeCompare(right.asunto, 'es');
      return order === 'za' ? comparison * -1 : comparison;
    });
  });

  totalPages = computed(() => Math.ceil(this.reclamosOrdenados().length / this.pageSize()));

  reclamosPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.reclamosOrdenados().slice(start, end);
  });

  get totalReclamos(): number {
    return this.reclamos.length;
  }

  get resolvedReclamos(): number {
    return this.reclamos.filter((r) => r.resuelto).length;
  }

  get pendingReclamos(): number {
    return this.reclamos.filter((r) => !r.resuelto).length;
  }

  changeEstadoFilter(value: ReclamoEstadoFilter) {
    this.estadoFilter.set(value);
  }

  changeOrder(value: ReclamoOrder) {
    this.order.set(value);
  }

  observeReclamo(reclamo: Reclamo) {
    console.log('Observar reclamo', reclamo);
  }

  replyReclamo(reclamo: Reclamo) {
    console.log('Responder reclamo', reclamo);
  }
}
