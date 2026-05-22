import { AdminAuthService } from '@/app/features/auth/service/admin/admin-auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminLoginGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/tambito++/home']);
  }

  return true;
};
