import { Component, OnInit } from '@angular/core';
import { Quarto } from '../../../models/quarto.model';
import { AmenidadeService } from '../../../services/amenidade.service';

@Component({
  selector: 'app-quarto-form',
  standalone: true,
  imports: [],
  templateUrl: './quarto-form.component.html',
  styleUrl: './quarto-form.component.css'
})
export class QuartoFormComponent implements OnInit {

  formQuarto: any = {
    id: 0,
    nome: '',
    valor: 0,
    descricao: '',
    isReservado: false,
    isAtivo: false,
    idTipoQuarto: 0,
    amenidades: [
      {
        id: 0,
        nome: ''
      }
    ]
  }

  constructor(private amenidadeService: AmenidadeService) { }

  ngOnInit(): void {
    this.amenidadeService.getAll().subscribe(
      (res) => {
        
      }
    )
  }
}