import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnidadService } from './unidad.service';
import { Unidad } from '../../models/unidad.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadFacade {
  private unidadesSignal = signal<Unidad[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly unidades = this.unidadesSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private unidadService: UnidadService) {}

  loadUnidades(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.unidadService
      .listar()
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (unidades) => this.unidadesSignal.set(unidades),
        error: () => {
          this.unidadesSignal.set([]);
          this.errorSignal.set('No se pudieron cargar las unidades');
        },
      });
  }

  removeUnidadLocal(id: number): void {
    this.unidadesSignal.update((items) => items.filter((unidad) => unidad.id !== id));
  }

  createUnidad(data: Omit<Unidad, 'id'>, onSuccess?: (unidad: Unidad) => void): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.unidadService
      .crear(data)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (unidad) => {
          this.unidadesSignal.update((items) => [...items, unidad]);
          onSuccess?.(unidad);
        },
        error: () => {
          this.errorSignal.set('No se pudo crear la unidad');
        },
      });
  }

  updateUnidad(id: number, data: Omit<Unidad, 'id'>, onSuccess?: (unidad: Unidad) => void): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.unidadService
      .actualizar(id, data)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (unidad) => {
          this.unidadesSignal.update((items) =>
            items.map((item) => (item.id === unidad.id ? unidad : item)),
          );
          onSuccess?.(unidad);
        },
        error: () => {
          this.errorSignal.set('No se pudo actualizar la unidad');
        },
      });
  }

  deleteUnidad(id: number): Observable<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.unidadService.eliminar(id).pipe(finalize(() => this.loadingSignal.set(false)));
  }
}
