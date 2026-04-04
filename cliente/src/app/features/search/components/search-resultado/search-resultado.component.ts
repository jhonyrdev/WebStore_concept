import { Component, computed, HostListener, inject, input } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CartService } from 'app/features/cart/services/cart.service';
import { Producto } from 'app/features/product/models/product.model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-search-resultado',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './search-resultado.component.html',
  styleUrl: './search-resultado.component.css',
})
export class SearchResultadoComponent {
  searchService = inject(SearchService);
  private cartService = inject(CartService);

  modo = input<'desktop' | 'mobile'>('desktop');

resultados = computed(() =>
  this.modo() === 'mobile'
    ? this.searchService.resultadosMobile()
    : this.searchService.resultadosDesktop()
);

buscando = computed(() =>
  this.modo() === 'mobile'
    ? this.searchService.buscandoMobile()
    : this.searchService.buscandoDesktop()
);

query = computed(() =>
  this.modo() === 'mobile'
    ? this.searchService.queryMobile()
    : this.searchService.queryDesktop()
);

@HostListener('window:scroll')
onScroll(): void {
  if (this.modo() === 'desktop') {
    this.searchService.limpiarDesktop();
  }
}

  agregar(producto: Producto): void {
    this.cartService.agregarProducto(producto);
  }
}
