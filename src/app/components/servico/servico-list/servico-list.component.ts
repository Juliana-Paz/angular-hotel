import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servico.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-servico-list',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatPaginatorModule, MatIcon, MatButton],
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  servicos: Servico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'isAtivo', 'acoes'];

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private servicoService: ServicoService) { }

  ngOnInit(): void {
    this.getAll();
    this.count();
  }

  getAll() {
    this.servicoService.getAll(this.page, this.pageSize).subscribe(
      (res) => {
        this.servicos = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id: number) {
    this.servicoService.delete(id).subscribe(
      () => {
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  count(): void {
    this.servicoService.count().subscribe(
      (res) => {
        this.totalRecords = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
