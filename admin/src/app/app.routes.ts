import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './core/layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductosComponent } from './features/productos/productos.component';
import { ClientesComponent } from './features/clientes/clientes.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' }
];
