import { computed, Injectable, signal } from '@angular/core';
import { Producto } from '@features/product/models/product.model';
import { CartItem } from '../models/cart-Item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);
 
  // Computed signals
  cartItems = computed(() => this.items());
 
  totalItems = computed(() =>
    this.items().reduce((acc, item) => acc + item.cantidad, 0)
  );
 
  subtotal = computed(() =>
    this.items().reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    )
  );
 
  agregarProducto(producto: Producto): void {
    const current = this.items();
    const existente = current.find((i) => i.producto.id === producto.id);
 
    if (existente) {
      if (existente.cantidad >= producto.stock) return; // respeta stock
      this.items.set(
        current.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      );
    } else {
      this.items.set([...current, { producto, cantidad: 1 }]);
    }
  }
 
  restarProducto(productoId: number): void {
    const current = this.items();
    const existente = current.find((i) => i.producto.id === productoId);
    if (!existente) return;
 
    if (existente.cantidad === 1) {
      this.eliminarProducto(productoId);
    } else {
      this.items.set(
        current.map((i) =>
          i.producto.id === productoId
            ? { ...i, cantidad: i.cantidad - 1 }
            : i
        )
      );
    }
  }
 
  eliminarProducto(productoId: number): void {
    this.items.set(this.items().filter((i) => i.producto.id !== productoId));
  }
 
  vaciarCarrito(): void {
    this.items.set([]);
  }
}
