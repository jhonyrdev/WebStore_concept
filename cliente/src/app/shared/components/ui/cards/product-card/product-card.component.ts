import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, signal } from '@angular/core';
import { Producto } from '../../../../../features/product/models/product.model';
import { formatCurrencyAmount, SupportedCurrency } from '../../../../utils/currency.utils';
import { DetailProductComponent } from '../detail-product/detail-product.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass, DetailProductComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Producto;
  @Input() variant: 'grid' | 'slider' = 'grid';
  @Input() currency: SupportedCurrency = 'PEN';
  @Output() addToCart = new EventEmitter<Producto>();

  selectedProduct = signal<Producto | null>(null);

  get formattedPrice(): string {
    return formatCurrencyAmount(this.product?.precio, { currency: this.currency });
  }

  openDetail(): void {
    this.selectedProduct.set(this.product);
  }

  closeDetail(): void {
    this.selectedProduct.set(null);
  }

  onAddButtonClick(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  onDetailCartAdded(event: { product: Producto; quantity: number }): void {
    for (let i = 0; i < event.quantity; i += 1) {
      this.addToCart.emit(event.product);
    }
  }

  @HostBinding('class.is-slider') get isSlider() { return this.variant === 'slider'; }
  @HostBinding('class.is-grid')   get isGrid()   { return this.variant === 'grid'; }
}

