import { Component } from '@angular/core';
import { TipoQuartoService } from '../../../services/tipo-quarto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoQuarto } from '../../../models/tipo-quarto.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-quarto-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './tipo-quarto-form.component.html',
  styleUrl: './tipo-quarto-form.component.css'
})
export class TipoQuartoFormComponent {

  tipoQuartoForm!: FormGroup;
  isEdit: boolean = false;
  tipoQuartoId: string | null = null;

  constructor(private formBuilder: FormBuilder, private tipoQuartoService: TipoQuartoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tipoQuartoForm = this.formBuilder.group({
      nome: ['', Validators.required]
    });

    this.tipoQuartoId = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.tipoQuartoId !== null;

    if (this.isEdit) {
      // Atualizando tipo de quarto
      this.route.data.subscribe(data => {
        const tipoQuarto: TipoQuarto = data['tipoQuarto'];
        this.tipoQuartoForm.patchValue({
          nome: tipoQuarto.nome
        });
      });
    }
  }

  onSubmit(): void {
    if (this.tipoQuartoForm.valid) {
      const tipoQuarto = this.tipoQuartoForm.value;
      if (this.isEdit) {
        // Atualizar tipo de quarto
        this.tipoQuartoService.update(this.tipoQuartoId!, tipoQuarto).subscribe(
          (res) => {
            console.log('Tipo de quarto atualizado com sucesso:', res);
            this.router.navigateByUrl('tipo-quarto/list');
          },
          (err) => {
            console.error('Erro ao atualizar tipo de quarto:', err);
          }
        );
      } else {
        // Criar novo tipo de quarto
        this.tipoQuartoService.create(tipoQuarto).subscribe(
          (res) => {
            console.log('Tipo de quarto criado com sucesso:', res);
            this.router.navigateByUrl('tipo-quarto/list');
          },
          (err) => {
            console.error('Erro ao criar tipo de quarto:', err);
          }
        );
      }
    } else {
      console.warn('Formulário inválido. Verifique os campos.');
    }
  }
}
