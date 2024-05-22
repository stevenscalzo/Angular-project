import { Injectable, inject } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoriesResponse, CategoryResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  #categoriesUrl = 'categories';
  #http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.#http
    .get<CategoriesResponse>(`${this.#categoriesUrl}`)
    .pipe(map((resp) => resp.categories));
  }

  getCategoryById(id: number): Observable<Category> {
    return this.#http
    .get<CategoryResponse>(`${this.#categoriesUrl}/${id}`)
    .pipe(map((resp) => resp.category));
  }
}
