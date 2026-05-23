import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthLockService {
  private readonly LOCK_STORAGE_KEY = 'auth.lock';
  private readonly MAX_ATTEMPTS = 3;
  private readonly LOCK_DURATION_MS = 2 * 60 * 1000;

  private failedAttempts = signal(0);
  private lockUntil = signal<number | null>(null);
  private now = signal(Date.now());

  isLocked = computed(() => {
    const until = this.lockUntil();
    return until !== null && this.now() < until;
  });

  remainingSeconds = computed(() => {
    const until = this.lockUntil();
    if (!until) return 0;
    return Math.max(0, Math.ceil((until - this.now()) / 1000));
  });

  lockMessage = computed(() => {
    if (!this.isLocked()) return '';
    return `Demasiados intentos fallidos. Intentalo mas tarde.`;
  });

  constructor() {
    this.restoreFromStorage();
    // Actualizar 'now' cada segundo para el contador reactivo
    setInterval(() => {
      this.now.set(Date.now());
      if (!this.isLocked() && this.lockUntil() !== null) {
        this.clearLock();
      }
    }, 1000);
  }

  private restoreFromStorage(): void {
    const raw = localStorage.getItem(this.LOCK_STORAGE_KEY);
    if (!raw) return;

    try {
      const { lockUntil } = JSON.parse(raw);
      if (Date.now() < lockUntil) {
        this.lockUntil.set(lockUntil);
      } else {
        localStorage.removeItem(this.LOCK_STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(this.LOCK_STORAGE_KEY);
    }
  }

  trackFailure(): void {
    this.failedAttempts.update((v) => v + 1);
    if (this.failedAttempts() >= this.MAX_ATTEMPTS) {
      this.startLock();
    }
  }

  private startLock(): void {
    const until = Date.now() + this.LOCK_DURATION_MS;
    this.lockUntil.set(until);
    this.failedAttempts.set(0);
    localStorage.setItem(this.LOCK_STORAGE_KEY, JSON.stringify({ lockUntil: until }));
  }

  reset(): void {
    this.failedAttempts.set(0);
    this.clearLock();
  }

  private clearLock(): void {
    this.lockUntil.set(null);
    localStorage.removeItem(this.LOCK_STORAGE_KEY);
  }

  getRemainingAttempts(): number {
    return this.MAX_ATTEMPTS - this.failedAttempts();
  }
}
