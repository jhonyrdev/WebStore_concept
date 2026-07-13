export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  subCategoriaId: number; // ← agregar
  marcaId: number;
  imagen?: string;
  porcentajeDescuento?: number;
}

export interface ProductoListDto {
  idProd: number;
  codProd: string;
  nomProd: string;
  desProd: string;
  idMarca: number;
  nombreMarca: string;
  idUnidad: number;
  nombreUnidad: string;
  cantProd: number;
  precioProd: number;
  imgProd: string;
  estado: string;
  idSubcat: number;
  nombreSubcat: string;
  idCat: number;
  nombreCategoria: string;
  porcentajeDescuento?: number;
}

export interface ProductoCardDto {
  imgProd: string;
  nomProd: string;
  desProd: string;
  cantProd: number;
  precioProd: number;
  estado: string;
  // Añadimos estos campos para manejar la promoción desde el Backend
  porcentajeDescuento?: number; 
  precioConDescuento?: number;
}

export interface ProductoAdminDto {
  idProd: number;
  codProd: string;
  nomProd: string;
  precioProd: number;
  cantProd: number;
  nombreCategoria: string;
  estado: string;
  descuento?: number;
  porcentajeDescuento?: number;
}
