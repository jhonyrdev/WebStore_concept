import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { PromocionResponseDto, PromocionRequestDto } from '../models/promocion.model';

@Injectable({
  providedIn: 'root',
})
export class PromocionService {
  private readonly api = inject(ApiService);

  private readonly apiUrl = 'api/promociones';
  private readonly apiUrl2 = 'api/public/promociones';

  getAll(): Observable<PromocionResponseDto[]> {
    return this.api
      .get<ApiResponse<PromocionResponseDto[]>>(this.apiUrl2)
      .pipe(map((res) => res.data));
  }

  getById(id: number): Observable<PromocionResponseDto> {
    return this.api
      .get<ApiResponse<PromocionResponseDto>>(`${this.apiUrl2}/${id}`)
      .pipe(map((res) => res.data));
  }

  create(data: PromocionRequestDto): Observable<PromocionResponseDto> {
    return this.api
      .post<ApiResponse<PromocionResponseDto>, PromocionRequestDto>(this.apiUrl, data)
      .pipe(map((res) => res.data));
  }

  update(id: number, data: PromocionRequestDto): Observable<PromocionResponseDto> {
    return this.api
      .put<ApiResponse<PromocionResponseDto>, PromocionRequestDto>(`${this.apiUrl}/${id}`, data)
      .pipe(map((res) => res.data));
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`);
  }
}
