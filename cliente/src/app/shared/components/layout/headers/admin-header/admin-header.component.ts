import { AdminAuthService } from '@/app/features/auth/service/admin/admin-auth.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly authService = inject(AdminAuthService);

  compact = input<boolean>(false);
  mobileOpen = input<boolean>(false);
  @Output() toggleRequested = new EventEmitter<void>();
  @Output() closeRequested = new EventEmitter<void>();

  isProfileMenuOpen = false;

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
