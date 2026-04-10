import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Credential } from '../models/credential.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStorageKey = 'webstore.auth.loggedIn';
  private credentialsUrl = '/data/credenciales.json';
  private profilesUrl = '/data/perfil.json';
  private credentials: Credential[] = [];
  private profiles: Profile[] = [];
  private dataLoaded = false;
  private authenticated = signal<boolean>(this.readAuthState());
  private loginModalOpenState = signal(false);

  readonly isAuthenticated = this.authenticated.asReadonly();
  readonly loginModalOpen = this.loginModalOpenState.asReadonly();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Profile | null> {
    return this.loadData().pipe(
      map(() => {
        const profile = this.profiles.find((p) => p.email === email);

        if (!profile) {
          return null;
        }

        const credential = this.credentials.find(
          (cred) => cred.id === profile.credencial_id && cred.password === password && cred.activo,
        );

        if (credential && credential.rol_id === 2) {
          this.setAuthenticated(true);
          return profile;
        }

        return null;
      }),
      catchError(() => of(null)),
    );
  }

  logout(): void {
    this.authenticated.set(false);
    this.closeLoginModal();

    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(this.authStorageKey);
  }

  openLoginModal(): void {
    this.loginModalOpenState.set(true);
  }

  closeLoginModal(): void {
    this.loginModalOpenState.set(false);
  }

  private setAuthenticated(value: boolean): void {
    this.authenticated.set(value);

    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(this.authStorageKey, String(value));
  }

  private readAuthState(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(this.authStorageKey) === 'true';
  }

  private loadData(): Observable<void> {
    if (this.dataLoaded) {
      return of(void 0);
    }

    return combineLatest([
      this.http.get<Credential[]>(this.credentialsUrl),
      this.http.get<Profile[]>(this.profilesUrl),
    ]).pipe(
      map(([credentials, profiles]) => {
        this.credentials = credentials;
        this.profiles = profiles;
        this.dataLoaded = true;
      }),
      catchError(() => {
        console.error('Error al cargar los datos de autenticación');
        return of(void 0);
      }),
    );
  }
}
