import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import { ThemeService } from '@/app/shared/services/theme.service';
import { ToastService } from '@/app/shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PromocionService } from '@/app/features/promocion/service/promocion.service';
import { ProductoPromocionService } from '@/app/features/promocion/service/productopromocion.service';
import { PromocionRequestDto, PromocionResponseDto } from '@/app/features/promocion/models/promocion.model';
import { ProductoPromocionRequestDto } from '@/app/features/promocion/models/producto-promocion.model';

type Tab = 'unidades' | 'pagos' | 'negocio' | 'promociones';

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
    ReactiveFormsModule,
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
  private promocionService = inject(PromocionService);
  private productoPromocionService = inject(ProductoPromocionService);
  private fb = inject(FormBuilder);

  selectedUnidad = signal<Unidad | null>(null);
  showUnidadModal = signal(false);

  selectedMetodo = signal<MetodoPago | null>(null);
  showMetodoModal = signal(false);

  promociones = signal<PromocionResponseDto[]>([]);
  isLoadingPromociones = signal(false);
  showPromoModal = signal(false);
  showAsignarModal = signal(false);
  showQuitarModal = signal(false);
  editingPromoId = signal<number | null>(null);

  tiposDescuento = ['PORCENTAJE', 'MONTO'];
  estados = ['ACTIVO', 'INACTIVO', 'VENCIDO'];

  promocionForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    tipoDescuento: ['PORCENTAJE', Validators.required],
    valorDescuento: ['', [Validators.required, Validators.min(0.01)]],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    estado: ['ACTIVO', Validators.required],
  });

  asignarForm = this.fb.group({
    idProd: ['', Validators.required],
    idPromocion: ['', Validators.required],
  });

  quitarForm = this.fb.group({
    idProd: ['', Validators.required],
    idPromocion: ['', Validators.required],
  });

  darkMode = this.themeService.darkMode;
  activeTab = signal<Tab>('unidades');

  tabs: TabItem<Tab>[] = [
    { key: 'unidades', label: 'Unidades' },
    { key: 'pagos', label: 'Pagos' },    
    { key: 'promociones', label: 'Promociones' },
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

  promocionColumns: TableColumn[] = [
  { key: 'nombre', label: 'Nombre', align: 'center' },
  { key: 'tipoDescuento', label: 'Tipo', align: 'center', width: 'w-32' },
  { key: 'valorDescuento', label: 'Valor', align: 'center', width: 'w-24' },
  { key: 'fechaInicio', label: 'Inicio', align: 'center', width: 'w-32' },
  { key: 'fechaFin', label: 'Fin', align: 'center', width: 'w-32' },
  { key: 'estado', label: 'Estado', align: 'center', width: 'w-28' },
  { key: 'accion', label: 'Acciones', align: 'center', width: 'w-40' },
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
    this.loadPromociones();
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

  loadPromociones() {
    this.isLoadingPromociones.set(true);
    this.promocionService.getAll().subscribe({
      next: (data) => {
        this.promociones.set(data);
        this.isLoadingPromociones.set(false);
      },
      error: (err) => {
        this.toastService.error('Error al cargar promociones');
        this.isLoadingPromociones.set(false);
      },
    });
  }

  openPromoModal(promo?: PromocionResponseDto) {
    if (promo) {
      this.editingPromoId.set(promo.idPromocion);
      this.promocionForm.patchValue({
        ...promo,
        valorDescuento: promo.valorDescuento.toString(),
      });
    } else {
      this.editingPromoId.set(null);
      this.promocionForm.reset({ tipoDescuento: 'PORCENTAJE', estado: 'ACTIVO' });
    }
    this.showPromoModal.set(true);
  }
  closePromoModal() {
    this.showPromoModal.set(false);
    this.promocionForm.reset();
    this.editingPromoId.set(null);
  }
  openAsignarModal() {
    this.showAsignarModal.set(true);
  }
  closeAsignarModal() {
    this.showAsignarModal.set(false);
    this.asignarForm.reset();
  }
  openQuitarModal() {
    this.showQuitarModal.set(true);
  }
  closeQuitarModal() {
    this.showQuitarModal.set(false);
    this.quitarForm.reset();
  }

  private buildPromocionDto(formValue: any): PromocionRequestDto | null {
  const tiposValidos: PromocionRequestDto['tipoDescuento'][] = ['PORCENTAJE', 'MONTO'];
  const estadosValidos: PromocionRequestDto['estado'][] = ['ACTIVO', 'INACTIVO'];

  if (!tiposValidos.includes(formValue.tipoDescuento)) {
    this.toastService.error('Tipo de descuento inválido');
    return null;
  }

  if (!estadosValidos.includes(formValue.estado)) {
    this.toastService.error('Estado inválido');
    return null;
  }

  return {
    nombre: formValue.nombre ?? '',
    descripcion: formValue.descripcion ?? '',
    tipoDescuento: formValue.tipoDescuento,
    valorDescuento: Number(formValue.valorDescuento),
    fechaInicio: formValue.fechaInicio ?? '',
    fechaFin: formValue.fechaFin ?? '',
    estado: formValue.estado,
  };
}

private buildProductoPromocionDto(formValue: any): ProductoPromocionRequestDto | null {
  const idProd = Number(formValue.idProd);
  const idPromocion = Number(formValue.idPromocion);

  if (!idProd || !idPromocion) {
    this.toastService.error('Debe indicar producto y promoción válidos');
    return null;
  }

  return { idProd, idPromocion };
}

savePromocion() {
  if (this.promocionForm.invalid) return;

  const data = this.buildPromocionDto(this.promocionForm.value);
  if (!data) return;

  const id = this.editingPromoId();
  const action$ = id
    ? this.promocionService.update(id, data)
    : this.promocionService.create(data);

  action$.subscribe({
    next: () => {
      this.toastService.success(id ? 'Promoción actualizada' : 'Promoción creada');
      this.loadPromociones();
      this.closePromoModal();
    },
    error: (err) => this.toastService.error('Error al guardar la promoción'),
  });
}

deletePromocion(id: number) {
  this.promocionService.delete(id).subscribe({
    next: () => {
      this.alertService.success('Promoción eliminada');
      this.loadPromociones();
    },
    error: (err: HttpErrorResponse) => {
      const msg = err?.error?.message ?? 'No se pudo eliminar la promoción';
      this.alertService.error('Error al eliminar', msg);
    },
  });
}

asignarPromocion() {
  if (this.asignarForm.invalid) return;

  const data = this.buildProductoPromocionDto(this.asignarForm.value);
  if (!data) return;

  this.productoPromocionService.asignar(data).subscribe({
    next: () => {
      this.toastService.success('Promoción asignada correctamente');
      this.closeAsignarModal();
    },
    error: (err) => this.toastService.error('Error al asignar: ' + err?.error?.message),
  });
}

quitarPromocion() {
  if (this.quitarForm.invalid) return;

  const data = this.buildProductoPromocionDto(this.quitarForm.value);
  if (!data) return;

  this.productoPromocionService.quitar(data).subscribe({
    next: () => {
      this.toastService.success('Promoción removida correctamente');
      this.closeQuitarModal();
    },
    error: (err) => this.toastService.error('Error al remover: ' + err?.error?.message),
  });
}

  getEstadoColor(estado: string): string {
    const map: Record<string, string> = {
      ACTIVO: 'text-[var(--color-green-inverso)] sm:text-[var(--color-green)]',
      INACTIVO: 'text-[var(--color-gray)]',
    };
    return map[estado] ?? 'text-[var(--color-gray)]';
  }

  getTipoLabel(tipo: string): string {
    return tipo === 'PORCENTAJE' ? '%' : '$';
  }
  
  onPromocionAction(event: TableActionEvent) {
  const promo = event.row as PromocionResponseDto;
  if (event.type === 'edit') {
    this.openPromoModal(promo);
    return;
  }
  if (event.type === 'delete') {
    this.deletePromocion(promo.idPromocion);
  }
}
}
