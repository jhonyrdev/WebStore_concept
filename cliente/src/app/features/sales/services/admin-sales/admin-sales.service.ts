import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';

export interface AdminSaleItem {
  productId: number | null;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface AdminSaleRecord {
  idVenta: number;
  fecha: string;
  hora: string;
  clienteNombre: string;
  clienteCorreo: string | null;
  metodoPago: string | null;
  tipoComprobante: string | null;
  subtotal: number;
  igv: number;
  total: number;
  estado: string;
  items: AdminSaleItem[];
}

@Injectable({ providedIn: 'root' })
export class AdminSalesService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'api/ventas/admin';

  listarTodas(): Observable<AdminSaleRecord[]> {
    return this.api
      .get<ApiResponse<AdminSaleRecord[]>>(this.endpoint)
      .pipe(map((response) => response.data ?? []));
  }
}