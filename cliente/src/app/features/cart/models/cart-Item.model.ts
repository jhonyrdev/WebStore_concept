import { Producto } from "@features/product/models/product.model";

export interface CartItem {
  producto: Producto;
  cantidad: number;
}