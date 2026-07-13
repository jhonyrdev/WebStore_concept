import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

export interface ApiOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: ApiOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options);
  }

  post<T, B>(endpoint: string, body: B, options?: ApiOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options);
  }

  put<T, B>(endpoint: string, body: B, options?: ApiOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, options);
  }

  patch<T, B>(endpoint: string, body: B, options?: ApiOptions): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, options);
  }

  delete<T>(endpoint: string, options?: ApiOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options);
  }
}
