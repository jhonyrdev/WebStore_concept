export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export interface ClienteListDto {
  idCli: number;
  codCli: string;
  nombreCompleto: string;
  email: string;
  estado: EstadoUsuario | string;
}
