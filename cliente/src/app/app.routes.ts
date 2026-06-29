import { Routes } from '@angular/router';

import { PageNotfoundComponent } from './pages/errors_page/page-notfound/page-notfound.component';

import { CatalogLayoutComponent, PublicLayoutComponent, AdminLayoutComponent } from './core/layout';

import { authAdminGuard, adminLoginGuard, authClientGuard } from './core/guards';

import { HomeComponent, CatalogoComponent } from './pages/landing';

import { PerfilComponent } from './pages/client';

import {
  Home,
  LoginPage,
  PerfilAdmin,
  ConfigAdminPage,
  ClientesAdminPage,
  ReclamosAdminPage,
  VentasAdminPage,
  ProductosAdminPage,
  StockRuptureAdminPage,
} from './pages/admin';

export const routes: Routes = [
  // ─── Rutas públicas ───────────────────────────────────────────────
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
          { path: 'cervezas', component: CatalogoComponent, data: { categoriaId: 1 } },
          { path: 'rtds', component: CatalogoComponent, data: { categoriaId: 2 } },
          { path: 'licores', component: CatalogoComponent, data: { categoriaId: 3 } },
          { path: 'comidas', component: CatalogoComponent, data: { categoriaId: 4 } },
          { path: 'bebidas', component: CatalogoComponent, data: { categoriaId: 5 } },
          { path: 'antojos', component: CatalogoComponent, data: { categoriaId: 6 } },
          { path: 'helados', component: CatalogoComponent, data: { categoriaId: 7 } },
          { path: 'despensa', component: CatalogoComponent, data: { categoriaId: 8 } },
        ],
      },
      // ─── Client ──────────────────────────────────────
      {
        path: 'perfil',
        component: PerfilComponent,
        //canActivate: [authClientGuard],
      },
    ],
  },

  // ─── Panel de Administración ──────────────────────────────────────
  {
    path: 'tambito++',

    children: [
      {
        path: 'login',
        component: LoginPage,
        canActivate: [adminLoginGuard],
      },
      {
        path: '',
        // canActivate: [authAdminGuard],
        component: AdminLayoutComponent,
       // canActivateChild: [authAdminGuard],
        children: [
          { path: 'home', component: Home },
          { path: 'products', component: ProductosAdminPage },
          { path: 'stock-rupture', component: StockRuptureAdminPage },
          { path: 'sales', component: VentasAdminPage },
          { path: 'complaints', component: ReclamosAdminPage },
          { path: 'users', component: ClientesAdminPage },
          { path: 'store-settings', component: ConfigAdminPage },
          { path: 'perfil-admin', component: PerfilAdmin },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
    ],
  },

  { path: '**', component: PageNotfoundComponent },
];
