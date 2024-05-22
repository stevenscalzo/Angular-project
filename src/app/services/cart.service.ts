import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CartResponse } from '../interfaces/responses';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  #cartUrl = 'cart';
  #http = inject(HttpClient);
  
  getCart(): Observable<Order> {
    return this.#http
    .get<CartResponse>(`${this.#cartUrl}/`)
    .pipe(map((resp) => resp.cart));
  }

  addToCart(product: Product, qty: number): Observable<void> {
    return this.#http.post<void>(`${this.#cartUrl}/add`, { product: product, qty: qty });
  }

  saveCart(cart: Order): Observable<void> {
    return this.#http.put<void>(`${this.#cartUrl}`, cart);
  }

  deleteCart(): Observable<void> {
    return this.#http.delete<void>(`${this.#cartUrl}`);
  }

  markCartAsPaid(): Observable<void> {
    return this.#http.post<void>(`${this.#cartUrl}/paid`, {});
  }
}