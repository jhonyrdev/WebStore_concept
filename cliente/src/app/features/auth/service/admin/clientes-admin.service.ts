import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';

export interface AdminClientRecord {
  idCli: number;
  codCli: string;
  nombreCompleto: string;
  email: string;
  estado: 'ACTIVO' | 'INACTIVO' | string;
}

@Injectable({ providedIn: 'root' })
export class ClientesAdminService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'api/public/clientes';

  listar(): Observable<AdminClientRecord[]> {
    return this.api
      .get<ApiResponse<AdminClientRecord[]>>(this.endpoint)
      .pipe(map((response) => response.data ?? []));
  }
}