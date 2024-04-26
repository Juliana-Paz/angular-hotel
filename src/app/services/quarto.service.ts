import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quarto } from '../models/quarto.model';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  apiUrl: string = 'http://localhost:8080/api/quartos'  // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  create(quarto: Quarto): Observable<Quarto> {
    const request = {
      nome: quarto.nome,
      valor: quarto.valor,
      descricao: quarto.descricao,
      isReservado: quarto.isReservado,
      isAtivo: quarto.isAtivo,
      idTipoQuarto: quarto.tipoQuarto.id,
      amenidades: quarto.amenidades
    }
    return this.http.post<Quarto>(this.apiUrl, request);
  }

  update(id: number, quarto: Quarto): Observable<Quarto> {
    const request = {
      nome: quarto.nome,
      valor: quarto.valor,
      descricao: quarto.descricao,
      isReservado: quarto.isReservado,
      isAtivo: quarto.isAtivo,
      idTipoQuarto: quarto.tipoQuarto.id,
      amenidades: quarto.amenidades
    }
    return this.http.put<Quarto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  findById(id: string): Observable<Quarto> {
    return this.http.get<Quarto>(`${this.apiUrl}/${id}`);
  }

  getAll(page: number, pageSize: number): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
