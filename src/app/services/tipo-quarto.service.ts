import { TipoQuarto } from './../models/tipo-quarto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoQuartoService {

  apiUrl: string = 'http://localhost:8080/api/tipoquartos'

  constructor(private http: HttpClient) { }

  create(tipoQuarto: TipoQuarto): Observable<TipoQuarto> {
    const request = {
      nome: tipoQuarto.nome
    }
    return this.http.post<TipoQuarto>(this.apiUrl, request);
  }

  update(id: string, tipoQuarto: TipoQuarto): Observable<TipoQuarto> {
    const request = {
      nome: tipoQuarto.nome
    }
    return this.http.put<TipoQuarto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  findById(id: string): Observable<TipoQuarto> {
    return this.http.get<TipoQuarto>(`${this.apiUrl}/${id}`);
  }

  getAll(page: number, pageSize: number): Observable<TipoQuarto[]> {
    return this.http.get<TipoQuarto[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}