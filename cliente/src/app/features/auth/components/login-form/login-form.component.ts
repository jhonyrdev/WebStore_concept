import { CommonModule } from '@angular/common';
import { Component, OnDestroy, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, take, timeout } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnDestroy {
  switchToRegister = output<void>();

  private readonly maxLoginAttempts = 3;
  private readonly lockDurationMs = 2 * 60 * 1000;
  private readonly requestTimeoutMs = 10000;
  private readonly loadingWatchdogMs = 12000;
  private failedAttempts = 0;
  private lockUntil: number | null = null;
  private lockIntervalId: ReturnType<typeof setInterval> | null = null;
  private loginSubscription: Subscription | null = null;
  private loadingWatchdogId: ReturnType<typeof setTimeout> | null = null;

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  lockRemainingSeconds = 0;

  get isLocked(): boolean {
    return this.lockUntil !== null && Date.now() < this.lockUntil;
  }

  get isFormBlocked(): boolean {
    return this.isLoading || this.isLocked;
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn(): void {
    if (this.isLoading) {
      return;
    }

    if (this.isLocked) {
      this.updateLockCountdown();
      this.errorMessage = `Has superado los intentos permitidos. Intenta de nuevo en ${this.lockRemainingSeconds}s.`;
      return;
    }

    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.startLoadingWatchdog();
    this.cancelLoginSubscription();

    this.loginSubscription = this.authService
      .login(this.email, this.password)
      .pipe(
        take(1),
        timeout(this.requestTimeoutMs),
        finalize(() => {
          this.stopLoadingState();
          this.loginSubscription = null;
        })
      )
      .subscribe({
        next: (profile: Profile | null) => {
          if (profile) {
            this.failedAttempts = 0;
            this.clearLock();
            this.resetForm();
            this.router.navigate(['/perfil']);
          } else {
            this.handleFailedAttempt();
            this.password = '';
          }
        },
        error: () => {
          this.errorMessage = 'No se pudo iniciar sesión. Verifica tus credenciales e intenta nuevamente.';
          this.password = '';
        },
      });
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.showPassword = false;
  }

  private handleFailedAttempt(): void {
    this.failedAttempts += 1;
    const remainingAttempts = this.maxLoginAttempts - this.failedAttempts;

    if (remainingAttempts <= 0) {
      this.startLock();
      return;
    }

    this.errorMessage = `Credenciales inválidas. Te quedan ${remainingAttempts} intento(s).`;
  }

  private startLock(): void {
    this.lockUntil = Date.now() + this.lockDurationMs;
    this.failedAttempts = 0;
    this.updateLockCountdown();
    this.errorMessage = `Has superado los intentos permitidos. Intenta de nuevo en ${this.lockRemainingSeconds}s.`;

    if (this.lockIntervalId) {
      clearInterval(this.lockIntervalId);
    }

    this.lockIntervalId = setInterval(() => {
      if (!this.isLocked) {
        this.clearLock();
        this.errorMessage = '';
        return;
      }

      this.updateLockCountdown();
      this.errorMessage = `Has superado los intentos permitidos. Intenta de nuevo en ${this.lockRemainingSeconds}s.`;
    }, 1000);
  }

  private clearLock(): void {
    this.lockUntil = null;
    this.lockRemainingSeconds = 0;

    if (this.lockIntervalId) {
      clearInterval(this.lockIntervalId);
      this.lockIntervalId = null;
    }
  }

  private updateLockCountdown(): void {
    if (!this.lockUntil) {
      this.lockRemainingSeconds = 0;
      return;
    }

    const remainingMs = this.lockUntil - Date.now();
    this.lockRemainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  }

  private startLoadingWatchdog(): void {
    this.stopLoadingWatchdog();

    this.loadingWatchdogId = setTimeout(() => {
      if (!this.isLoading) {
        return;
      }

      this.stopLoadingState();
      this.cancelLoginSubscription();
      this.errorMessage = 'La autenticación tardó demasiado. Intenta nuevamente.';
      this.password = '';
    }, this.loadingWatchdogMs);
  }

  private stopLoadingState(): void {
    this.isLoading = false;
    this.stopLoadingWatchdog();
  }

  private stopLoadingWatchdog(): void {
    if (!this.loadingWatchdogId) {
      return;
    }

    clearTimeout(this.loadingWatchdogId);
    this.loadingWatchdogId = null;
  }

  private cancelLoginSubscription(): void {
    if (!this.loginSubscription) {
      return;
    }

    this.loginSubscription.unsubscribe();
    this.loginSubscription = null;
  }

  ngOnDestroy(): void {
    this.stopLoadingState();
    this.cancelLoginSubscription();

    if (this.lockIntervalId) {
      clearInterval(this.lockIntervalId);
    }
  }

  onGoogle(): void {
    // OAuth Google
  }

  onOutlook(): void {
    // OAuth Outlook
  }

  goToRegister(): void {
    this.switchToRegister.emit();
  }
}
