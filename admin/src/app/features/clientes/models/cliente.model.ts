export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  estado: 'Activo' | 'Inactivo';
  fechaRegistro: string;
  totalCompras: number;
}
