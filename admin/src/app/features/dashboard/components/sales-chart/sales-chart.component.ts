import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SalesData {
  day: string;
  sales: number;
}

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent {
  salesData: SalesData[] = [
    { day: 'Lunes', sales: 900 },
    { day: 'Martes', sales: 1100 },
    { day: 'Miércoles', sales: 950 },
    { day: 'Jueves', sales: 1200 },
    { day: 'Viernes', sales: 1300 },
    { day: 'Sábado', sales: 1400 },
    { day: 'Domingo', sales: 1150 }
  ];

  maxSales = Math.max(...this.salesData.map(d => d.sales));

  getBarHeight(sales: number): string {
    return ((sales / this.maxSales) * 100) + '%';
  }
}
