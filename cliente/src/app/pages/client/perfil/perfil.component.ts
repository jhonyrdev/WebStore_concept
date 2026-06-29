import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DataTableComponent, TableColumn } from '@shared-Component-Ui/data-table/data-table.component';
import {
  ClientAuthService,
  ClientSessionProfile,
} from '@/app/features/auth/service/client/login/client-auth.service';
import { PurchaseHistoryRecord, PurchaseHistoryService } from '@/app/features/sales/services/purchase-history/purchase-history.service';
import { AlertService } from '@/app/shared/services/alert.service';

interface PerfilArchivo {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  telefono: string;
  documento: string;
  direccion: string | null;
  fechaRegistro: string | null;
  credencial_id: number;
}

interface PerfilUsuario {
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  telefono: string;
  documento: string;
  direccion: string;
  miembroDesde: string;
  puntosActuales: number;
  puntosSiguienteNivel: number;
}

type PerfilField = 'nombre' | 'apellido' | 'correo' | 'telefono' | 'documento' | 'direccion';

const PROFILE_STORAGE_PREFIX = 'tambito_client_profile:';

const DEFAULT_PROFILE: PerfilUsuario = {
  nombre: 'Cliente',
  apellido: 'Tambito',
  correo: '',
  rol: 'CLIENTE',
  telefono: '',
  documento: '',
  direccion: '',
  miembroDesde: 'Pendiente',
  puntosActuales: 0,
  puntosSiguienteNivel: 200,
};

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(ClientAuthService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly purchaseHistoryService = inject(PurchaseHistoryService);

  private storageKey = '';
  private perfilOriginal: PerfilUsuario = { ...DEFAULT_PROFILE };

  isLoading = signal(true);
  isEditing = signal(false);
  feedback = signal('');

  usuario = signal<PerfilUsuario>({ ...DEFAULT_PROFILE });

  estadisticas = signal([
    { label: 'Pedidos Totales', valor: '0', icono: '📦' },
    { label: 'Puntos Tambito+', valor: '0', icono: '⭐' },
  ]);

  historialPedidos = signal<PurchaseHistoryRecord[]>([]);

  columnasHistorial: TableColumn[] = [
    { key: 'id', label: 'Código', align: 'left' },
    { key: 'fecha', label: 'Fecha', align: 'center' },
    { key: 'total', label: 'Total', align: 'right' },
    { key: 'estado', label: 'Estado', align: 'center' },
    { key: 'acciones', label: 'Acción', align: 'center' },
  ];

  async ngOnInit(): Promise<void> {
    await this.cargarPerfil();
  }

  async cargarPerfil(): Promise<void> {
    this.isLoading.set(true);
    this.feedback.set('');

    const sessionProfile = this.authService.getSessionProfile();
    const identity = this.getIdentity(sessionProfile);

    if (!identity) {
      this.usuario.set({ ...DEFAULT_PROFILE });
      this.perfilOriginal = { ...DEFAULT_PROFILE };
      this.isLoading.set(false);
      return;
    }

    this.storageKey = `${PROFILE_STORAGE_PREFIX}${identity.toLowerCase()}`;

    try {
      const perfiles = await firstValueFrom(this.http.get<PerfilArchivo[]>('/data/perfil.json'));
      const perfilServidor = this.buscarPerfil(perfiles, identity);
      const perfilGuardado = this.leerPerfilGuardado();
      const perfilBase = this.construirPerfilBase(perfilServidor, sessionProfile, identity);
      const perfilFinal = {
        ...perfilBase,
        ...perfilGuardado,
        correo: perfilGuardado?.correo ?? perfilBase.correo,
        rol: perfilBase.rol,
        puntosActuales: perfilGuardado?.puntosActuales ?? perfilBase.puntosActuales,
        puntosSiguienteNivel: perfilGuardado?.puntosSiguienteNivel ?? perfilBase.puntosSiguienteNivel,
      };

      this.usuario.set(perfilFinal);
      this.perfilOriginal = { ...perfilFinal };
      const historial = await firstValueFrom(this.purchaseHistoryService.loadHistory());
      this.historialPedidos.set(historial);
      this.actualizarEstadisticas(historial.length, perfilFinal.puntosActuales);
    } catch {
      const perfilBase = this.construirPerfilBase(null, sessionProfile, identity);
      const perfilGuardado = this.leerPerfilGuardado();
      const perfilFinal = { ...perfilBase, ...perfilGuardado };

      this.usuario.set(perfilFinal);
      this.perfilOriginal = { ...perfilFinal };
      const historial = this.purchaseHistoryService.getByClient(identity);
      this.historialPedidos.set(historial);
      this.actualizarEstadisticas(historial.length, perfilFinal.puntosActuales);
    } finally {
      this.isLoading.set(false);
    }
  }

  editarPerfil(): void {
    this.isEditing.set(true);
    this.feedback.set('');
  }

  cancelarEdicion(): void {
    this.usuario.set({ ...this.perfilOriginal });
    this.isEditing.set(false);
    this.feedback.set('Cambios descartados.');
  }

  guardarPerfil(): void {
    if (!this.storageKey) return;

    const perfilActual = { ...this.usuario() };
    localStorage.setItem(this.storageKey, JSON.stringify(perfilActual));
    this.perfilOriginal = { ...perfilActual };
    this.isEditing.set(false);
    this.feedback.set('Perfil actualizado correctamente.');
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.usuario.set({ ...DEFAULT_PROFILE });
    this.perfilOriginal = { ...DEFAULT_PROFILE };
    this.storageKey = '';
    this.isEditing.set(false);
    this.feedback.set('Sesión cerrada.');
    void this.router.navigate(['/']);
  }

  actualizarCampo(campo: PerfilField, event: Event): void {
    const target = event.target as HTMLInputElement;
    const valor = target.value;

    this.usuario.update((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  }

  async verReporte(reporte: PurchaseHistoryRecord): Promise<void> {
    const report = this.purchaseHistoryService.getById(reporte.id) ?? reporte;
    const fechaHora = report.hora ? new Date(`${report.fecha}T${report.hora}`) : new Date(report.fecha);
    const detalleHtml = report.items
      .map(
        (item) =>
          `<li style="margin-bottom:6px;">${item.cantidad} x ${item.nombre} - S/ ${item.subtotal.toFixed(2)}</li>`,
      )
      .join('');

    await this.alertService.custom({
      title: `Reporte ${report.id}`,
      html: `
        <div style="text-align:left;">
          <p><strong>Fecha:</strong> ${fechaHora.toLocaleString('es-PE')}</p>
          <p><strong>Cliente:</strong> ${report.clienteNombre}</p>
          <p><strong>Método:</strong> ${report.metodoPago}</p>
          <p><strong>Comprobante:</strong> ${report.tipoComprobante}</p>
          <p><strong>Estado:</strong> ${report.estado}</p>
          <hr style="margin:12px 0;" />
          <ul style="padding-left:18px;">${detalleHtml}</ul>
          <hr style="margin:12px 0;" />
          <p><strong>Subtotal:</strong> S/ ${report.subtotal.toFixed(2)}</p>
          <p><strong>IGV:</strong> S/ ${report.igv.toFixed(2)}</p>
          <p><strong>Total:</strong> S/ ${report.total.toFixed(2)}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
    });
  }

  descargarPdf(reporte: PurchaseHistoryRecord): void {
    this.purchaseHistoryService.descargarPdf(reporte);
  }

  getIniciales(): string {
    const nombre = this.usuario().nombre?.trim() || 'C';
    const apellido = this.usuario().apellido?.trim() || 'T';
    return `${nombre[0]}${apellido[0]}`.toUpperCase();
  }

  private getIdentity(sessionProfile: ClientSessionProfile | null): string {
    return (
      sessionProfile?.email?.trim() ||
      sessionProfile?.username?.trim() ||
      this.authService.username()?.trim() ||
      ''
    );
  }

  private buscarPerfil(perfiles: PerfilArchivo[], identity: string): PerfilArchivo | null {
    const normalizedIdentity = identity.toLowerCase();
    return (
      perfiles.find((perfil) => perfil.email.toLowerCase() === normalizedIdentity) ??
      perfiles.find((perfil) => perfil.codigo.toLowerCase() === normalizedIdentity) ??
      null
    );
  }

  private construirPerfilBase(
    perfilServidor: PerfilArchivo | null,
    sessionProfile: ClientSessionProfile | null,
    identity: string,
  ): PerfilUsuario {
    if (perfilServidor) {
      const nombreCompleto = this.dividirNombre(perfilServidor.nombre);
      return {
        nombre: nombreCompleto.nombre,
        apellido: nombreCompleto.apellido,
        correo: perfilServidor.email,
        rol: sessionProfile?.rol ?? this.authService.role() ?? 'CLIENTE',
        telefono: perfilServidor.telefono ?? '',
        documento: perfilServidor.documento ?? '',
        direccion: perfilServidor.direccion ?? '',
        miembroDesde: perfilServidor.fechaRegistro ?? 'Pendiente',
        puntosActuales: this.calcularPuntos(perfilServidor.id),
        puntosSiguienteNivel: 200,
      };
    }

    return {
      ...DEFAULT_PROFILE,
      nombre: this.capitalizar(identity.split('@')[0]?.split(/[._-]/)[0] ?? DEFAULT_PROFILE.nombre),
      apellido: this.capitalizar(identity.split('@')[0]?.split(/[._-]/).slice(1).join(' ') || DEFAULT_PROFILE.apellido),
      correo: identity,
      rol: sessionProfile?.rol ?? this.authService.role() ?? 'CLIENTE',
    };
  }

  private leerPerfilGuardado(): Partial<PerfilUsuario> | null {
    if (!this.storageKey) return null;

    const rawProfile = localStorage.getItem(this.storageKey);
    if (!rawProfile) return null;

    try {
      return JSON.parse(rawProfile) as Partial<PerfilUsuario>;
    } catch {
      return null;
    }
  }

  private dividirNombre(nombreCompleto: string): { nombre: string; apellido: string } {
    const partes = nombreCompleto.trim().split(/\s+/).filter(Boolean);

    if (partes.length === 0) {
      return { nombre: DEFAULT_PROFILE.nombre, apellido: DEFAULT_PROFILE.apellido };
    }

    if (partes.length === 1) {
      return { nombre: partes[0], apellido: '' };
    }

    return {
      nombre: partes[0],
      apellido: partes.slice(1).join(' '),
    };
  }

  private capitalizar(texto: string): string {
    if (!texto) return '';
    return texto
      .split(' ')
      .filter(Boolean)
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase())
      .join(' ');
  }

  private calcularPuntos(id: number): number {
    return Math.min(200, 40 + id * 30);
  }

  private actualizarEstadisticas(pedidos: number, puntos: number): void {
    this.estadisticas.set([
      { label: 'Pedidos Totales', valor: String(pedidos), icono: '📦' },
      { label: 'Puntos Tambito+', valor: String(puntos), icono: '⭐' },
    ]);
  }
}
