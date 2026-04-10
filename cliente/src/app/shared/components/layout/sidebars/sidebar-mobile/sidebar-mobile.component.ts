import { Component, input, output } from '@angular/core';
import { SidebarShellComponent } from '../sidebar-shell/sidebar-shell.component';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [SidebarShellComponent],
  templateUrl: './sidebar-mobile.component.html',
})
export class SidebarMobileComponent {
  isOpen = input.required<boolean>();
  isLoggedIn = input(false);
  toggleMenu = output<void>();
  joinClick = output<void>();

  get links() {
    return [
      { label: 'Inicio', href: '/' },
      { label: 'Ofertas', href: '/ofertas' },
      { label: 'Categorías', href: '/catalogo' },
      this.isLoggedIn()
        ? { label: 'Mi perfil', href: '/perfil' }
        : { label: 'Unirme', href: null, action: 'join' },
    ];
  }
}
