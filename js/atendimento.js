// Funções auxiliares para exibir/limpar mensagens de formulário
function showFormMessage(messageId, message, isError = true) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = isError ? '#dc3545' : '#2e7d32'; // Vermelho para erro, Verde para sucesso
        messageElement.style.display = 'block'; // Garante que esteja visível
    }
}

function clearFormMessage(messageId) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.textContent = '';
        messageElement.style.display = 'none'; // Esconde a mensagem
    }
}

function handleCadastrarAtendimento(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    clearFormMessage('atendimentoFormMessage'); // Limpa qualquer mensagem anterior

    // Obtenção dos valores dos campos
    const formaAtendimento = document.getElementById('formaAtendimento').value;
    const usuario = document.getElementById('usuario').value;
    const ativo = document.getElementById('ativo').value;
    const respostaAtendimento = document.getElementById('respostaAtendimento').value.trim();
    const dataRetorno = document.getElementById('dataRetorno').value; // NOVO CAMPO

    let hasError = false;

    // Validação dos campos
    if (!formaAtendimento) {
        showFormMessage('atendimentoFormMessage', 'Por favor, selecione uma Forma de Atendimento.');
        hasError = true;
    } else if (!usuario) {
        showFormMessage('atendimentoFormMessage', 'Por favor, selecione um Usuário.');
        hasError = true;
    } else if (!ativo) {
        showFormMessage('atendimentoFormMessage', 'Por favor, selecione se o atendimento está Ativo.');
        hasError = true;
    } else if (!respostaAtendimento) {
        showFormMessage('atendimentoFormMessage', 'Por favor, descreva a Resposta do Atendimento.');
        hasError = true;
    } else if (!dataRetorno) { // Validação do novo campo
        showFormMessage('atendimentoFormMessage', 'Por favor, selecione uma Data para Retorno.');
        hasError = true;
    }

    if (hasError) {
        return; // Interrompe se houver erros
    }

    // Gerar ID do Cliente (sequencial)
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    const nextId = (atendimentos.length > 0 ? Math.max(...atendimentos.map(a => a.id)) + 1 : 1);

    // Criar objeto do novo atendimento
    const novoAtendimento = {
        id: nextId, // ID único
        formaAtendimento: formaAtendimento,
        usuario: usuario,
        ativo: ativo,
        respostaAtendimento: respostaAtendimento,
        dataRetorno: dataRetorno // Salva a data
    };

    // Adicionar novo atendimento ao array e salvar no localStorage
    atendimentos.push(novoAtendimento);
    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));

    showFormMessage('atendimentoFormMessage', 'Atendimento cadastrado com sucesso!', false); // Mensagem de sucesso
    
    // Limpar o formulário após o cadastro
    event.target.reset(); // Limpa todos os campos do formulário
}

function handleVoltar() {
    // Ao clicar em "Voltar", deve ir para a lista de atendimentos
    window.location.href = 'lista-atendimentos.html';
}