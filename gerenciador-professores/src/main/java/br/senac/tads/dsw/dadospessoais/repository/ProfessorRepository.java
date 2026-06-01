package br.senac.tads.dsw.dadospessoais.repository;

import br.senac.tads.dsw.dadospessoais.entidade.ProfessorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<ProfessorEntity, Long> {
}
