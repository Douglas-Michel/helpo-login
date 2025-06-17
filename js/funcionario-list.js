// Variável para armazenar o ID do funcionário a ser excluído (para o modal)
let currentDeleteFuncionarioId = null; 

document.addEventListener('DOMContentLoaded', () => {
    loadFuncionariosList();

    // Event Listeners para os botões do modal de exclusão (reutilizado)
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const deleteModal = document.getElementById('deleteModal');

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (currentDeleteFuncionarioId !== null) {
                performDeleteFuncionario(currentDeleteFuncionarioId); // Chama a exclusão real
            }
            hideDeleteModal(); // Esconde o modal
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            hideDeleteModal(); // Esconde o modal sem excluir
        });
    }

    if (deleteModal) {
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) { // Verifica se clicou no overlay, não no conteúdo
                hideDeleteModal();
            }
        });
    }
});

function showDeleteModal(id) {
    currentDeleteFuncionarioId = id; // Armazena o ID globalmente
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.classList.add('show'); // Adiciona a classe para mostrar
    }
}

function hideDeleteModal() {
    currentDeleteFuncionarioId = null; // Limpa o ID
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.classList.remove('show'); // Remove a classe para esconder
    }
}

function loadFuncionariosList() {
    const funcionarios = JSON.parse(localStorage.getItem('registeredEmployees')) || [];
    const funcionariosTableBody = document.getElementById('funcionariosTableBody');
    const noFuncionariosMessage = document.getElementById('noFuncionariosMessage');

    // Limpa o corpo da tabela antes de renderizar
    funcionariosTableBody.innerHTML = ''; 
    
    if (funcionarios.length === 0) {
        noFuncionariosMessage.style.display = 'block';
        return;
    } else {
        noFuncionariosMessage.style.display = 'none';
    }

    funcionarios.forEach(funcionario => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('table-row');
        rowDiv.dataset.id = funcionario.id; // Armazena o ID

        rowDiv.innerHTML = `
            <div>${funcionario.id}</div>
            <div>${funcionario.posicao}</div>
            <div>${funcionario.nome}</div>
            <div>${funcionario.email}</div>
            <div>${funcionario.celular}</div>
            <div>${funcionario.ativo}</div>
            <div class="employee-actions">
                <button class="btn-icon-action btn-editar" onclick="editarFuncionario(${funcionario.id})">
                    <img src="assets/img/edit-icon.svg" alt="Editar">
                </button>
                <button class="btn-icon-action btn-excluir" onclick="excluirFuncionario(${funcionario.id})">
                    <img src="assets/img/trash-icon.svg" alt="Excluir">
                </button>
            </div>
        `;
        funcionariosTableBody.appendChild(rowDiv);
    });
}

function editarFuncionario(id) {
    window.location.href = `cadastrar-funcionario.html?id=${id}`;
}

// Esta função APENAS EXIBE o modal de confirmação
function excluirFuncionario(idParaExcluir) {
    showDeleteModal(idParaExcluir); // Chama o modal, passando o ID
}

// Esta é a função que REALMENTE executa a exclusão após a confirmação do modal
function performDeleteFuncionario(idParaExcluir) {
    const idNum = parseInt(idParaExcluir);

    if (isNaN(idNum)) {
        console.error("ID inválido para exclusão:", idParaExcluir);
        alert("Erro ao excluir: ID do funcionário inválido.");
        return;
    }

    let funcionarios = JSON.parse(localStorage.getItem('registeredEmployees')) || [];
    
    // Filtra os funcionários, mantendo apenas aqueles cujo ID NÃO é o que queremos excluir
    const funcionariosAtualizados = funcionarios.filter(funcionario => funcionario.id !== idNum);

    if (funcionarios.length === funcionariosAtualizados.length) {
        console.warn(`Funcionário com ID ${idNum} não encontrado para exclusão.`);
        alert(`Funcionário com ID ${idNum} não encontrado. Nenhuma alteração foi feita.`);
    } else {
        localStorage.setItem('registeredEmployees', JSON.stringify(funcionariosAtualizados));
        alert(`Funcionário com ID ${idNum} excluído com sucesso.`);
    }
    
    // Pequeno atraso antes de recarregar a lista visível
    setTimeout(() => {
        loadFuncionariosList();
    }, 50); // 50 milissegundos é geralmente suficiente
}