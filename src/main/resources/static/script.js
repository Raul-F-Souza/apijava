const apiUrl = "http://localhost:8080/api/alunos";

// Função para carregar todos os alunos
async function carregarAlunos() {
    const response = await fetch(apiUrl);
    const alunos = await response.json();
    const tbody = document.querySelector("#alunosTable tbody");
    tbody.innerHTML = ""; // Limpa a tabela

    alunos.forEach(aluno => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.email}</td>
            <td>
                <button onclick="editarAluno(${aluno.id})">Editar</button>
                <button onclick="excluirAluno(${aluno.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para salvar ou atualizar aluno
document.getElementById("alunoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const aluno = {
        nome: document.getElementById("nome").value,
        idade: parseInt(document.getElementById("idade").value),
        email: document.getElementById("email").value
    };

    const alunoId = document.getElementById("alunoId").value;

    if (alunoId) {
        // Atualizar aluno existente
        await fetch(`${apiUrl}/${alunoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    } else {
        // Criar novo aluno
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    }

    limparFormulario();
    carregarAlunos();
});

// Função para editar aluno
async function editarAluno(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const aluno = await response.json();

    document.getElementById("alunoId").value = aluno.id;
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("email").value = aluno.email;
}

// Função para excluir aluno
async function excluirAluno(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    carregarAlunos();
}

// Função para limpar formulário
function limparFormulario() {
    document.getElementById("alunoId").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("email").value = "";
}

// Carregar alunos ao iniciar a página
carregarAlunos();