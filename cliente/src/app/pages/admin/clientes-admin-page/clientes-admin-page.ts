import { Component, OnInit, computed, inject, signal, effect } from '@angular/core';
import {
  DataTableComponent,
  TableColumn,
} from '../../../shared/components/ui/data-table/data-table.component';
import {
  SortOption,
  SortSelectComponent,
} from '../../../shared/components/ui/sort-select/sort-select.component';
import { CommonModule } from '@angular/common';
import { ClienteService } from './service/cliente.service';
import { ClienteListDto } from './models/cliente-list-dto.model';
import { PaginationComponent } from '../../../shared/components/ui/pagination/pagination.component';
import { ScreenSizeService } from '@/app/core/services/screen-size/screen-size.service';
import { TableSearchComponent } from '@/app/shared/components/ui/search/table-search/table-search.component';

type ClienteStateFilter = 'all' | 'ACTIVO' | 'INACTIVO';
type ClienteOrder = 'az' | 'za';

@Component({
  selector: 'app-clientes-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    SortSelectComponent,
    PaginationComponent,
    TableSearchComponent,
  ],
  templateUrl: './clientes-admin-page.html',
  styleUrl: './clientes-admin-page.css',
})
export class ClientesAdminPage implements OnInit {
  private clienteService = inject(ClienteService);
  private screenSizeService = inject(ScreenSizeService);

  clientes = signal<ClienteListDto[]>([]);
  stateFilter = signal<ClienteStateFilter>('all');
  order = signal<ClienteOrder>('az');
  searchQuery = signal('');

  currentPage = signal(1);
  pageSize = this.screenSizeService.pageSize;

  constructor() {
    // Reset to page 1 when filters change
    effect(
      () => {
        this.stateFilter();
        this.order();
        this.searchQuery();
        this.currentPage.set(1);
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.listar().subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => console.error('Error al cargar clientes:', err),
    });
  }

  stateOptions: SortOption<ClienteStateFilter>[] = [
    { value: 'all', label: 'Todos' },
    { value: 'ACTIVO', label: 'Activo' },
    { value: 'INACTIVO', label: 'Inactivo' },
  ];

  orderOptions: SortOption<ClienteOrder>[] = [
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
  ];

  clienteColumns: TableColumn[] = [
    { key: 'nombreCompleto', label: 'Nombre Completo', align: 'left' },
    { key: 'email', label: 'Correo', align: 'left' },
    { key: 'estado', label: 'Estado', align: 'center', width: 'w-32' },
    { key: 'accion', label: 'Acción', align: 'center', width: 'w-40' },
  ];

  clientesOrdenados = computed(() => {
    const data = this.clientes();
    const filter = this.stateFilter();
    const order = this.order();
    const query = this.searchQuery().toLowerCase().trim();

    const filtered = data.filter((cliente) => {
      const matchesState = filter === 'all' || cliente.estado === filter;
      const matchesSearch = !query || cliente.nombreCompleto.toLowerCase().includes(query);
      return matchesState && matchesSearch;
    });

    return [...filtered].sort((left, right) => {
      const comparison = left.nombreCompleto.localeCompare(right.nombreCompleto, 'es');
      return order === 'za' ? comparison * -1 : comparison;
    });
  });

  totalPages = computed(() => Math.ceil(this.clientesOrdenados().length / this.pageSize()));

  clientesPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.clientesOrdenados().slice(start, end);
  });

  verHistorial(cliente: ClienteListDto) {
    console.log('Ver historial de:', cliente.nombreCompleto);
  }
}
