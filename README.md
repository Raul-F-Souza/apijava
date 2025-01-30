Aqui está o texto reformatado em Markdown para o README do seu projeto:

```markdown
# **Projeto Api em Java com Spring Boot**

CRUD (Create, Read, Update, Delete) em Java utilizando o framework Spring Boot e MySQL com banco de dados.

### **Passos para Criar o Projeto**

1. **Configurar o Projeto**
    - Use o [**Spring Initializr**](https://start.spring.io/) para gerar o projeto com as seguintes dependências:
        - **Spring Web**
        - **Spring Data JPA**
        - **MySQL Driver**
2. **Configurar o Banco de Dados**
    - Crie um banco de dados MySQL chamado **`escola`**.
    - Configure as propriedades do banco de dados no arquivo **`application.properties`**.
3. **Criar a Entidade Aluno**
    - Defina a classe **`Aluno`** com os campos necessários.
4. **Criar o Repositório**
    - Crie uma interface que estende **`JpaRepository`** para acessar os dados.
5. **Criar o Controlador**
    - Implemente um controlador REST para manipular as operações CRUD.

### **Código Completo**

#### **1. application.properties**

Configure as propriedades do banco de dados no arquivo **`src/main/resources/application.properties`**:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/escola?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

> Substitua `sua_senha` pela senha do seu banco de dados MySQL.

#### **2. Entidade Aluno**

Crie a classe **`Aluno`** em **`src/main/java/com/example/demo/model/Aluno.java`**:

```java
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer idade;

    @Column(nullable = false, unique = true)
    private String email;

    // Getters e Setters
}
```

#### **3. Repositório**

Crie a interface **`AlunoRepository`** em **`src/main/java/com/example/demo/repository/AlunoRepository.java`**:

```java
package com.example.demo.repository;

import com.example.demo.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
```

#### **4. Controlador**

Crie o controlador **`AlunoController`** em **`src/main/java/com/example/demo/controller/AlunoController.java`**:

```java
package com.example.demo.controller;

import com.example.demo.model.Aluno;
import com.example.demo.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    // Listar todos os alunos
    @GetMapping
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }

    // Buscar aluno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarAlunoPorId(@PathVariable Long id) {
        Optional<Aluno> aluno = alunoRepository.findById(id);
        return aluno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Criar novo aluno
    @PostMapping
    public Aluno criarAluno(@RequestBody Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    // Atualizar aluno existente
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno alunoAtualizado) {
        return alunoRepository.findById(id).map(aluno -> {
            aluno.setNome(alunoAtualizado.getNome());
            aluno.setIdade(alunoAtualizado.getIdade());
            aluno.setEmail(alunoAtualizado.getEmail());
            alunoRepository.save(aluno);
            return ResponseEntity.ok(aluno);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Deletar aluno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Long id) {
        return alunoRepository.findById(id).map(aluno -> {
            alunoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
```

#### **5. Testando a Aplicação**

- Inicie a aplicação executando a classe principal do Spring Boot.
- Use ferramentas como Postman ou cURL para testar os endpoints REST:

| **Método HTTP** | **URL**            | **Descrição**            |
|-----------------|--------------------|--------------------------|
| **GET**         | `/api/alunos`      | Lista todos os alunos    |
| **GET**         | `/api/alunos/{id}` | Busca aluno por ID       |
| **POST**        | `/api/alunos`      | Cria um novo aluno       |
| **PUT**         | `/api/alunos/{id}` | Atualiza um aluno existente |
| **DELETE**      | `/api/alunos/{id}` | Deleta um aluno          |

#### **Exemplo de JSON para POST/PUT**

Para criar ou atualizar um aluno, envie um JSON no corpo da requisição:

```json
{
  "nome": "João Silva",
  "idade": 20,
  "email": "joao.silva@example.com"
}
```

### **Frontend (Interface de Usuário)**

#### **Estrutura do Projeto Frontend**

Você pode criar uma interface de usuário simples usando HTML e CSS para interagir com a API.

#### **1. Arquivo `index.html`**

Crie o arquivo **`index.html`** em **`src/main/resources/static/index.html`**:

```html
<!-- Código HTML para a interface de gerenciamento de alunos -->
```

#### **2. Arquivo `style.css`**

Crie o arquivo **`style.css`** em **`src/main/resources/static/style.css`**:

```css
/* Estilos CSS para a interface */
```

### **Como Funciona**

1. **Carregar Alunos**: Quando a página é carregada, a função **`carregarAlunos()`** busca todos os alunos da API e preenche a tabela.
2. **Adicionar Aluno**: O formulário envia os dados para o endpoint **`/api/alunos`** via POST.
3. **Editar Aluno**: Ao clicar no botão "Editar", os dados do aluno são preenchidos no formulário. Ao salvar, o aluno é atualizado via PUT.
4. **Excluir Aluno**: Ao clicar no botão "Excluir", o aluno é removido via DELETE.

### **Executando a Aplicação**

1. Certifique-se de que o backend Spring Boot está rodando.
2. Acesse **`http://localhost:8080/index.html`** no navegador.
3. Interaja com a interface para gerenciar os alunos.
```

Com isso, o README está pronto e organizado para o seu projeto! Caso precise de mais alguma modificação ou adição, é só me avisar!