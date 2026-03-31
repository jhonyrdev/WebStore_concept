export interface Category {
  label: string;
  sublabel?: string;
  imgSrc?: string;
  route?: string;
  featured?: boolean;
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