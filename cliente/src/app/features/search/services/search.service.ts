import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductoService } from '@/app/features/product/services/producto/producto.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private productoService = inject(ProductoService);

  queryDesktop = signal('');
  queryMobile = signal('');

  resultadosDesktop = computed(() => this.filtrar(this.queryDesktop()));
  resultadosMobile = computed(() => this.filtrar(this.queryMobile()));

  buscandoDesktop = computed(() => this.queryDesktop().trim().length >= 2);
  buscandoMobile = computed(() => this.queryMobile().trim().length >= 2);

  private filtrar(q: string) {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return this.productoService.products().filter((p) => p.nombre.toLowerCase().includes(term));
  }

  cerrarDropdowns(): void {
    this.queryDesktop.set('');
    this.queryMobile.set('');
  }

  limpiarMobile(): void {
    this.queryMobile.set('');
  }
  limpiarDesktop(): void {
    this.queryDesktop.set('');
  }
}
