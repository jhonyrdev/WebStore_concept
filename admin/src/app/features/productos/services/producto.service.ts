import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos$ = new BehaviorSubject<Producto[]>([
    { id: 1, nombre: 'Pizza Clásica', categoria: 'Pizzas', precio: 12.50, stock: 25, estado: 'Disponible' },
    { id: 2, nombre: 'Pizza BBQ', categoria: 'Pizzas', precio: 14.99, stock: 18, estado: 'Disponible' },
    { id: 3, nombre: 'Empanada de Pollo', categoria: 'Empanadas', precio: 2.50, stock: 50, estado: 'Disponible' },
    { id: 4, nombre: 'Sándwich Mixto', categoria: 'Sándwiches', precio: 8.50, stock: 0, estado: 'Agotado' },
    { id: 5, nombre: 'Ensalada César', categoria: 'Ensaladas', precio: 9.99, stock: 30, estado: 'Disponible' },
    { id: 6, nombre: 'Jugo Natural', categoria: 'Bebidas', precio: 4.50, stock: 40, estado: 'Disponible' }
  ]);

  constructor() {}

  getProductos(): Observable<Producto[]> {
    return this.productos$.asObservable();
  }

  deleteProducto(id: number): void {
    const current = this.productos$.value;
    this.productos$.next(current.filter(p => p.id !== id));
  }

  addProducto(producto: Producto): void {
    const current = this.productos$.value;
    this.productos$.next([...current, { ...producto, id: current.length + 1 }]);
  }
}
