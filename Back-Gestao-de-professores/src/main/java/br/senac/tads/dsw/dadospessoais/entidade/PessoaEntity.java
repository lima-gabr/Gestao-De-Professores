package br.senac.tads.dsw.dadospessoais.entidade;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_pessoas")
@Getter
@Setter
public class PessoaEntity {
    public PessoaEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 64)
    private String username;
    @Column(nullable = false, length = 100)
    private String nome;
    @Column(nullable = false, length = 100)
    private String email;
    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;
    @Column(length = 255)
    private String senha;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "tb_pessoas_conhecimentos", joinColumns = @JoinColumn(name = "pessoa_id"), inverseJoinColumns = @JoinColumn(name = "conhecimento_id") 
    )
    private Set<ConhecimentoEntity> conhecimentos = new HashSet<>();

}
