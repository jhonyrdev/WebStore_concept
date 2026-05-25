import { Injectable } from '@angular/core';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { Observable, map } from 'rxjs';
import { Unidad, UnidadListDto } from '../../models/unidad.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private readonly API_PUBLIC = 'api/public/unidad';
  private readonly API_ADMIN = 'api/unidad';

  constructor(private api: ApiService) {}

  listar(): Observable<Unidad[]> {
    return this.api
      .get<ApiResponse<UnidadListDto[]>>(this.API_PUBLIC)
      .pipe(map((response) => (response.data ?? []).map((item) => this.toUnidad(item))));
  }

  crear(data: Omit<Unidad, 'id'>): Observable<Unidad> {
    return this.api
      .post<ApiResponse<UnidadListDto>, Omit<Unidad, 'id'>>(this.API_ADMIN, data)
      .pipe(map((response) => this.toUnidad(response.data)));
  }

  actualizar(idUnidad: number, data: Omit<Unidad, 'id'>): Observable<Unidad> {
    return this.api
      .put<ApiResponse<UnidadListDto>, Omit<Unidad, 'id'>>(`${this.API_ADMIN}/${idUnidad}`, data)
      .pipe(map((response) => this.toUnidad(response.data)));
  }

  eliminar(idUnidad: number): Observable<void> {
    return this.api
      .delete<ApiResponse<void>>(`${this.API_ADMIN}/${idUnidad}`)
      .pipe(map(() => void 0));
  }

  private toUnidad(dto: UnidadListDto): Unidad {
    return {
      id: dto.idUnidad,
      nombre: dto.nombre,
      simbolo: dto.simbolo,
    };
  }
}
