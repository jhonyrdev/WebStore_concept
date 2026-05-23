import { CommonModule } from '@angular/common';
import { Component, OnDestroy, output, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '@/app/shared/components/ui/error-message/error-message.component';
import { ToastService } from '@/app/shared/services/toast.service';
import { AuthFacade } from '../../service/client/login/auth.facade';
import { AuthLockService } from '@/app/features/auth/service/admin/auth-lock.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnDestroy {
  switchToRegister = output<void>();

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  private authFacade = inject(AuthFacade);
  private lockService = inject(AuthLockService);

  isLoading = this.authFacade.isLoading;
  isLocked = this.lockService.isLocked;

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  errorMessage = '';

  private loginSubscription: Subscription | null = null;
  private errorTimeoutId: ReturnType<typeof setTimeout> | null = null;

  onSignIn(): void {
    if (this.isLoading()) return;

    if (this.isLocked()) {
      this.showError(this.lockService.lockMessage(), 5000);
      return;
    }

    if (!this.email.trim() || !this.password.trim()) {
      this.showError('Por favor completa todos los campos.', 3000);
      return;
    }

    this.errorMessage = '';
    this.loginSubscription?.unsubscribe();

    this.loginSubscription = this.authFacade.login(this.email, this.password).subscribe({
      next: (state) => {
        if (state.success) {
          this.resetForm();
          this.router.navigate(['/perfil']);
        } else {
          this.showError(state.message || 'Credenciales inválidas.', 3500);
          this.password = '';
        }
      },
      error: () => {
        this.showError('No se pudo iniciar sesión. Verifica tus credenciales.', 4000);
        this.password = '';
      },
    });
  }

  private showError(message: string, durationMs = 3000): void {
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }

    this.errorMessage = message;
    this.cdr.detectChanges();

    if (!message || durationMs <= 0) return;

    this.errorTimeoutId = setTimeout(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    }, durationMs);
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.showPassword = false;
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }
  }

  onGoogle(): void {
    this.toastService.info('Próximamente con Google');
  }

  onOutlook(): void {
    this.toastService.info('Próximamente con Outlook');
  }

  goToRegister(): void {
    this.switchToRegister.emit();
  }
}
