import { Injectable, inject } from '@angular/core';
import { OrdersResponse } from '../interfaces/responses';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  #ordersUrl = 'orders';
  #http = inject(HttpClient);
  
  getOrders(): Observable<Order[]> {
    return this.#http
    .get<OrdersResponse>(`${this.#ordersUrl}/`)
    .pipe(map((resp) => resp.orders));
  }
}