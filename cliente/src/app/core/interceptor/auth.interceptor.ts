import { ClientAuthService } from '@/app/features/auth/service/client/login/client-auth.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { TokenService } from '../services/jwt/token.service';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const clientAuth = inject(ClientAuthService);

  const token = tokenService.get();

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        tokenService.clear();
        clientAuth.logout();
      }
      throw error;
    }),
  );
};
