import { Injectable, inject } from '@angular/core';
import { ApiService } from '@/app/core/services/api/api.service';
import { FallbackService } from '@/app/core/services/fallback/fallback.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { Observable, map } from 'rxjs';
import { SubCategoriaDetalleDto, SubCategoriaListDto } from '../../models/subcategoria.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriaService {
  private readonly api = inject(ApiService);
  private readonly fallback = inject(FallbackService);

  private readonly API_PUBLIC = 'api/public/subcategorias';

  listar(): Observable<SubCategoriaListDto[]> {
    return this.fallback
      .getWithFallback<
        ApiResponse<SubCategoriaListDto[]>
      >(this.API_PUBLIC, 'data/subcategorias.json')
      .pipe(map((response) => response.data ?? []));
  }

  listarConDetalles(): Observable<SubCategoriaDetalleDto[]> {
    return this.api
      .get<ApiResponse<SubCategoriaDetalleDto[]>>(`${this.API_PUBLIC}/detalles`)
      .pipe(map((response) => response.data ?? []));
  }

  listarPorCategoria(idCat: number): Observable<SubCategoriaListDto[]> {
    return this.api
      .get<ApiResponse<SubCategoriaListDto[]>>(`${this.API_PUBLIC}/categoria/${idCat}`)
      .pipe(map((response) => response.data ?? []));
  }
}
