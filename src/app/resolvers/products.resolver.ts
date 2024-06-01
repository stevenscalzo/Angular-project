import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  if (route.params['id']) {
    return inject(ProductsService).getProductsByCategory(route.params['id']).pipe(
      catchError((error) => {
        inject(Router).navigate(['/products']);
        return EMPTY;
      })
    );
  } else if (route.params['text']) {
    return inject(ProductsService).getProductsByText(route.params['text']).pipe(
      catchError((error) => {
        inject(Router).navigate(['/products']);
        return EMPTY;
      })
    );
  } else {
    inject(Router).navigate(['/products']);
    return EMPTY;
  }
};