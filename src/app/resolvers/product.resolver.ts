import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  return inject(ProductsService).getProductById(route.params['id']).pipe(
    catchError((error) => {
      inject(Router).navigate(['/products']);
      return EMPTY;
    })
  );
};