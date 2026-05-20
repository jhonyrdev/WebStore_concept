import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TopProduct {
  name: string;
  sales: number;
  emoji: string;
  color: string;
}

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent {
  topProducts: TopProduct[] = [
    { name: 'pizzas', sales: 120, emoji: '', color: '#FF6B6B' },
    { name: 'sandwiches', sales: 95, emoji: '', color: '#4ECDC4' },
    { name: 'ensaladas', sales: 78, emoji: '', color: '#95E1D3' },
    { name: 'postres', sales: 65, emoji: '', color: '#FFD93D' },
    { name: 'bebidas', sales: 45, emoji: '', color: '#6BCB77' }
  ];

  maxSales = Math.max(...this.topProducts.map(p => p.sales));

  getBarWidth(sales: number): string {
    return ((sales / this.maxSales) * 100) + '%';
  }
}
