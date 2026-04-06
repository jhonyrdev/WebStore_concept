import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomeComponent } from './pages/landing/home/home.component';
import { PageNotfoundComponent } from './pages/errors_page/page-notfound/page-notfound.component';
import { CatalogLayoutComponent } from './core/layout/catalog-layout/catalog-layout.component';
import { CatalogoComponent } from './pages/landing/catalogo/catalogo.component';


export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
        { path: '', component: HomeComponent },
        {
        path: '',
        component: CatalogLayoutComponent,
        children: [
          { path: 'catalogo', component: CatalogoComponent }, 
          { path: 'cervezas',  component: CatalogoComponent, data: { categoriaId: 1 } },
          { path: 'rtds',      component: CatalogoComponent, data: { categoriaId: 2 } },
          { path: 'licores',   component: CatalogoComponent, data: { categoriaId: 3 } },
          { path: 'comidas',   component: CatalogoComponent, data: { categoriaId: 4 } },
          { path: 'bebidas',   component: CatalogoComponent, data: { categoriaId: 5 } },
          { path: 'antojos',   component: CatalogoComponent, data: { categoriaId: 6 } },
          { path: 'helados',   component: CatalogoComponent, data: { categoriaId: 7 } },
          { path: 'despensa',  component: CatalogoComponent, data: { categoriaId: 8 } },
        ]
      }
    ]
  },
  { path: '**', component: PageNotfoundComponent },
];
