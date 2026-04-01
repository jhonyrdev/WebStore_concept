import { NgClass, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../../../features/product/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass, DecimalPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Producto;
  @Output() addToCart = new EventEmitter<Producto>();
}
