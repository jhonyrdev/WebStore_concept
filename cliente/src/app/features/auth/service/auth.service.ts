import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Credential } from '../models/credential.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credentialsUrl = '/data/credenciales.json';
  private profilesUrl = '/data/perfil.json';
  private credentials: Credential[] = [];
  private profiles: Profile[] = [];
  private dataLoaded = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Profile | null> {
    return this.loadData().pipe(
      map(() => {
        const profile = this.profiles.find((p) => p.email === email);

        if (!profile) {
          return null;
        }

        const credential = this.credentials.find(
          (cred) => cred.id === profile.credencial_id && cred.password === password && cred.activo
        );

        if (credential && credential.rol_id === 2) {
          return profile;
        }
        return null;
      }),
      catchError(() => of(null))
    );
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
      })
    );
  }
}
