import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class FallbackService {
  constructor(private readonly api: ApiService, private readonly http: HttpClient) {}

  getWithFallback<T>(backendEndpoint: string, localUrl: string): Observable<T> {
    return this.api.get<T>(backendEndpoint).pipe(
      catchError(() => this.http.get<T>(localUrl))
    );
  }
}
