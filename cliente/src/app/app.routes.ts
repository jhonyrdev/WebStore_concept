import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { Inicio } from './pages/public_pages/inicio/inicio';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
        { path: '', component: Inicio }
    ]
  }
];
