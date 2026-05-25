import { Component, inject } from '@angular/core';
import { SliderComponent, ProductCardComponent } from '@shared/components/ui';
import { SkeletonProductoComponent } from '@shared-Component-Common/skeleton/skeleton-producto/skeleton-producto.component';
import { Producto } from '../../models/product.model';
import { ProductoService } from '../../services/producto/producto.service';
import { CartService } from '@features/cart/services/cart.service';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [SliderComponent, ProductCardComponent, SkeletonProductoComponent],
  templateUrl: './product-section.component.html',
})
export class ProductSectionComponent {
  productService = inject(ProductoService);
  private cartService = inject(CartService);

  onAddToCart(product: Producto): void {
    this.cartService.agregarProducto(product);
  }
}
