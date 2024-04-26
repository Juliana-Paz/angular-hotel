import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Quarto } from '../../../models/quarto.model';
import { AmenidadeService } from '../../../services/amenidade.service';
import { QuartoService } from '../../../services/quarto.service';
import { TipoQuartoService } from '../../../services/tipo-quarto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quarto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './quarto-form.component.html',
  styleUrls: ['./quarto-form.component.css']
})
export class QuartoFormComponent implements OnInit {
  formQuarto: Quarto = {
    id: 0,
    nome: '',
    valor: 0,
    descricao: '',
    isReservado: false,
    isAtivo: false,
    tipoQuarto: {
      id: 0,
      nome: ''
    },
    amenidades: [{
      id: 0,
      nome: ''
    }]
  };

  amenidades: any[] = [];
  tiposQuarto: any[] = [];

  constructor(
    private amenidadeService: AmenidadeService,
    private tipoQuartoService: TipoQuartoService,
    private quartoService: QuartoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAmenidades();
    this.loadTiposQuarto();

    const quarto: Quarto = this.route.snapshot.data['quarto'];

    if (quarto)
      this.formQuarto = quarto;
  }

  loadAmenidades(): void {
    this.amenidadeService.getAll().subscribe(
      (res) => {
        this.amenidades = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadTiposQuarto(): void {
    this.tipoQuartoService.getAll(0, 120).subscribe(
      (res) => {
        this.tiposQuarto = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    if (this.formQuarto.id === 0) {
      this.quartoService.create(this.formQuarto).subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('quarto/list');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.quartoService.update(this.formQuarto.id, this.formQuarto).subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('quarto/list');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}