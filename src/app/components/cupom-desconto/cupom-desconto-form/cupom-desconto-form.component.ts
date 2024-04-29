import { CupomDesconto } from './../../../models/cupom-desconto.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CupomDescontoService } from '../../../services/cupom-desconto.service';
import { TipoQuarto } from '../../../models/tipo-quarto.model';
import { TipoQuartoService } from '../../../services/tipo-quarto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cupom-desconto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './cupom-desconto-form.component.html',
  styleUrls: ['./cupom-desconto-form.component.css']
})
export class CupomDescontoFormComponent implements OnInit {

  formCupomDesconto: any = {
    id: 0,
    codigo: "",
    descricao: "",
    valor: 0,
    dataValidade: "",
    id_tipoQuarto: 0,
  };

  tiposQuarto: TipoQuarto[] = [];

  constructor(
    private cupomDescontoService: CupomDescontoService,
    private tipoQuartoService: TipoQuartoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTiposQuarto();

    const cupomDesconto: CupomDesconto = this.route.snapshot.data['cupomDesconto'];

    if (cupomDesconto)
      this.formCupomDesconto = cupomDesconto;
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

  onSubmit(): void {
    if (this.formCupomDesconto.id === 0) {
      this.cupomDescontoService.create(this.formCupomDesconto).subscribe(
        () => {
          console.log('Cupom de desconto criado com sucesso!');
          this.router.navigateByUrl('cupom-desconto/list');
        },
        (err) => {
          console.log('Erro ao criar cupom de desconto:', err);
        }
      );
    } else {
      this.cupomDescontoService.update(this.formCupomDesconto.id, this.formCupomDesconto).subscribe(
        () => {
          console.log('Cupom de desconto atualizado com sucesso!');
          this.router.navigateByUrl('cupom-desconto/list');
        },
        (err) => {
          console.log('Erro ao atualizar cupom de desconto:', err);
        }
      );
    }
  }
}
