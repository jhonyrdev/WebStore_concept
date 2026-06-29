import { Component, computed, inject, signal } from '@angular/core';
import { ClientesAdminService, AdminClientRecord } from '@/app/features/auth/service/admin/clientes-admin.service';

@Component({
  selector: 'app-clientes-admin-page',
  standalone: true,
  templateUrl: './clientes-admin-page.html',
  styleUrl: './clientes-admin-page.css',
})
export class ClientesAdminPage {
  private readonly clientesService = inject(ClientesAdminService);

  clientes = signal<AdminClientRecord[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  readonly totalClientes = computed(() => this.clientes().length);
  readonly clientesActivos = computed(() =>
    this.clientes().filter((cliente) => cliente.estado.toUpperCase() === 'ACTIVO').length,
  );
  readonly clientesInactivos = computed(() => this.totalClientes() - this.clientesActivos());
  readonly dominiosEmail = computed(() => {
    const domains = new Map<string, number>();

    for (const cliente of this.clientes()) {
      const dominio = cliente.email?.split('@')[1]?.toLowerCase() ?? 'sin correo';
      domains.set(dominio, (domains.get(dominio) ?? 0) + 1);
    }

    return [...domains.entries()]
      .map(([dominio, total]) => ({ dominio, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  });

  constructor() {
    this.loadClientes();
  }

  loadClientes(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.clientesService.listar().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message || 'No se pudieron cargar los clientes');
        this.isLoading.set(false);
      },
    });
  }

  formatEstado(estado: string): string {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  }

  get estadoClase(): Record<string, string> {
    return {
      activo: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
      inactivo: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
    };
  }
}
