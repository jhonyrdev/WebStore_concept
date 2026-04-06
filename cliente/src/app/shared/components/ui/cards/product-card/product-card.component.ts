import { NgClass, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Producto } from '../../../../../features/product/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Producto;
  @Input() variant: 'grid' | 'slider' = 'grid';
  @Output() addToCart = new EventEmitter<Producto>();

  @HostBinding('class.is-slider') get isSlider() { return this.variant === 'slider'; }
  @HostBinding('class.is-grid')   get isGrid()   { return this.variant === 'grid'; }
}

