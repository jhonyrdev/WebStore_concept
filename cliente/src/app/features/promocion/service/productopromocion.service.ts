import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromocionResponseDto } from '../models/promocion.model';
import { ProductoPromocionRequestDto } from '../models/producto-promocion.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoPromocionService {
  private apiUrl = 'http://localhost:8081/api/productos-promociones'; 
  private apiUrl2 = 'http://localhost:8081/api/public/productos-promociones'; 

  constructor(private http: HttpClient) {}

  asignar(data: ProductoPromocionRequestDto): Observable<PromocionResponseDto[]> {
    return this.http.post<PromocionResponseDto[]>(`${this.apiUrl}/asignar`, data);
  }

  quitar(data: ProductoPromocionRequestDto): Observable<PromocionResponseDto[]> {
    return this.http.delete<PromocionResponseDto[]>(`${this.apiUrl}/quitar`, { body: data });
  }

  obtenerPromocionesDeProducto(idProd: number): Observable<PromocionResponseDto[]> {
    return this.http.get<PromocionResponseDto[]>(`${this.apiUrl2}/producto/${idProd}`);
  }
}