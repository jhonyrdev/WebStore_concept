import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPago } from '../../models/metodo-pago.model';

@Injectable({
  providedIn: 'root',
})
export class MetodoPagoFacade {
  private metodosSignal = signal<MetodoPago[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly metodos = this.metodosSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private metodoPagoService: MetodoPagoService) {}

  loadMetodos(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.metodoPagoService
      .listar()
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (metodos) => this.metodosSignal.set(metodos),
        error: () => {
          this.metodosSignal.set([]);
          this.errorSignal.set('No se pudieron cargar los métodos de pago');
        },
      });
  }

  createMetodo(data: Omit<MetodoPago, 'id'>, onSuccess?: () => void): void {
    this.loadingSignal.set(true);
    this.metodoPagoService
      .crear(data)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (metodo) => {
          this.metodosSignal.update((items) => [...items, metodo]);
          onSuccess?.();
        },
        error: (err) =>
          this.errorSignal.set(err?.error?.message || 'Error al crear el método de pago'),
      });
  }

  updateMetodo(id: number, data: Omit<MetodoPago, 'id'>, onSuccess?: () => void): void {
    this.loadingSignal.set(true);
    this.metodoPagoService
      .actualizar(id, data)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (updated) => {
          this.metodosSignal.update((items) => items.map((m) => (m.id === id ? updated : m)));
          onSuccess?.();
        },
        error: (err) =>
          this.errorSignal.set(err?.error?.message || 'Error al actualizar el método de pago'),
      });
  }

  toggleEstado(id: number, onSuccess?: () => void): void {
    this.metodoPagoService.cambiarEstado(id).subscribe({
      next: (updated) => {
        this.metodosSignal.update((items) => items.map((m) => (m.id === id ? updated : m)));
        onSuccess?.();
      },
      error: (err) => this.errorSignal.set(err?.error?.message || 'Error al cambiar el estado'),
    });
  }

  deleteMetodo(id: number) {
    return this.metodoPagoService.eliminar(id).pipe(
      map(() => {
        this.metodosSignal.update((items) => items.filter((m) => m.id !== id));
      }),
    );
  }
}

import { map } from 'rxjs';
