import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientRegisterService } from './client-register.service';

@Injectable({ providedIn: 'root' })
export class ClientRegisterFacade {

  constructor(private clienteregisterService: ClientRegisterService) {}

  consultarDni(dni: string): Observable<string> {
    return this.clienteregisterService.consultarDni(dni).pipe(
      map(res => res.success ? res.data.nombreCompleto : '')
    );
  }

  registerByDni(data: any): Observable<boolean> {
    return this.clienteregisterService.registrarDni(data).pipe(
      map(res => res.success)
    );
  }

  registerManual(data: any): Observable<boolean> {
    return this.clienteregisterService.registrarManual(data).pipe(
      map(res => res.success)
    );
  }
}