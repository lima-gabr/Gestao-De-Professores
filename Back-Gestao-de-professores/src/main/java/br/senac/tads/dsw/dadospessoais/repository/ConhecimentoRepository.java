package br.senac.tads.dsw.dadospessoais.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.tads.dsw.dadospessoais.entidade.ConhecimentoEntity;

public interface ConhecimentoRepository extends JpaRepository<ConhecimentoEntity, Long>{
    Optional<ConhecimentoEntity> findByNomeIgnoreCase(String nome);
}
