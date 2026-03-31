import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarCategoriaComponent } from '../../sidebars/sidebar-categoria/sidebar-categoria.component';
import { SidebarMobileComponent } from '../../sidebars/sidebar-mobile/sidebar-mobile.component';
import { SearchModalComponent } from '../../modales/search-modal/search-modal.component';

@Component({
  selector: 'app-navheader',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarCategoriaComponent,
    SidebarMobileComponent,
    SearchModalComponent,
  ],
  templateUrl: './navheader.component.html',
  styleUrl: './navheader.component.css',
})
export class NavheaderComponent {
  isMenuOpen = signal(false);
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  cartCount = signal(3);
  searchQuery = signal('');

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }
  toggleSearch(): void {
    this.isSearchOpen.update((v) => !v);
  }

  readonly isCartOpen = signal(false);

  toggleCart() {
    this.isCartOpen.update((v) => !v);
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const q = this.searchQuery().trim();
    if (!q) return;
    console.log('Buscando:', q);
  }
}
