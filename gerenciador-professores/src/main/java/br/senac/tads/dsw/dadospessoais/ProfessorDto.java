package br.senac.tads.dsw.dadospessoais;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfessorDto(

        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 5, message = "Nome deve ter no mínimo 5 caracteres")
        String nome,

        @NotBlank(message = "Matrícula é obrigatória")
        String matricula,

        @NotBlank(message = "Disciplina é obrigatória")
        @Size(min = 5, message = "Disciplina deve ter no mínimo 5 caracteres")
        String disciplina,

        boolean ativo,

        String observacoes

) {
}
