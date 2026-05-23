import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarCategoriaComponent } from '../../../../../features/categories/components/sidebar-categoria/sidebar-categoria.component';
import { SidebarMobileComponent } from '../../sidebars/sidebar-mobile/sidebar-mobile.component';
import { SearchModalComponent } from '../../../ui/modal/search-modal/search-modal.component';
import { AuthFormComponent } from '@features/auth/components/auth-form/auth-form.component';
import { ClientAuthService } from '@/app/features/auth/service/client/login/client-auth.service';
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
  private authService = inject(ClientAuthService);
  private router = inject(Router);

  isMenuOpen = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  isAccountOpen = signal(false);
  loginModalOpen = this.authService.loginModalOpen;
  isLoggedIn = this.authService.isAuthenticated;

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  openLoginFromMobile(): void {
    this.isMobileMenuOpen.set(false);
    this.isAccountOpen.set(false);
    this.authService.openLoginModal();
  }

  toggleSearch(): void {
    this.isSearchOpen.update((v) => !v);
    if (!this.isSearchOpen()) {
      this.searchService.limpiarMobile();
    }
  }

  handleAccountClick() {
    if (this.isLoggedIn()) {
      this.authService.closeLoginModal();
      this.isAccountOpen.update((v) => !v);
    } else {
      this.isAccountOpen.set(false);
      this.authService.openLoginModal();
    }
  }

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.authService.logout();
    this.isAccountOpen.set(false);
    this.isMobileMenuOpen.set(false);

    this.router.navigate(['/']);
  }

  closeLoginModal(): void {
    this.authService.closeLoginModal();
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
