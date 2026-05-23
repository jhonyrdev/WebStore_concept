import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '@/app/features/auth/service/admin/admin-auth.service';

/**
 * Guard que protege las rutas del panel de administración.
 * Si el usuario NO está autenticado, lo redirige a /admin/login.
 */
export const authAdminGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/tambito++/login']);
};
