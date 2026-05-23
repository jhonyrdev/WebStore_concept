import { ApiResponse } from '@/app/core/models/api-response';
import { ApiService } from '@/app/core/services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RegisterDniRequest,
  DniPreviewResponse,
  RegisterManualRequest,
} from '../../../models/auth.types';

@Injectable({
  providedIn: 'root',
})
export class ClientRegisterService {
  private readonly API = 'auth';

  constructor(private api: ApiService) {}

  consultarDni(dni: string): Observable<ApiResponse<DniPreviewResponse>> {
    return this.api.get<ApiResponse<DniPreviewResponse>>(`${this.API}/dni/${dni}`);
  }

  registrarManual(data: RegisterManualRequest): Observable<ApiResponse<any>> {
    return this.api.post<ApiResponse<any>, RegisterManualRequest>(
      `${this.API}/register/cliente/manual`,
      data,
    );
  }

  registrarDni(data: RegisterDniRequest): Observable<ApiResponse<any>> {
    return this.api.post<ApiResponse<any>, RegisterDniRequest>(
      `${this.API}/register/cliente/dni`,
      data,
    );
  }
}
