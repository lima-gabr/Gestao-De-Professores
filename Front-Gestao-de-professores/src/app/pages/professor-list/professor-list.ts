import { Component, OnInit } from '@angular/core';
import { Professor } from '../../models/professor.model';
import { ProfessorService } from '../../services/professor';
import { error } from 'node:console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  imports: [RouterLink],
  templateUrl: './professor-list.html',
  styleUrl: './professor-list.css',
})
export class ProfessorList implements OnInit {
  professores: Professor[] = [];
  constructor(private professorService: ProfessorService) { 
  }
  //injecao de depend estilo typescript

  modal = false;
  professorId!: number;
  ngOnInit(): void {
    this.carregarProfessores();
  }

  mostrarModal(id: number): void {
    if (id != 0) {
      this.modal = true;
      this.professorId = id
    }
  }

  carregarProfessores(): void {
    this.professorService.getProfessores().subscribe(dados => {
      this.professores = dados;
    });
  }

  fecharModal(): void {
    this.modal = false;
  }

  confirmarAcao(): void {
    this.professorService.deleteProfessor(this.professorId).subscribe({
      next: () => {
        this.carregarProfessores();
        this.fecharModal();
        alert('Professor excluído com sucesso!');
      },
      error: (erro) => {
        alert('Ocorreu um erro ao excluir o professor com ID ' + this.professorId);
        this.fecharModal();
      }
    });
  }
}
