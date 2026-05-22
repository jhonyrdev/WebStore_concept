import { computed, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TokenService } from '@/app/core/services/jwt/token.service';
import { ApiService } from '@/app/core/services/api/api.service';

export interface AuthResponse {
  token: string;
  username: string;
  rol: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class ClientAuthService {
  private readonly API = 'auth';

  private readonly _authenticated = signal<boolean>(false);
  private readonly _loginModalOpen = signal<boolean>(false);

  readonly isAuthenticated: any;
  readonly loginModalOpen = this._loginModalOpen.asReadonly();

  readonly username: any;
  readonly role: any;

  constructor(
    private readonly api: ApiService,
    private readonly tokenService: TokenService,
  ) {
    this._authenticated.set(this.tokenService.IsValid());
    this.isAuthenticated = this._authenticated.asReadonly();
    this.username = computed(() =>
      this._authenticated() ? this.tokenService.getUsername() : null,
    );
    this.role = computed(() => (this._authenticated() ? this.tokenService.getRole() : null));
  }

  login(email: string, password: string): Observable<AuthResponse | null> {
    return this.api
      .post<
        ApiResponse<AuthResponse>,
        { username: string; password: string }
      >(`${this.API}/login/cliente`, { username: email, password })
      .pipe(
        map((res: ApiResponse<AuthResponse>) => res.data),
        tap((data: AuthResponse) => {
          this.tokenService.set(data.token);
          this._authenticated.set(true);
          this.closeLoginModal();
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return of(null);
        }),
      );
  }

  logout(): void {
    this.tokenService.clear();
    this._authenticated.set(false);
    this.closeLoginModal();
  }

  openLoginModal(): void {
    this._loginModalOpen.set(true);
  }
  closeLoginModal(): void {
    this._loginModalOpen.set(false);
  }
}
