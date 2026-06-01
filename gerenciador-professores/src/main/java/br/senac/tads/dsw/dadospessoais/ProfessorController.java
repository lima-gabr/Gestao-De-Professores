package br.senac.tads.dsw.dadospessoais;

import br.senac.tads.dsw.dadospessoais.entidade.ProfessorEntity;
import br.senac.tads.dsw.dadospessoais.repository.ProfessorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/professores")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<ProfessorEntity> listar() {
        return professorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorEntity> buscarPorId(@PathVariable Long id) {
        return professorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProfessorEntity> incluir(@RequestBody @Valid ProfessorDto dto) {
        ProfessorEntity entity = new ProfessorEntity();
        entity.setNome(dto.nome());
        entity.setMatricula(dto.matricula());
        entity.setDisciplina(dto.disciplina());
        entity.setAtivo(dto.ativo());
        entity.setObservacoes(dto.observacoes());
        ProfessorEntity salvo = professorRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorEntity> alterar(@PathVariable Long id, @RequestBody @Valid ProfessorDto dto) {
        return professorRepository.findById(id)
                .map(entity -> {
                    entity.setNome(dto.nome());
                    entity.setMatricula(dto.matricula());
                    entity.setDisciplina(dto.disciplina());
                    entity.setAtivo(dto.ativo());
                    entity.setObservacoes(dto.observacoes());
                    return ResponseEntity.ok(professorRepository.save(entity));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!professorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        professorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError erro : ex.getBindingResult().getFieldErrors()) {
            erros.put(erro.getField(), erro.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(erros);
    }
}
