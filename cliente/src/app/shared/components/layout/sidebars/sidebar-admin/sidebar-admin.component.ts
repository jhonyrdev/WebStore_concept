import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '@/app/features/auth/service/admin/admin-auth.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css',
})
export class SidebarAdminComponent {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly authService = inject(AdminAuthService);

  @Input() compact = false;
  @Input() mobileOpen = false;
  @Output() toggleRequested = new EventEmitter<void>();
  @Output() closeRequested = new EventEmitter<void>();

  isProfileMenuOpen = false;

  menuItems = [
    { label: 'Inicio', path: '/tambito++/home', icon: 'home' },
    { label: 'Productos', path: '/tambito++/products', icon: 'box' },
    { label: 'Ventas', path: '/tambito++/sales', icon: 'chart-line' },
    { label: 'Reclamos', path: '/tambito++/complaints', icon: 'comments' },
    { label: 'Clientes', path: '/tambito++/users', icon: 'users' },
    { label: 'configuracion', path: '/tambito++/store-settings', icon: 'store' },
  ];

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  goToProfile(): void {
    this.isProfileMenuOpen = false;
    this.closeRequested.emit();
    void this.router.navigate(['/tambito++/perfil-admin']);
  }

  logout(): void {
    this.isProfileMenuOpen = false;
    this.authService.logout();
    this.closeRequested.emit();
    void this.router.navigate(['/tambito++/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (target && !this.hostElement.nativeElement.contains(target)) {
      this.isProfileMenuOpen = false;
    }
  }
}
