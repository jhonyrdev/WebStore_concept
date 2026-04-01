export interface Category {
  id: number;
  nombre: string;
}

export interface CategoryWithConfig extends Category {
  imgSrc?: string;
  route?: string;
}

// export interface CategoryResponse extends Category {
//   id: number;
//   createdAt: string;
// }

// export interface CategoryRequest {
//   label: string;
//   route: string;
//   imgSrc: string;
// }
