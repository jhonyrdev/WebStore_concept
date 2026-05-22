import { ClientAuthService } from '@/app/features/auth/service/client/client-auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


/**
 * Guard que protege las rutas del cliente.
 * Si el usuario NO está autenticado como cliente, lo redirige a home.
 */
export const authClientGuard: CanActivateFn = () => {
  const authService = inject(ClientAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
