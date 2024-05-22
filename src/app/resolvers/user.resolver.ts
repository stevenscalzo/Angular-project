import { ResolveFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { User } from '../interfaces/user';

export const userResolver: ResolveFn<User> = (route, state) => {
  return inject(UserService).getUser().pipe(
    catchError((error) => {
      inject(Router).navigate(['/products']);
      return EMPTY;
    })
  );
};