export interface PromocionResponseDto {
  idPromocion: number;
  nombre: string;
  descripcion?: string;
  tipoDescuento: 'PORCENTAJE' | 'MONTO_FIJO';
  valorDescuento: number;
  fechaInicio: string;
  fechaFin: string;    
  estado: 'ACTIVO' | 'INACTIVO';
}

export interface PromocionRequestDto {
  nombre: string;
  descripcion?: string;
  tipoDescuento: 'PORCENTAJE' | 'MONTO_FIJO';
  valorDescuento: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'ACTIVA' | 'INACTIVA' ;
}
