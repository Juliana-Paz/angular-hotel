import { Amenidade } from '../models/amenidade.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenidadeService {

  apiUrl: string = 'http://localhost:8080/api/amenidades'

  constructor(private http: HttpClient) { }

  create(amenidade: Amenidade): Observable<Amenidade> {
    const request = {
      nome: amenidade.nome
    }
    return this.http.post<Amenidade>(this.apiUrl, request);
  }

  update(id: string, amenidade: Amenidade): Observable<Amenidade> {
    const request = {
      nome: amenidade.nome
    }
    return this.http.put<Amenidade>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  findById(id: string): Observable<Amenidade> {
    return this.http.get<Amenidade>(`${this.apiUrl}/${id}`);
  }

  getAllPagination(page: number, pageSize: number): Observable<Amenidade[]> {
    return this.http.get<Amenidade[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getAll(): Observable<Amenidade[]> {
    return this.http.get<Amenidade[]>(this.apiUrl);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}