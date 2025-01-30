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
