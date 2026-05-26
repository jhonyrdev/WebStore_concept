import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import { ThemeService } from '@/app/shared/services/theme.service';
import { ToastService } from '@/app/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '@/app/shared/components/ui/data-table/data-table.component';
import { UnidadFacade } from '@/app/features/product/services/Unidad/unidad.facade';
import { Unidad } from '@/app/features/product/models/unidad.model';
import {
  TableActionEvent,
  TableColumn,
} from '@/app/shared/components/ui/data-table/data-table.component';
import { UnidadFormComponent } from './components/unidad-form/unidad-form.component';
import { MetodoPagoFormComponent } from './components/metodo-pago-form/metodo-pago-form.component';
import { AlertService } from '@/app/shared/services/alert.service';
import { MetodoPagoFacade } from '@/app/features/sales/services/metodoPago/metodo-pago.facade';
import { MetodoPago } from '@/app/features/sales/models/metodo-pago.model';
import { SwitchComponent } from '@/app/shared/components/ui/switch/switch.component';

type Tab = 'unidades' | 'pagos' | 'negocio';

@Component({
  selector: 'app-config-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsComponent,
    DataTableComponent,
    UnidadFormComponent,
    MetodoPagoFormComponent,
    SwitchComponent,
  ],
  templateUrl: './config-admin-page.html',
  styleUrl: './config-admin-page.css',
})
export class ConfigAdminPage implements OnInit {
  private themeService = inject(ThemeService);
  private unidadFacade = inject(UnidadFacade);
  private metodoPagoFacade = inject(MetodoPagoFacade);
  private toastService = inject(ToastService);
  private alertService = inject(AlertService);

  selectedUnidad = signal<Unidad | null>(null);
  showUnidadModal = signal(false);

  selectedMetodo = signal<MetodoPago | null>(null);
  showMetodoModal = signal(false);

  darkMode = this.themeService.darkMode;
  activeTab = signal<Tab>('unidades');

  tabs: TabItem<Tab>[] = [
    { key: 'unidades', label: 'Unidades' },
    { key: 'pagos', label: 'Pagos' },
    { key: 'negocio', label: 'Negocio' },
  ];

  unidadColumns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre', align: 'center' },
    { key: 'simbolo', label: 'Símbolo', align: 'center', width: 'w-32' },
    { key: 'accion', label: 'Acción', align: 'center', width: 'w-40' },
  ];

  pagoColumns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre', align: 'center' },
    { key: 'tipo', label: 'Tipo', align: 'center', width: 'w-48' },
    { key: 'estado', label: 'Estado', align: 'center', width: 'w-32' },
    { key: 'accion', label: 'Acción', align: 'center', width: 'w-40' },
  ];

  negocioNombre = 'Mi Empresa S.A.';

  negocioRFC = '';

  unidades = this.unidadFacade.unidades;
  isLoadingUnidades = this.unidadFacade.isLoading;

  metodos = this.metodoPagoFacade.metodos;
  isLoadingMetodos = this.metodoPagoFacade.isLoading;

  constructor() {
    effect(() => {
      const errorU = this.unidadFacade.error();
      if (errorU) {
        this.toastService.error(errorU);
      }
      const errorM = this.metodoPagoFacade.error();
      if (errorM) {
        this.toastService.error(errorM);
      }
    });
  }

  ngOnInit(): void {
    this.unidadFacade.loadUnidades();
    this.metodoPagoFacade.loadMetodos();
  }

  changeTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  onUnidadAction(event: TableActionEvent) {
    const unidad = event.row as Unidad;
    if (event.type === 'edit') {
      this.editUnidad(unidad);
      return;
    }
    if (event.type === 'delete') {
      this.deleteUnidad(unidad.id);
    }
  }

  onPagoAction(event: TableActionEvent) {
    const pago = event.row as MetodoPago;
    if (event.type === 'edit') {
      this.editMetodo(pago);
      return;
    }
    if (event.type === 'delete') {
      this.deleteMetodo(pago.id);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getTipoBadgeClass(tipo: string): string {
    const map: Record<string, string> = {
      BILLETERAS_DIGITALES: 'text-[var(--color-cyan-inverso)] sm:text-[var(--color-cyan)]',
      TARJETAS: 'text-[var(--color-blue-inverso)] sm:text-[var(--color-blue)]',
    };

    return map[tipo] ?? 'text-gray-700';
  }

  openAddModal() {
    if (this.activeTab() === 'unidades') {
      this.showUnidadModal.set(true);
      this.selectedUnidad.set(null);
    } else if (this.activeTab() === 'pagos') {
      this.showMetodoModal.set(true);
      this.selectedMetodo.set(null);
    }
  }

  editUnidad(unidad: Unidad) {
    this.showUnidadModal.set(true);
    this.selectedUnidad.set(unidad);
  }

  guardarUnidad(data: Omit<Unidad, 'id'>) {
    const current = this.selectedUnidad();

    if (current) {
      this.unidadFacade.updateUnidad(current.id, data, () => {
        this.toastService.success('Unidad actualizada exitosamente');
        this.closeUnidadModal();
      });
      return;
    }

    this.unidadFacade.createUnidad(data, () => {
      this.toastService.success('Unidad creada exitosamente');
      this.closeUnidadModal();
    });
  }

  closeUnidadModal() {
    this.showUnidadModal.set(false);
    this.selectedUnidad.set(null);
  }

  editMetodo(metodo: MetodoPago) {
    this.showMetodoModal.set(true);
    this.selectedMetodo.set(metodo);
  }

  guardarMetodo(data: Omit<MetodoPago, 'id'>) {
    const current = this.selectedMetodo();

    if (current) {
      this.metodoPagoFacade.updateMetodo(current.id, data, () => {
        this.toastService.success('Método de pago actualizado');
        this.closeMetodoModal();
      });
      return;
    }

    this.metodoPagoFacade.createMetodo(data, () => {
      this.toastService.success('Método de pago creado');
      this.closeMetodoModal();
    });
  }

  closeMetodoModal() {
    this.showMetodoModal.set(false);
    this.selectedMetodo.set(null);
  }

  onToggleEstado(metodo: MetodoPago) {
    this.metodoPagoFacade.toggleEstado(metodo.id, () => {
      this.toastService.success(`Método de pago ${!metodo.estado ? 'activado' : 'desactivado'}`);
    });
  }

  deleteMetodo(id: number) {
    this.metodoPagoFacade.deleteMetodo(id).subscribe({
      next: () => {
        this.alertService.success('Método de pago eliminado');
      },
      error: (error: HttpErrorResponse) => {
        const message = error?.error?.message ?? 'No se pudo eliminar el método de pago';
        this.alertService.error('Error al eliminar', message);
      },
    });
  }

  guardarNegocio() {
    this.toastService.success('Configuración guardada correctamente');
  }

  deleteUnidad(id: number) {
    this.unidadFacade.deleteUnidad(id).subscribe({
      next: () => {
        this.alertService.success('Unidad eliminada exitosamente');
      },
      error: (error: HttpErrorResponse) => {
        const message = error?.error?.message ?? 'No se pudo eliminar la unidad';
        this.alertService.error('Error al eliminar', message);
      },
    });
  }
}
