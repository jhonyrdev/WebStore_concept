import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, output, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, combineLatest, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { AuthResponse, ClientAuthService } from '../../service/client/client-auth.service';

const LOCK_STORAGE_KEY = 'auth.lock';

interface LockState {
  lockUntil: number;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  switchToRegister = output<void>();
  private authService = inject(ClientAuthService);

  private readonly maxLoginAttempts = 3;
  private readonly lockDurationMs = 2 * 60 * 1000;
  private lockUntil: number | null = null;
  private lockIntervalId: ReturnType<typeof setInterval> | null = null;
  private loginSubscription: Subscription | null = null;
  private failedAttempts = 0;
  private errorTimeoutId: ReturnType<typeof setTimeout> | null = null;

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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.restoreLockFromStorage();
  }

  private showError(message: string, durationMs = 3000): void {
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = null;
    }

    this.errorMessage = message;
    this.cdr.detectChanges();

    if (!message || durationMs <= 0) return;

    this.errorTimeoutId = setTimeout(() => {
      this.errorMessage = '';
      this.errorTimeoutId = null;
      this.cdr.detectChanges();
    }, durationMs);
  }

  private restoreLockFromStorage(): void {
    const raw = localStorage.getItem(LOCK_STORAGE_KEY);
    if (!raw) return;

    try {
      const { lockUntil }: LockState = JSON.parse(raw);
      if (Date.now() < lockUntil) {
        this.lockUntil = lockUntil;
        this.updateLockCountdown();
        this.errorMessage = `Demasiados intentos fallidos. Intenta de nuevo en ${this.lockRemainingSeconds}s.`;
        this.startLockInterval(); 
      } else {
        localStorage.removeItem(LOCK_STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(LOCK_STORAGE_KEY);
    }
  }

  onSignIn(): void {
    if (this.isLoading) return;

    if (this.isLocked) {
      this.updateLockCountdown();
      this.errorMessage = `Demasiados intentos fallidos. Intentalo mas tarde.`;
      return;
    }

    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.showError('Por favor completa todos los campos.', 3000);
      return;
    }

    this.isLoading = true;
    this.loginSubscription?.unsubscribe();

    this.loginSubscription = combineLatest([
      this.authService.login(this.email, this.password),
      timer(1000),
    ]).pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.loginSubscription = null;
      })
    ).subscribe({
      next: ([profile]: [AuthResponse | null, number]) => {
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
        this.showError('No se pudo iniciar sesión. Verifica tus credenciales.', 4000);
        this.password = '';
      },
    });
  }

  private handleFailedAttempt(): void {
    this.failedAttempts += 1;
    const remainingAttempts = this.maxLoginAttempts - this.failedAttempts;

    if (remainingAttempts <= 0) {
      this.startLock();
      return;
    }

    this.showError(`Credenciales inválidas. Te quedan ${remainingAttempts} intento(s).`, 3500);
  }

  private startLock(): void {
    this.lockUntil = Date.now() + this.lockDurationMs;
    this.failedAttempts = 0;

    // Persistir en localStorage
    localStorage.setItem(LOCK_STORAGE_KEY, JSON.stringify({ lockUntil: this.lockUntil }));

    this.updateLockCountdown();
    this.showError(`Demasiados intentos fallidos. Intentalo mas tarde`, 5000);
    this.startLockInterval();
  }

  private startLockInterval(): void {
    if (this.lockIntervalId) clearInterval(this.lockIntervalId);

    this.lockIntervalId = setInterval(() => {
      if (!this.isLocked) {
        this.clearLock();
        this.errorMessage = '';
        this.cdr.detectChanges();
        return;
      }
      this.updateLockCountdown();
      this.errorMessage = `Demasiados intentos fallidos. Intentalo mas tarde.`;
      this.cdr.detectChanges();
    }, 1000);
  }

  private clearLock(): void {
    this.lockUntil = null;
    this.lockRemainingSeconds = 0;
    localStorage.removeItem(LOCK_STORAGE_KEY); 
    if (this.lockIntervalId) {
      clearInterval(this.lockIntervalId);
      this.lockIntervalId = null;
    }
  }

  private updateLockCountdown(): void {
    if (!this.lockUntil) { this.lockRemainingSeconds = 0; return; }
    const remainingMs = this.lockUntil - Date.now();
    this.lockRemainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.showPassword = false;
  }

  ngOnDestroy(): void {
    this.isLoading = false;
    this.loginSubscription?.unsubscribe();
    if (this.lockIntervalId) clearInterval(this.lockIntervalId);
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = null;
    }
  }

  onGoogle(): void {}
  onOutlook(): void {}
  goToRegister(): void { this.switchToRegister.emit(); }
}
