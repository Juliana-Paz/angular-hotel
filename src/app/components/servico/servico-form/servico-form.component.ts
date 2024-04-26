import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicoService } from '../../../services/servico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servico } from '../../../models/servico.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatPseudoCheckbox } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButton, MatCheckboxModule],
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  servicoForm!: FormGroup;
  isEdit: boolean = false;
  servicoId: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private servicoService: ServicoService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.servicoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      isAtivo: [true]
    });

    this.servicoId = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.servicoId !== null;

    if (this.isEdit) {
      // Atualizando serviço
      this.route.data.subscribe(data => {
        const servico: Servico = data['servico'];
        this.servicoForm.patchValue({
          nome: servico.nome,
          descricao: servico.descricao,
          valor: servico.valor,
          isAtivo: servico.isAtivo
        });
      });
    }
  }

  onSubmit(): void {
    if (this.servicoForm.valid) {
      const servico: Servico = this.servicoForm.value;
      if (this.isEdit) {
        // Atualizar serviço
        this.servicoService.update(this.servicoId!, servico).subscribe(
          () => {
            console.log('Serviço atualizado com sucesso:', servico);
            this.router.navigateByUrl('servico/list');
          },
          (err) => {
            console.error('Erro ao atualizar serviço:', err);
          }
        );
      } else {
        // Criar novo serviço
        this.servicoService.create(servico).subscribe(
          () => {
            console.log('Serviço criado com sucesso:', servico);
            this.router.navigateByUrl('servico/list');
          },
          (err) => {
            console.error('Erro ao criar serviço:', err);
          }
        );
      }
    } else {
      console.warn('Formulário inválido. Verifique os campos.');
    }
  }
}
