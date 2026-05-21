import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes$ = new BehaviorSubject<Cliente[]>([
    { 
      id: 1, 
      nombre: 'Carlos López', 
      correo: 'carlos@gmail.com', 
      telefono: '987654321',
      estado: 'Activo',
      fechaRegistro: '2025-01-15',
      totalCompras: 15
    },
    { 
      id: 2, 
      nombre: 'María García', 
      correo: 'maria@gmail.com', 
      telefono: '987654322',
      estado: 'Activo',
      fechaRegistro: '2025-02-20',
      totalCompras: 23
    },
    { 
      id: 3, 
      nombre: 'Juan Pérez', 
      correo: 'juan@gmail.com', 
      telefono: '987654323',
      estado: 'Activo',
      fechaRegistro: '2025-03-10',
      totalCompras: 8
    },
    { 
      id: 4, 
      nombre: 'Ana Martínez', 
      correo: 'ana@hotmail.com', 
      telefono: '987654324',
      estado: 'Inactivo',
      fechaRegistro: '2024-12-05',
      totalCompras: 3
    }
  ]);

  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return this.clientes$.asObservable();
  }

  deleteCliente(id: number): void {
    const current = this.clientes$.value;
    this.clientes$.next(current.filter(c => c.id !== id));
  }

  addCliente(cliente: Cliente): void {
    const current = this.clientes$.value;
    this.clientes$.next([...current, { ...cliente, id: current.length + 1 }]);
  }
}
