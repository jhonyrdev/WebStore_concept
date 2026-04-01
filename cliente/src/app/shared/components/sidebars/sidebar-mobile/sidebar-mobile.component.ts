import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-mobile.component.html'
})
export class SidebarMobileComponent {
  isOpen     = input.required<boolean>();
  toggleMenu = output<void>();

  readonly links = [
    { label: 'Inicio',      href: '/' },
    { label: 'Ofertas',     href: '/ofertas' },
    { label: 'Categorías',  href: '/categorias' },
    { label: 'Mis pedidos', href: '/pedidos' },
    { label: 'Mi perfil',   href: '/perfil' },
  ];

  onToggle(): void { this.toggleMenu.emit(); }
}
