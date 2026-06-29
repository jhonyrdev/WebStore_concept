import { Injectable, inject } from '@angular/core';
import { ApiService } from '@/app/core/services/api/api.service';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '@/app/core/models/api-response';
import { MarcaDto, MarcaListDto } from '../../models/marca.model';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiService = inject(ApiService);
  private readonly publicUrl = 'api/public/marcas';
  private readonly privateUrl = 'api/marcas';

  listar(): Observable<MarcaListDto[]> {
    return this.apiService
      .get<ApiResponse<MarcaListDto[]>>(this.publicUrl)
      .pipe(map((res) => res.data));
  }

  listarPorSubCategoria(idSubcat: number): Observable<MarcaListDto[]> {
    return this.apiService
      .get<ApiResponse<MarcaListDto[]>>(`${this.publicUrl}/subcategoria/${idSubcat}`)
      .pipe(map((res) => res.data));
  }

  listarPorCategoria(idCat: number): Observable<MarcaListDto[]> {
    return this.apiService
      .get<ApiResponse<MarcaListDto[]>>(`${this.publicUrl}/categoria/${idCat}`)
      .pipe(map((res) => res.data));
  }

  crear(dto: MarcaDto): Observable<MarcaListDto> {
    return this.apiService
      .post<ApiResponse<MarcaListDto>, MarcaDto>(this.privateUrl, dto)
      .pipe(map((res) => res.data));
  }

  actualizar(id: number, dto: MarcaDto): Observable<MarcaListDto> {
    return this.apiService
      .put<ApiResponse<MarcaListDto>, MarcaDto>(`${this.privateUrl}/${id}`, dto)
      .pipe(map((res) => res.data));
  }

  eliminar(id: number): Observable<void> {
    return this.apiService
      .delete<ApiResponse<void>>(`${this.privateUrl}/${id}`)
      .pipe(map(() => undefined));
  }
}
