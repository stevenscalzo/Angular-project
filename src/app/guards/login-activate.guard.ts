import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginActivateGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const route = inject(Router);

  return authService.isLogged().pipe(
    map((loggedIn) => {
      if (!loggedIn) {
        return route.createUrlTree(['/']);
      } else {
        return true;
      }
    })
  );
};
