import { Component } from '@angular/core';
import { AmenidadeService } from '../../../services/amenidade.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Amenidade } from '../../../models/amenidade.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amenidade-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './amenidade-form.component.html',
  styleUrl: './amenidade-form.component.css'
})
export class AmenidadeFormComponent {

  amenidadeForm!: FormGroup;
  isEdit: boolean = false;
  amenidadeId: string | null = null;

  constructor(private formBuilder: FormBuilder, private amenidadeService: AmenidadeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.amenidadeForm = this.formBuilder.group({
      nome: ['', Validators.required]
    });

    this.amenidadeId = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.amenidadeId !== null;

    if (this.isEdit) {
      // Atualizando tipo de quarto
      this.route.data.subscribe(data => {
        const amenidade: Amenidade = data['amenidade'];
        this.amenidadeForm.patchValue({
          nome: amenidade.nome
        });
      });
    }
  }

  onSubmit(): void {
    if (this.amenidadeForm.valid) {
      const amenidade = this.amenidadeForm.value;
      if (this.isEdit) {
        // Atualizar tipo de quarto
        this.amenidadeService.update(this.amenidadeId!, amenidade).subscribe(
          (res) => {
            console.log('Amenidade atualizada com sucesso:', res);
            this.router.navigateByUrl('amenidade/list');
          },
          (err) => {
            console.error('Erro ao atualizar amenidade:', err);
          }
        );
      } else {
        // Criar novo tipo de quarto
        this.amenidadeService.create(amenidade).subscribe(
          (res) => {
            console.log('Amenidade criado com sucesso:', res);
            this.router.navigateByUrl('amenidade/list');
          },
          (err) => {
            console.error('Erro ao criar amenidade:', err);
          }
        );
      }
    } else {
      console.warn('Formulário inválido. Verifique os campos.');
    }
  }
}
