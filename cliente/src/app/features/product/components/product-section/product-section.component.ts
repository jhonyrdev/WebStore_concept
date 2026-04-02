import { Component, inject } from '@angular/core';
import { SliderComponent, ProductCardComponent } from '@shared/components/ui';
import { SkeletonProductoComponent } from '@shared-Component-Common/skeleton/skeleton-producto/skeleton-producto.component';
import { Producto } from '../../models/product.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [SliderComponent, ProductCardComponent, SkeletonProductoComponent],
  templateUrl: './product-section.component.html'
})
export class ProductSectionComponent {
  productService = inject(ProductoService)
  //cartService    = inject(CartService)
  //toastService   = inject(ToastService)

  onAddToCart(product: Producto) {
    //this.cartService.add(product)
    //this.toastService.show(`${product.nombre} agregado`)
  }
}
