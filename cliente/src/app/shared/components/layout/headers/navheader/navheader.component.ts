import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarCategoriaComponent } from '../../../../../features/categories/components/sidebar-categoria/sidebar-categoria.component';
import { SidebarMobileComponent } from '../../sidebars/sidebar-mobile/sidebar-mobile.component';
import { SearchModalComponent } from '../../../ui/modal/search-modal/search-modal.component';
import { AuthFormComponent } from '@features/auth/components/auth-form/auth-form.component';
import { CartComponent } from '@features/cart/components/cart/cart.component';
import { CartService } from '@features/cart/services/cart.service';
import { SearchService } from '@features/search/services/search.service';
import { SearchResultadoComponent } from '@features/search/components/search-resultado/search-resultado.component';

@Component({
  selector: 'app-navheader',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarCategoriaComponent,
    SidebarMobileComponent,
    SearchModalComponent,
    AuthFormComponent,
    CartComponent,
    SearchResultadoComponent,
  ],
  templateUrl: './navheader.component.html',
  styleUrl: './navheader.component.css',
})
export class NavheaderComponent {
  searchService = inject(SearchService);

  isMenuOpen = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  isAccountOpen = signal(false);
  loginModalOpen = signal(false);
  isLoggedIn = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  toggleSearch(): void {
    this.isSearchOpen.update((v) => !v);
    if (!this.isSearchOpen()) {
      this.searchService.limpiarMobile();
    }
  }

  handleAccountClick() {
    if (this.isLoggedIn()) {
      this.loginModalOpen.set(false);
      this.isAccountOpen.update((v) => !v);
    } else {
      this.isAccountOpen.set(false);
      this.loginModalOpen.set(true);
    }
  }

  readonly isCartOpen = signal(false);

  private cartService = inject(CartService);
  cartCount = this.cartService.totalItems;

  toggleAccount() {
    this.isAccountOpen.set(!this.isAccountOpen());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#nav-account')) {
      this.isAccountOpen.set(false);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isAccountOpen.set(false);
  }
}
