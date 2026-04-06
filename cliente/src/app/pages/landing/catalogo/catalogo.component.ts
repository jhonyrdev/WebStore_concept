import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { CatalogService } from './services/catalog.service';
import { ProductCardComponent } from '@/app/shared/components/ui';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '@/app/features/product/services/producto.service';
import { Producto } from '@/app/features/product/models/product.model';
import { CartService } from '@/app/features/cart/services/cart.service';
import { SortSelectComponent } from '@/app/shared/components/ui/sort-select/sort-select.component';
import { PaginationComponent } from '@/app/shared/components/ui/pagination/pagination.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, startWith, map } from 'rxjs';

@Component({
  selector: 'app-catalogo.component',
  standalone: true,
  imports: [ProductCardComponent, SortSelectComponent, PaginationComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  protected catalog = inject(CatalogService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  productService = inject(ProductoService);

  currentPage = signal(1);

  // Detecta el ancho de pantalla reactivamente
  private readonly windowWidth = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(null),
      map(() => window.innerWidth),
    ),
    { initialValue: window.innerWidth },
  );

  // PageSize reactivo según breakpoint
  readonly pageSize = computed(() => {
    const width = this.windowWidth() ?? 1920;
    if (width <= 768) return 4;
    if (width <= 1290) return 6;
    return 8;
  });

  constructor() {
    effect(() => {
      this.catalog.categoriaId();
      this.currentPage.set(1);
    });

    // Resetea página al cambiar pageSize
    effect(() => {
      this.pageSize();
      this.currentPage.set(1);
    });
  }

  ngOnInit(): void {
    const categoriaId = this.route.snapshot.data['categoriaId'];
    if (categoriaId != null) {
      this.catalog.setCategoriaId(categoriaId);
    }
  }

  readonly totalPages = computed(() =>
    Math.ceil(this.catalog.filteredProducts().length / this.pageSize()),
  );

  readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.catalog.filteredProducts().slice(start, start + this.pageSize());
  });

  onAddToCart(product: Producto): void {
    this.cartService.agregarProducto(product);
  }
}
