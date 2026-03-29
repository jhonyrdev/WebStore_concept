import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-categoria',
  imports: [],
  standalone: true,
  templateUrl: './sidebar-categoria.component.html',
  styleUrl: './sidebar-categoria.component.css',
})
export class SidebarCategoriaComponent {
  isMenuOpen = input.required<boolean>();
  toggleMenu = output<void>();

  readonly categorias = [
    { label: 'categoria_1', href: '/' },
    { label: 'categoria_2', href: '/ofertas' },
    { label: 'categoria_3', href: '/categorias' },
    { label: 'categoria_4', href: '/pedidos' },
    { label: 'categoria_5', href: '/perfil' },
  ];

  onToggle(): void {
    this.toggleMenu.emit();
  }
}
