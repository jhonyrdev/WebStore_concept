import { Injectable } from '@angular/core';

interface TokenPayload{
  sub: string;
  rol: string;
  exp: number;
  iat?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly KEY = 'auth_token';

  set(token: string): void {
    localStorage.setItem(this.KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.KEY);
  }

  clear(): void {
    localStorage.removeItem(this.KEY);
  }

  private getPayload(): any | null {
    const token = this.get();
    if (!token) return null;
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  IsValid(): boolean {
    const payload = this.getPayload();
    if (!payload || !payload.exp) return false;
    const exp = Number(payload.exp);
    if (Number.isNaN(exp)) return false;
    return exp * 1000 > Date.now();
  }

  getUsername(): string | null {
    return this.getPayload()?.sub || null;
  }

  getRole(): string | null {
    return this.getPayload()?.rol || null;
  }
}
