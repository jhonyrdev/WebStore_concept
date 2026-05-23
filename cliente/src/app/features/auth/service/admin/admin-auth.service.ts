import { Injectable, signal, inject } from '@angular/core';
import { Observable, map, catchError, of, tap } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { TokenService } from '@/app/core/services/jwt/token.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { AuthResponse } from '../../models/auth.types';


@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  
  private api = inject(ApiService);
  private tokenService = inject(TokenService);

  private authenticated = signal<boolean>(
    this.tokenService.IsValid() && this.tokenService.getRole() === 'ADMIN'
  );

  readonly isAuthenticated = this.authenticated.asReadonly();

  login(username: string, password: string): Observable<AuthResponse | null> {
    return this.api.post<ApiResponse<AuthResponse>, any>('auth/login/admin', { 
      username, 
      password 
    }).pipe(
      map(response => response.success ? response.data : null),
      tap(data => {
        if (data && data.token && data.rol === 'ADMIN') {
          this.tokenService.set(data.token);
          this.authenticated.set(true);
        }
      }),
      catchError((err) => {
        console.error('Error en login admin:', err);
        return of(null);
      }),
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.authenticated.set(false);
  }
}