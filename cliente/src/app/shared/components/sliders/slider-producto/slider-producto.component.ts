import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../models/producto_Models/product.model';
import { ProductoService } from '../../../../core/services/producto_Services/producto/producto.service';

@Component({
  selector: 'app-slider-producto',
  imports: [CommonModule],
  templateUrl: './slider-producto.component.html',
  styleUrl: './slider-producto.component.css',
})
export class SliderProductoComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;
  error = '';

  toastVisible = false;
  toastMessage = '';
  private toastTimer: any;

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef   // ← agregar
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
        this.cdr.detectChanges();   // ← agregar
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
        this.cdr.detectChanges();   // ← agregar
        console.error(err);
      },
    });
  }

  scroll(dir: 'left' | 'right') {
    const el = document.getElementById('slider-track');
    if (el) el.scrollBy({ left: dir === 'right' ? 200 : -200, behavior: 'smooth' });
  }

  agregar(product: Producto) {
    this.toastMessage = `${product.nombre} agregado`;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2000);
  }
}