import { Component, HostListener, Input, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css',
})
export class AdminFooterComponent {

  isVisible = signal(true);
  private scrollTimeout: any;

  menuItems = [
    { label: 'Inicio', path: '/tambito++/home', icon: 'home' },
    { label: 'Productos', path: '/tambito++/products', icon: 'box' },
    { label: 'Ventas', path: '/tambito++/sales', icon: 'chart-line' },
    { label: 'Reclamos', path: '/tambito++/complaints', icon: 'comments' },
    { label: 'Clientes', path: '/tambito++/users', icon: 'users' },
    { label: 'configuracion', path: '/tambito++/store-settings', icon: 'store' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isVisible.set(false);

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isVisible.set(true);
    }, 300);
  }
}
