import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CupomDesconto } from '../../../models/cupom-desconto.model';
import { CupomDescontoService } from '../../../services/cupom-desconto.service';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cupom-desconto-list', 
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule, MatButton, CurrencyPipe, DatePipe],
  templateUrl: './cupom-desconto-list.component.html',
  styleUrls: ['./cupom-desconto-list.component.css']
})
export class CupomDescontoListComponent {
  displayedColumns: string[] = ['codigo', 'descricao', 'valor', 'dataValidade', 'tipoQuarto', 'acoes'];
  dataSource = new MatTableDataSource<CupomDesconto>();
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cupomDescontoService: CupomDescontoService) { }

  ngOnInit(): void {
    this.getAllCuponsDesconto();
    this.count();
  }

  getAllCuponsDesconto() {
    this.cupomDescontoService.getAll(this.page, this.pageSize)
      .subscribe(cupons => {
        this.dataSource.data = cupons;
      });
  }

  delete(id: number) {
    this.cupomDescontoService.delete(id).subscribe(
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
    this.cupomDescontoService.count()
      .subscribe(total => {
        this.totalRecords = total;
      });
  }

  paginar(event: any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllCuponsDesconto();
  }
}

