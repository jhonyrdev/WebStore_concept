import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Producto } from '../../../../../features/product/models/product.model';
import { ProductoService } from '../../../../../features/product/services/producto.service';
import { formatCurrencyAmount, SupportedCurrency } from '../../../../utils/currency.utils';
import { ScrollLockService } from '../../../../services/scroll-lock.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  private productService = inject(ProductoService);
  private scrollLockService = inject(ScrollLockService);

  @Input() set productData(val: Producto | null) {
    this._product.set(val);
    if (val) {
      this._quantity.set(1);
      this._visible.set(true);
    }
  }

  @Input() set productId(id: number | null) {
    this._productId.set(id);
  }

  @Input() currency: SupportedCurrency = 'PEN';

  @Output() closed = new EventEmitter<void>();
  @Output() cartAdded = new EventEmitter<{ product: Producto; quantity: number }>();

  private _product = signal<Producto | null>(null);
  private _productId = signal<number | null>(null);
  private _quantity = signal(1);
  private _visible = signal(false);

  product = computed(() => this._product());
  quantity = computed(() => this._quantity());
  visible = computed(() => this._visible());

  formattedPrice = computed(() => {
    const p = this._product();
    if (!p) return '';
    return formatCurrencyAmount(p.precio, { currency: this.currency });
  });

  constructor() {
    effect(() => {
      const id = this._productId();
      if (id == null) return;

      const found = this.productService.products().find((item) => item.id === id) ?? null;
      if (!found) return;

      this._product.set(found);
      this._quantity.set(1);
      this._visible.set(true);
    });

    effect((onCleanup) => {
      if (!this._visible()) {
        return;
      }

      this.scrollLockService.lock();

      onCleanup(() => {
        this.scrollLockService.unlock();
      });
    });
  }

  close() {
    this._visible.set(false);
    this.closed.emit();
  }

  increment() {
    const max = this._product()?.stock ?? 99;
    if (this._quantity() < max) this._quantity.update(v => v + 1);
  }

  decrement() {
    if (this._quantity() > 1) this._quantity.update(v => v - 1);
  }

  addToCart() {
    const p = this._product();
    if (!p) return;
    this.cartAdded.emit({ product: p, quantity: this._quantity() });
    this.close();
  }
}
