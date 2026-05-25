import { Injectable } from '@angular/core';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { Observable, map } from 'rxjs';
import { MetodoPago, MetodoPagoListDto } from '../../models/metodo-pago.model';

@Injectable({
  providedIn: 'root',
})
export class MetodoPagoService {
  private readonly API_PUBLIC = 'api/public/metodos-pago';
  private readonly API_ADMIN = 'api/metodos-pago';

  constructor(private api: ApiService) {}

  listar(): Observable<MetodoPago[]> {
    return this.api
      .get<ApiResponse<MetodoPagoListDto[]>>(this.API_PUBLIC)
      .pipe(map((response) => (response.data ?? []).map((item) => this.toMetodoPago(item))));
  }

  crear(data: Omit<MetodoPago, 'id'>): Observable<MetodoPago> {
    const payload = {
      nombreMetodo: data.nombre,
      tipo: data.tipo,
    };
    return this.api
      .post<ApiResponse<MetodoPagoListDto>, any>(this.API_ADMIN, payload)
      .pipe(map((response: ApiResponse<MetodoPagoListDto>) => this.toMetodoPago(response.data)));
  }

  actualizar(id: number, data: Omit<MetodoPago, 'id'>): Observable<MetodoPago> {
    const payload = {
      nombreMetodo: data.nombre,
      tipo: data.tipo,
    };
    return this.api
      .put<ApiResponse<MetodoPagoListDto>, any>(`${this.API_ADMIN}/${id}`, payload)
      .pipe(map((response: ApiResponse<MetodoPagoListDto>) => this.toMetodoPago(response.data)));
  }

  cambiarEstado(id: number): Observable<MetodoPago> {
    return this.api
      .patch<ApiResponse<MetodoPagoListDto>, any>(`${this.API_ADMIN}/${id}/estado`, {})
      .pipe(map((response: ApiResponse<MetodoPagoListDto>) => this.toMetodoPago(response.data)));
  }

  eliminar(id: number): Observable<void> {
    return this.api.delete<ApiResponse<void>>(`${this.API_ADMIN}/${id}`).pipe(map(() => void 0));
  }

  private toMetodoPago(dto: MetodoPagoListDto): MetodoPago {
    return {
      id: dto.idMetodo,
      nombre: dto.nombreMetodo,
      tipo: dto.tipo,
      estado: dto.estado,
    };
  }
}
