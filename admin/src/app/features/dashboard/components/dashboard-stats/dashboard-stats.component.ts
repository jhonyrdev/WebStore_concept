import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent {
  stats: Stat[] = [
    {
      label: 'Ventas Diarias',
      value: 'S/. 1,250',
      change: '> +10%',
      isPositive: true,
      icon: '$'
    },
    {
      label: 'Productos Más Vendidos',
      value: 'Pizza',
      change: '> +5%',
      isPositive: true,
      icon: 'F'
    },
    {
      label: 'Segundo Más Vendido',
      value: 'Empanada',
      change: '> +20%',
      isPositive: true,
      icon: 'F'
    }
  ];
}
