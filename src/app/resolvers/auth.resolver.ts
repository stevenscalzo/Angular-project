import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  return inject(AuthService).isLogged();
};
