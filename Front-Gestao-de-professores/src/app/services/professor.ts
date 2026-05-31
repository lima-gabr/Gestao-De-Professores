import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Professor } from '../models/professor.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
  //singleton
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/gerenciador/professores'

  constructor(private http: HttpClient) { }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl)
  }
  
  getProfessorePorId(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`)
  }
  salvarProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor)
  }

  deleteProfessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  alterarProfessor(professor: Professor, id: number): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, professor)
  }
}

