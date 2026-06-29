import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductoCritico {
  nombre: string;
  stockActual: number;
  ventasDiariasPromedio: number;
  diasRestantes: number;
  estado: 'CRÍTICO' | 'ALERTA' | 'OK';
}

@Component({
  selector: 'app-stock-rupture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-rupture.html',
  styleUrls: ['./stock-rupture.css']
})
export class StockRupture implements OnInit {
  
  // KPIs de Resumen
  totalAgotados = 3;
  totalEnRiesgo = 5;
  categoriaCritica = 'RTDs / Cervezas';

  // Datos simulados (Mock Data) de productos que vuelan
  productosCriticos: ProductoCritico[] = [
    { nombre: 'Cerveza Pilsen Callao 310ml (Sixpack)', stockActual: 0, ventasDiariasPromedio: 12, diasRestantes: 0, estado: 'CRÍTICO' },
    { nombre: 'Four Loko Gold 473ml', stockActual: 4, ventasDiariasPromedio: 8, diasRestantes: 0.5, estado: 'CRÍTICO' },
    { nombre: 'Papas Nativas Lay\'s Al Hilo 100g', stockActual: 15, ventasDiariasPromedio: 10, diasRestantes: 1.5, estado: 'ALERTA' },
    { nombre: 'Pisco Cuatro Gallos Acholado 750ml', stockActual: 8, ventasDiariasPromedio: 3, diasRestantes: 2.6, estado: 'ALERTA' },
    { nombre: 'Whisky Johnnie Walker Red Label 1L', stockActual: 45, ventasDiariasPromedio: 15, diasRestantes: 3.0, estado: 'OK' }
  ];

  constructor() {}

  ngOnInit(): void {}
}