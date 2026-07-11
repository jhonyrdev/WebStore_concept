import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromocionResponseDto, PromocionRequestDto } from '../models/promocion.model';



interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private apiUrl = 'http://localhost:8081/api/promociones';
  private apiUrl2 = 'http://localhost:8081/api/public/promociones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PromocionResponseDto[]> {
    return this.http
      .get<ApiResponse<PromocionResponseDto[]>>(this.apiUrl2)
      .pipe(map(res => res.data));
  }

  getById(id: number): Observable<PromocionResponseDto> {
    return this.http
      .get<ApiResponse<PromocionResponseDto>>(`${this.apiUrl2}/${id}`)
      .pipe(map(res => res.data));
  }

  create(data: PromocionRequestDto): Observable<PromocionResponseDto> {
    return this.http
      .post<ApiResponse<PromocionResponseDto>>(this.apiUrl, data)
      .pipe(map(res => res.data));
  }

  update(id: number, data: PromocionRequestDto): Observable<PromocionResponseDto> {
    return this.http.put<PromocionResponseDto>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}