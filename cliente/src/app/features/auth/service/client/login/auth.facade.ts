import { Injectable, inject, signal } from '@angular/core';
import { combineLatest, of, timer, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthLockService } from '@/app/features/auth/service/admin/auth-lock.service';
import { ClientAuthService } from './client-auth.service';
import { AuthResponse } from '../../../models/auth.types';

export interface LoginState {
  success: boolean;
  profile?: AuthResponse | null;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private authService = inject(ClientAuthService);
  private lockService = inject(AuthLockService);

  private loadingSignal = signal(false);
  isLoading = this.loadingSignal.asReadonly();

  login(email: string, password: string): Observable<LoginState> {
    if (this.lockService.isLocked()) {
      return of({ success: false, message: this.lockService.lockMessage() });
    }

    this.loadingSignal.set(true);

    return combineLatest([this.authService.login(email, password), timer(1000)]).pipe(
      map(([profile]) => {
        if (profile) {
          this.lockService.reset();
          return { success: true, profile };
        } else {
          this.lockService.trackFailure();

          if (this.lockService.isLocked()) {
            return { success: false, message: this.lockService.lockMessage() };
          }

          const remaining = this.lockService.getRemainingAttempts();
          return {
            success: false,
            message: `Credenciales inválidas. Te quedan ${remaining} intento(s).`,
          };
        }
      }),
      catchError(() => {
        return of({
          success: false,
          message: 'No se pudo iniciar sesión. Verifica tus credenciales.',
        });
      }),
      finalize(() => this.loadingSignal.set(false)),
    );
  }
}
