import { Component, computed, HostListener, inject, input, signal } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CartService } from '@features/cart/services/cart.service';
import { Producto } from '@features/product/models/product.model';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DetailProductComponent } from '@shared/components/ui/cards/detail-product/detail-product.component';

@Component({
  selector: 'app-search-resultado',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DetailProductComponent],
  templateUrl: './search-resultado.component.html',
  styleUrl: './search-resultado.component.css',
})
export class SearchResultadoComponent {
  searchService = inject(SearchService);
  private cartService = inject(CartService);

  selectedProduct = signal<Producto | null>(null);
  modo = input<'desktop' | 'mobile'>('desktop');

  resultados = computed(() =>
    this.modo() === 'mobile'
      ? this.searchService.resultadosMobile()
      : this.searchService.resultadosDesktop(),
  );

  buscando = computed(() =>
    this.modo() === 'mobile'
      ? this.searchService.buscandoMobile()
      : this.searchService.buscandoDesktop(),
  );

  query = computed(() =>
    this.modo() === 'mobile' ? this.searchService.queryMobile() : this.searchService.queryDesktop(),
  );

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.modo() === 'desktop') {
      this.searchService.limpiarDesktop();
    }
  }

  openDetail(producto: Producto): void {
    this.selectedProduct.set(producto);

    if (this.modo() === 'mobile') {
      this.searchService.limpiarMobile();
    } else {
      this.searchService.limpiarDesktop();
    }
  }

  closeDetail(): void {
    this.selectedProduct.set(null);
  }

  agregar(producto: Producto): void {
    this.cartService.agregarProducto(producto);
  }

  onDetailCartAdded(event: { product: Producto; quantity: number }): void {
    for (let i = 0; i < event.quantity; i += 1) {
      this.cartService.agregarProducto(event.product);
    }
  }
}
