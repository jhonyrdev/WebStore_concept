import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from './models/producto.model';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  showAddForm: boolean = false;
  newProducto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
    estado: 'Disponible'
  };

  categories = ['Pizzas', 'Empanadas', 'Sándwiches', 'Ensaladas', 'Bebidas'];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  get filteredProductos(): Producto[] {
    return this.productos.filter(p => {
      const matchSearch = p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         p.categoria.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCategory = this.selectedCategory === 'todos' || p.categoria === this.selectedCategory;
      return matchSearch && matchCategory;
    });
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.deleteProducto(id);
    }
  }

  addProducto(): void {
    if (this.newProducto.nombre && this.newProducto.precio && this.newProducto.stock >= 0) {
      this.productoService.addProducto(this.newProducto);
      this.newProducto = {
        id: 0,
        nombre: '',
        categoria: '',
        precio: 0,
        stock: 0,
        estado: 'Disponible'
      };
      this.showAddForm = false;
    }
  }

  toggleForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}
