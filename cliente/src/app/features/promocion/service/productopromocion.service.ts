import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiOptions } from '@/app/core/services/api/api.service';
import { PromocionResponseDto } from '../models/promocion.model';
import { ProductoPromocionRequestDto } from '../models/producto-promocion.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoPromocionService {
  private readonly api = inject(ApiService);

  private readonly apiUrl = 'api/productos-promociones';
  private readonly apiUrl2 = 'api/public/productos-promociones';

  asignar(data: ProductoPromocionRequestDto): Observable<PromocionResponseDto[]> {
    return this.api.post<PromocionResponseDto[], ProductoPromocionRequestDto>(
      `${this.apiUrl}/asignar`,
      data,
    );
  }

  quitar(data: ProductoPromocionRequestDto): Observable<PromocionResponseDto[]> {
    const options: ApiOptions = { body: data };
    return this.api.delete<PromocionResponseDto[]>(`${this.apiUrl}/quitar`, options);
  }

  obtenerPromocionesDeProducto(idProd: number): Observable<PromocionResponseDto[]> {
    return this.api.get<PromocionResponseDto[]>(`${this.apiUrl2}/producto/${idProd}`);
  }
}
