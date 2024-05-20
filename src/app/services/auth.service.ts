import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, senha: string): Observable<any> {
    const request = {
      email: email,
      senha: senha
    };

    return this.http.post<any>(this.apiUrl, request).pipe(
      tap((res: any) => {
        const token = res.token;

        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }
}