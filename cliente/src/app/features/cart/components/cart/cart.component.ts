import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-Item.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { formatCurrencyAmount, SupportedCurrency } from '../../../../shared/utils/currency.utils';
import { AuthService } from '@/app/features/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  variant = input<'mobile' | 'desktop'>('desktop');
  currency = input<SupportedCurrency>('PEN');

  cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private elRef = inject(ElementRef);

  isOpen = signal(false);

  cartItems = this.cartService.cartItems;
  totalItems = this.cartService.totalItems;
  subtotal = this.cartService.subtotal;
  igv = computed(() => this.subtotal() * 0.18);
  total = computed(() => this.subtotal() + this.igv());

  formatCurrency(amount: number | null | undefined): string {
    return formatCurrencyAmount(amount, { currency: this.currency() });
  }

  toggleCart(): void {
    this.isOpen.update((v) => !v);
  }

  agregar(item: CartItem): void {
    this.cartService.agregarProducto(item.producto);
  }

  restar(item: CartItem): void {
    this.cartService.restarProducto(item.producto.id);
  }

  eliminar(item: CartItem): void {
    this.cartService.eliminarProducto(item.producto.id);
  }

  async checkout(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.isOpen.set(false);
      this.authService.openLoginModal();
      return;
    }

    this.isOpen.set(false);

    const result = await Swal.fire({
      title: '¿Deseas continuar?',
      text: 'Puedes continuar al checkout o volver al catálogo para agregar más productos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Catálogo',
      reverseButtons: true,
      confirmButtonColor: '#a00691',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      this.router.navigate(['/checkout']);
      return;
    }

    if (result.dismiss === Swal.DismissReason.cancel) {
      this.router.navigate(['/catalogo']);
    }
  }

  // cart-dropdown.component.ts
  listHeight = computed(() => {
    const itemH = 80;
    if (this.variant() === 'mobile') {
      // scroll a partir del 3er item
      return this.cartItems().length > 2 ? `${2 * itemH}px` : null;
    }
    // desktop/tablet: scroll a partir del 4to item (muestra 3)
    return this.cartItems().length > 3 ? `${3 * itemH}px` : null;
  });

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  trackById(_: number, item: CartItem): number {
    return item.producto.id;
  }
}
