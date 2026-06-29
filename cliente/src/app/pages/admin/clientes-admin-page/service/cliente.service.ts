import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response';
import { ClienteListDto } from '../models/cliente-list-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiService = inject(ApiService);
  private readonly endpoint = 'api/public/clientes';

  listar(): Observable<ClienteListDto[]> {
    return this.apiService
      .get<ApiResponse<ClienteListDto[]>>(this.endpoint)
      .pipe(map((res) => res.data));
  }
}
