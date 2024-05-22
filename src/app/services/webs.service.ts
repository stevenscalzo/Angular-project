import { Injectable, inject } from '@angular/core';
import { Web } from '../interfaces/web';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WebResponse, WebsResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class WebsService {
  #websUrl = 'webs';
  #http = inject(HttpClient);

  getWebs(): Observable<Web[]> {
    return this.#http
    .get<WebsResponse>(`${this.#websUrl}`)
    .pipe(map((resp) => resp.webs));
  }

  getWebById(id:string): Observable<Web> {
    return this.#http
    .get<WebResponse>(`${this.#websUrl}/${id}`)
    .pipe(map((resp) => resp.web));
  }
}
