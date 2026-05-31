export interface Professor {
    id?: number;
    nome: string;
    matricula: string;
    disciplina: string;
    isInativo: boolean;
    observacoes?: string;
}