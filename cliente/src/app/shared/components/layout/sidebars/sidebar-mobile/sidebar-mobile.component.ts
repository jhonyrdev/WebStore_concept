import { Component, input, output } from '@angular/core';
import { SidebarShellComponent } from '../sidebar-shell/sidebar-shell.component';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [SidebarShellComponent],
  templateUrl: './sidebar-mobile.component.html'
})
export class SidebarMobileComponent {
  isOpen     = input.required<boolean>()
  toggleMenu = output<void>()

  readonly links = [
    { label: 'Inicio',      href: '/' },
    { label: 'Ofertas',     href: '/ofertas' },
    { label: 'Categorías',  href: '/categorias' },
    { label: 'Mi perfil',   href: '/perfil' },
  ]
}
