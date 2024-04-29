import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CupomDesconto } from '../models/cupom-desconto.model';
import { CupomDescontoDTO } from '../dto/cupom-desconto-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CupomDescontoService {

  apiUrl: string = 'http://localhost:8080/api/cupons-desconto'; 

  constructor(private http: HttpClient) { }

  create(cupom: CupomDescontoDTO): Observable<CupomDesconto> {
    return this.http.post<CupomDesconto>(this.apiUrl, cupom);
  }

  update(id: number, cupom: CupomDesconto): Observable<CupomDesconto> {
    const request = {
      codigo: cupom.codigo, 
      descricao: cupom.descricao,
      valor: cupom.valor,
      dataValidade: cupom.dataValidade,
      id_tipoQuarto: cupom.tipoQuarto.id

    };

    return this.http.put<CupomDesconto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  findById(id: string): Observable<CupomDesconto> {
    return this.http.get<CupomDesconto>(`${this.apiUrl}/${id}`);
  }

  getAll(page: number, pageSize: number): Observable<CupomDesconto[]> {
    return this.http.get<CupomDesconto[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
