import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professor-form',
  imports: [ReactiveFormsModule],
  templateUrl: './professor-form.html',
  styleUrl: './professor-form.css',
})
export class ProfessorForm implements OnInit {
  professorForm!: FormGroup;
  idProf: number | null = null;

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.professorForm = this.fb.group({
      nome: ['', { validators: [Validators.required, Validators.minLength(5)] }],
      matricula: ['', { validators: [Validators.required] }],
      disciplina: ['', { validators: [Validators.required, Validators.minLength(5)] }],
      isInativo: [false, { validators: [Validators.required] }],
      observacoes: ['']
    })

    const idProf = this.route.snapshot.paramMap.get("id");
    if (idProf) {
      this.idProf = Number(idProf);
      this.professorService.getProfessorePorId(this.idProf).subscribe({
        next:(professorDados) =>{
          this.professorForm.patchValue(professorDados);
        },
        error:(erro) => {
          alert("Não foi possível encontar o professor solicitado")
        }

      })
    }
  }

  salvar(): void {
    if (this.professorForm.invalid) {
      alert('Preencha os dados corretamente')
      return;
    }

    const dados = this.professorForm.value;
    if (this.idProf) {
      this.professorService.alterarProfessor(dados, this.idProf,).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (erro) => {
          alert("Não foi possível alterar o cadastro do professor")
        }
      })
    }
    else {
      this.professorService.salvarProfessor(dados).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
