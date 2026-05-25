export enum TipoMetodoPago {
  BILLETERAS_DIGITALES = 'BILLETERAS_DIGITALES',
  TARJETAS = 'TARJETAS',
}

export interface MetodoPagoListDto {
  idMetodo: number;
  nombreMetodo: string;
  tipo: TipoMetodoPago;
  estado: boolean;
}

export interface MetodoPago {
  id: number;
  nombre: string;
  tipo: TipoMetodoPago;
  estado: boolean;
}
