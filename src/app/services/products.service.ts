import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductResponse, ProductsResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  #productsUrl = 'products';
  #http = inject(HttpClient);
  
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.#http
    .get<ProductsResponse>(`${this.#productsUrl}/category/${categoryId}`)
    .pipe(map((resp) => resp.products));
  }

  getProductById(id: number): Observable<Product> {
    return this.#http
    .get<ProductResponse>(`${this.#productsUrl}/${id}`)
    .pipe(map((resp) => resp.product));
  }

  getProductsByText(text: string): Observable<Product[]> {
    return this.#http
    .get<ProductsResponse>(`${this.#productsUrl}/search/${text}`)
    .pipe(map((resp) => resp.products));
  }
}
