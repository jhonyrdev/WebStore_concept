import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, catchError, of, combineLatest } from 'rxjs';
import { Credential } from '../../models/credential.model';
import { Profile } from '../../models/profile.model';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly authKey = 'webstore.admin.loggedIn';

  private credentialsUrl = '/data/credenciales.json';
  private profilesUrl = '/data/perfil.json';
  private credentials: Credential[] = [];
  private profiles: Profile[] = [];
  private dataLoaded = false;

  private authenticated = signal<boolean>(this.readAuthState());

  readonly isAuthenticated = this.authenticated.asReadonly();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Profile | null>{
    return this.loadData().pipe(
      map(() => {
        const profile = this.profiles.find((p) => p.email === email);
        if (!profile) return null;

        const credential = this.credentials.find(
          (cred) =>
            cred.id === profile.credencial_id &&
            cred.password === password &&
            cred.activo &&
            cred.rol_id === 1,
        );

        if (credential) {
          this.setSession(true);
          return profile;
        }
        return null;
      }),
      catchError((err) => {
        console.error('Error en login admin:', err);
        return of(null);
      }),
    );
  }

  logout(): void {
    this.authenticated.set(false);
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(this.authKey);
  }

  private setSession(value: boolean): void {
    this.authenticated.set(value);
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(this.authKey, String(value));
  }

  private readAuthState(): boolean {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(this.authKey) === 'true';
  }

  private loadData(): Observable<void> {
    if (this.dataLoaded) return of(void 0);

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
        console.error('Error al cargar datos de admin');
        return of(void 0);
      }),
    );
  }
}
