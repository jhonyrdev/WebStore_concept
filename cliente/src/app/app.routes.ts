import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { Inicio } from './pages/public_pages/inicio/inicio';
import { PageNotfoundComponent } from './pages/errors_page/page-notfound/page-notfound.component';


export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
        { path: '', component: Inicio }
    ]
  },
  { path: '**', component: PageNotfoundComponent },
];
