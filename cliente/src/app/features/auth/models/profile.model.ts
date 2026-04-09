export interface Profile {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  telefono: string;
  documento: string;
  direccion: string | null;
  fechaRegistro: string | null;
  credencial_id: number;
}
