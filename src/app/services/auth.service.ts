import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { TokenResponse } from '../interfaces/responses';
import { User, UserLogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #authUrl = 'auth';
  #http = inject(HttpClient);
  #logged = signal(false);
  conditionalLogged = computed(() => { return this.#logged(); });

  get logged() {
    return this.#logged.asReadonly();
  }

  register(user: User): Observable<void> {
    return this.#http.post<void>(`${this.#authUrl}/register`, user);
  }

  login(user: UserLogin): Observable<void> {
    return this.#http.post<TokenResponse>(`${this.#authUrl}/login`, user).pipe(map(r => {
      localStorage.setItem("token", r.token);
      this.#logged.set(true);
    }));
  }

  logout() {
    localStorage.removeItem("token");
    this.#logged.set(false);
  }
/*
  isLogged(): Observable<boolean> {
    if (!this.conditionalLogged() && !localStorage.getItem('token')) {
      return of(false);
    } else if (this.conditionalLogged()) {
      return of(true);
    } else {
      return this.#http.get<string>(`${this.#authUrl}/validate`).pipe(
        map(() => {
          this.#logged.set(true);
          return true;
        }),
        catchError(() => {
          localStorage.removeItem("token");
          this.#logged.set(false);
          return of(false);
        })
      );
    }
  }*/

  isLogged(): Observable<boolean> {
    if (!this.conditionalLogged() && !localStorage.getItem('token')) {
      this.#logged.set(false);
      return of(false);
    } else {
      this.#logged.set(true);
      return of(true);
    } 
  }
}
