document.addEventListener('DOMContentLoaded', () => {
    loadAtendimentosList();
});

function loadAtendimentosList() {
    const atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    const atendimentosListDiv = document.getElementById('atendimentosList');
    const noAtendimentosMessage = document.getElementById('noAtendimentosMessage');

    // Limpa a lista existente antes de renderizar
    atendimentosListDiv.innerHTML = ''; 

    if (atendimentos.length === 0) {
        noAtendimentosMessage.style.display = 'block'; // Mostra a mensagem
        return;
    } else {
        noAtendimentosMessage.style.display = 'none'; // Esconde a mensagem
    }

    atendimentos.forEach(atendimento => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('atendimento-item');
        itemDiv.dataset.id = atendimento.id; // Armazena o ID para exclusão/edição

        itemDiv.innerHTML = `
            <div class="atendimento-info">
                <strong>ID do Cliente:</strong> ${atendimento.id}
            </div>
            <div class="atendimento-info">
                <strong>Formato do Atendimento:</strong> ${atendimento.formaAtendimento}
            </div>
            <div class="atendimento-info">
                <strong>Usuário que cadastrou:</strong> ${atendimento.usuario}
            </div>
            <div class="atendimento-info">
                <strong>Ativo:</strong> ${atendimento.ativo}
            </div>
            <div class="atendimento-info">
                <strong>Resposta:</strong> ${atendimento.respostaAtendimento}
            </div>
            <div class="atendimento-info">
                <strong>Data para Retorno:</strong> ${atendimento.dataRetorno}
            </div>
            <div class="atendimento-actions">
                <button class="btn-item-action btn-editar" onclick="editarAtendimento(${atendimento.id})">Editar</button>
                <button class="btn-item-action btn-excluir" onclick="excluirAtendimento(${atendimento.id})">Excluir</button>
            </div>
        `;
        atendimentosListDiv.appendChild(itemDiv);
    });
}

function editarAtendimento(id) {
    alert(`Editar atendimento com ID: ${id}. Em um sistema real, você seria redirecionado para o formulário de cadastro preenchido.`);
    // Em um sistema real, você passaria o ID para a página de cadastro
    // window.location.href = `cadastrar-atendimento.html?id=${id}`;
}

function excluirAtendimento(id) {
    if (confirm(`Tem certeza que deseja excluir o atendimento com ID: ${id}?`)) {
        let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
        atendimentos = atendimentos.filter(atendimento => atendimento.id !== id);
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        loadAtendimentosList(); // Recarrega a lista após a exclusão
        alert(`Atendimento com ID ${id} excluído com sucesso.`);
    }
}