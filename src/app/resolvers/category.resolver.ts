import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';

export const categoryResolver: ResolveFn<Category> = (route, state) => {
  return inject(CategoriesService).getCategoryById(route.params['id']).pipe(
    catchError((error) => {
      inject(Router).navigate(['/products']);
      return EMPTY;
    })
  );
};
