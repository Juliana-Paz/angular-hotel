import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TipoQuarto } from '../../../models/tipo-quarto.model';
import { TipoQuartoService } from './../../../services/tipo-quarto.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-tipo-quarto-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule, MatButton],
  templateUrl: './tipo-quarto-list.component.html',
  styleUrl: './tipo-quarto-list.component.css'
})
export class TipoQuartoListComponent {

  tipoQuartos: TipoQuarto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private tipoQuartoService: TipoQuartoService) { }

  ngOnInit(): void {
    this.getAll();
    this.count();
  }

  getAll() {
    this.tipoQuartoService.getAll(this.page, this.pageSize).subscribe(
      (res) => {
        this.tipoQuartos = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id: number) {
    this.tipoQuartoService.delete(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  count(): void {
    this.tipoQuartoService.count().subscribe(
      (res) => {
        this.totalRecords = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
}