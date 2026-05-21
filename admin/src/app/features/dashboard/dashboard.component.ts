import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';
import { TopProductsComponent } from './components/top-products/top-products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardStatsComponent, SalesChartComponent, TopProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {}
}
