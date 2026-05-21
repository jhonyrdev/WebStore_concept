export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  estado: 'Disponible' | 'Agotado';
  acciones?: string;
}
