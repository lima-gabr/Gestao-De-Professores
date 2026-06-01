package br.senac.tads.dsw.dadospessoais.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "professores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String matricula;

    @Column(nullable = false)
    private String disciplina;

    @Column(nullable = false)
    private boolean ativo = true;

    @Column(columnDefinition = "TEXT")
    private String observacoes;
}
