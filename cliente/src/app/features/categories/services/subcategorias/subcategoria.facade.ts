import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SubcategoriaService } from './subcategoria.service';
import { SubCategoriaDetalleDto } from '../../models/subcategoria.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriaFacade {
  private subcategoriasSignal = signal<SubCategoriaDetalleDto[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly subcategorias = this.subcategoriasSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private subcategoriaService: SubcategoriaService) {}

  loadSubcategoriasConDetalles(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.subcategoriaService
      .listarConDetalles()
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (subcategorias) => this.subcategoriasSignal.set(subcategorias),
        error: () => {
          this.subcategoriasSignal.set([]);
          this.errorSignal.set('No se pudieron cargar las subcategorías');
        },
      });
  }
}
