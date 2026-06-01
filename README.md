# Gerenciador de Professores

Aplicação web para gerenciamento de professores desenvolvida com Spring Boot.

**Alunos:** Gabriel Lima e Débora Santos Silva  
**Turma:** TADS 3A Noturno — 2026  
**Disciplina:** Desenvolvimento de Sistemas Web  
**Uso de IA:** SIM — Claude AI utilizado para HTML e CSS

---

## Tecnologias

- Java 21
- Spring Boot 4.0.5
- Banco de dados H2 (em memória)
- HTML + CSS + JavaScript (Fetch API)

## Como executar

1. Abra a pasta `gerenciador-professores` na sua IDE
2. Execute a classe `DadosPessoaisApplication`
3. Acesse `http://localhost:8080`

## H2 Console

Acesse `http://localhost:8080/h2-console`

| Campo    | Valor                          |
|----------|-------------------------------|
| JDBC URL | `jdbc:h2:mem:dadospessoais`   |
| User     | `sa`                          |
| Password | *(vazio)*                     |

## Endpoints REST

| Método | Rota                | Descrição              |
|--------|---------------------|------------------------|
| GET    | `/professores`      | Lista todos            |
| GET    | `/professores/{id}` | Busca por ID           |
| POST   | `/professores`      | Cadastra novo          |
| PUT    | `/professores/{id}` | Altera existente       |
| DELETE | `/professores/{id}` | Remove                 |

## Funcionalidades

- Listagem de professores com indicação visual de cadastros desativados
- Cadastro com validação de campos obrigatórios (nome e disciplina com mínimo de 5 caracteres)
- Alteração com formulário pré-preenchido
- Exclusão com confirmação
- Mensagens de sucesso e erro em tela
