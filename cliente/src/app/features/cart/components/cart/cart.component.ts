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

import Swal from 'sweetalert2';
import { ClientAuthService } from '@/app/features/auth/service/client/login/client-auth.service';
import { AlertService } from '../../../../shared/services/alert.service';

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
  private authService = inject(ClientAuthService);
  private router = inject(Router);
  private elRef = inject(ElementRef);
  private alertService = inject(AlertService);

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

    const result = await this.alertService.confirm({
      title: '¿Deseas continuar?',
      text: 'Puedes continuar al checkout o volver al catálogo para agregar más productos.',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Catálogo',
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
      return this.cartItems().length > 2 ? `${2 * itemH}px` : null;
    }
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
