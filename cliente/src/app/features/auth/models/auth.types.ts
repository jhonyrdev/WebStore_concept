export interface AuthResponse {
  userId: number;
  username: string;
  email?: string;
  rol: string;
  loginType?: string;
  token: string;
}

export interface RegisterManualRequest {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
}

export interface RegisterDniRequest {
  dni: string;
  email: string;
  password: string;
}

export interface DniPreviewResponse {
  dni: string;
  nombreCompleto: string;
}