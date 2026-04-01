import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomeComponent } from './pages/landing/home/home.component';
import { PageNotfoundComponent } from './pages/errors_page/page-notfound/page-notfound.component';


export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
        { path: '', component: HomeComponent }
    ]
  },
  { path: '**', component: PageNotfoundComponent },
];
