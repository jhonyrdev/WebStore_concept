export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  subCategoriaId: number; // ← agregar
  marcaId: number;
  imagen?: string;
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
}

export interface ProductoCardDto {
  imgProd: string;
  nomProd: string;
  desProd: string;
  cantProd: number;
  precioProd: number;
  estado: string;
}

export interface ProductoAdminDto {
  codProd: string;
  nomProd: string;
  precioProd: number;
  cantProd: number;
  nombreCategoria: string;
  estado: string;
}
