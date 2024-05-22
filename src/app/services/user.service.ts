import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { AvatarResponse, UserResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #userUrl = 'user';
  #http = inject(HttpClient);
 
  getUser(): Observable<User> {
    return this.#http
    .get<UserResponse>(`${this.#userUrl}/me`)
    .pipe(map((resp) => resp.user));
  }

  saveAvatar(avatar: string): Observable<string> {
    return this.#http
      .put<AvatarResponse>(`${this.#userUrl}/me/avatar`, { avatar: avatar })
      .pipe(map((resp) => resp.avatar));
  }

  saveProfile(user: User): Observable<void> {
    return this.#http
      .put<void>(`${this.#userUrl}/me`, user);
  }

  savePassword(password: string): Observable<void> {
    return this.#http
      .put<void>(`${this.#userUrl}/me/password`, { password: password });
  }
}