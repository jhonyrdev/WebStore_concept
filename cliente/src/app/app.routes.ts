import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomeComponent } from './pages/landing/home/home.component';
import { PageNotfoundComponent } from './pages/errors_page/page-notfound/page-notfound.component';
import { CatalogLayoutComponent } from './core/layout/catalog-layout/catalog-layout.component';
import { CatalogoComponent } from './pages/landing/catalogo/catalogo.component';
import { authAdminGuard } from './core/guards/auth-admin.guard';
import { adminLoginGuard } from './core/guards/admin-login.guard';
import { authClientGuard } from './core/guards/auth-client.guard';
import { LoginPage } from './pages/admin/login-page/login-page';
import { Home } from './pages/admin/home/home';
import { PerfilAdmin } from './pages/admin/perfil-admin/perfil-admin';
import { PerfilComponent } from './pages/client/perfil/perfil.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { ConfigAdminPage } from './pages/admin/config-admin-page/config-admin-page';
import { ClientesAdminPage } from './pages/admin/clientes-admin-page/clientes-admin-page';
import { ReclamosAdminPage } from './pages/admin/reclamos-admin-page/reclamos-admin-page';
import { VentasAdminPage } from './pages/admin/ventas-admin-page/ventas-admin-page';
import { ProductosAdminPage } from './pages/admin/productos-admin-page/productos-admin-page';

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
        canActivate: [authClientGuard],
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
        canActivate: [authAdminGuard],
        component: AdminLayoutComponent,
        canActivateChild: [authAdminGuard],
        children: [
          { path: 'home', component: Home },
          { path: 'products', component: ProductosAdminPage },
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
