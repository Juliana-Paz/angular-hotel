import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Amenidade } from '../../../models/amenidade.model';
import { AmenidadeService } from './../../../services/amenidade.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-amenidade-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule, MatButton],
  templateUrl: './amenidade-list.component.html',
  styleUrl: './amenidade-list.component.css'
})
export class AmenidadeListComponent {

  amenidades: Amenidade[] = [];
  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private amenidadeService: AmenidadeService) { }

  ngOnInit(): void {
    this.getAll();
    this.count();
  }

  getAll() {
    this.amenidadeService.getAllPagination(this.page, this.pageSize).subscribe(
      (res) => {
        this.amenidades = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id: number) {
    this.amenidadeService.delete(id).subscribe(
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
    this.amenidadeService.count().subscribe(
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