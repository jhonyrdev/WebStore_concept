import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from '@/app/features/cart/services/cart.service';
import { MetodoPagoFacade } from '@/app/features/sales/services/metodoPago/metodo-pago.facade';
import { PurchaseHistoryRecord, PurchaseHistoryService } from '@/app/features/sales/services/purchase-history/purchase-history.service';
import { AlertService } from '@/app/shared/services/alert.service';
import { formatCurrencyAmount, SupportedCurrency } from '@/app/shared/utils/currency.utils';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly metodoPagoFacade = inject(MetodoPagoFacade);
  private readonly purchaseHistoryService = inject(PurchaseHistoryService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);

  currency = signal<SupportedCurrency>('PEN');
  selectedMetodoId = signal<number | null>(null);
  reporteGenerado = signal<PurchaseHistoryRecord | null>(null);
  mensaje = signal('');

  cartItems = this.cartService.cartItems;
  subtotal = this.cartService.subtotal;
  igv = computed(() => this.subtotal() * 0.18);
  total = computed(() => this.subtotal() + this.igv());
  metodos = computed(() => this.metodoPagoFacade.metodos().filter((metodo) => metodo.estado));
  isLoadingMetodos = this.metodoPagoFacade.isLoading;
  hasItems = computed(() => this.cartItems().length > 0);

  constructor() {
    effect(() => {
      const metodos = this.metodos();
      if (!this.selectedMetodoId() && metodos.length > 0) {
        this.selectedMetodoId.set(metodos[0].id);
      }
    });
  }

  ngOnInit(): void {
    this.metodoPagoFacade.loadMetodos();
  }

  formatCurrency(amount: number | null | undefined): string {
    return formatCurrencyAmount(amount, { currency: this.currency() });
  }

  selectMetodo(id: string): void {
    const parsedId = Number(id);
    this.selectedMetodoId.set(Number.isFinite(parsedId) ? parsedId : null);
  }

  async finalizarCompra(): Promise<void> {
    if (!this.hasItems()) {
      this.mensaje.set('Tu carrito está vacío.');
      await this.alertService.warning('Carrito vacío', 'Agrega productos antes de finalizar la compra.');
      return;
    }

    const metodo = this.metodos().find((item) => item.id === this.selectedMetodoId());

    if (!metodo) {
      this.mensaje.set('Selecciona un método de pago.');
      await this.alertService.warning('Método de pago requerido', 'Elige un método de pago para continuar.');
      return;
    }

    try {
      const reporte = await firstValueFrom(
        this.purchaseHistoryService.createReport({
          metodoPagoId: metodo.id,
          tipoComprobante: 'BOLETA',
          items: this.cartItems(),
        }),
      );

      this.reporteGenerado.set(reporte);
      this.cartService.vaciarCarrito();
      this.mensaje.set(`Compra registrada con el reporte ${reporte.id}.`);

      await this.alertService.success(
        'Compra realizada',
        `Se generó el reporte ${reporte.id} y ya quedó disponible en tu historial.`,
      );

      void this.router.navigate(['/perfil']);
    } catch (error: any) {
      const detalle = error?.error?.message || error?.message || 'No se pudo registrar la compra.';
      this.mensaje.set(detalle);
      await this.alertService.error('No se pudo completar el checkout', detalle);
    }
  }

  volverAlCatalogo(): void {
    void this.router.navigate(['/catalogo']);
  }
}