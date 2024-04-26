import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Quarto } from '../../../models/quarto.model';
import { QuartoService } from '../../../services/quarto.service';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quarto-list', 
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule, MatButton],
  templateUrl: './quarto-list.component.html',
  styleUrls: ['./quarto-list.component.css']
})
export class QuartoListComponent {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'descricao', 'isReservado', 'isAtivo', 'tipoQuarto', 'amenidades', 'acoes'];
  dataSource = new MatTableDataSource<Quarto>();
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private quartoService: QuartoService) { }

  ngOnInit(): void {
    this.getAllQuartos();
    this.count();
  }

  getAllQuartos() {
    this.quartoService.getAll(this.page, this.pageSize)
      .subscribe(quartos => {
        this.dataSource.data = quartos;
      });
  }

  delete(id: number) {
    this.quartoService.delete(id).subscribe(
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
    this.quartoService.count()
      .subscribe(total => {
        this.totalRecords = total;
      });
  }

  paginar(event: any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllQuartos();
  }
}