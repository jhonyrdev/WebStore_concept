import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Producto } from '../../../../models/producto_Models/product.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly url = '/data/producto.json';
 
  constructor(private http: HttpClient) {}
 
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
}
