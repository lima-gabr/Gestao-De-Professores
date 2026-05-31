import { Routes } from '@angular/router';
import { ProfessorList } from './pages/professor-list/professor-list';
import { ProfessorForm } from './pages/professor-form/professor-form';
export const routes: Routes = [
    {path:'', component: ProfessorList},
    {path:'cadastrar/professor', component: ProfessorForm},
    {path:'alterar/professor/:id', component: ProfessorForm}
];
