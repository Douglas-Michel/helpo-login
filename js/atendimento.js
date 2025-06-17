document.addEventListener("DOMContentLoaded", () => {
  preencherUsuariosSelect();
  // Verifica se há um ID na URL para saber se é modo de edição
  const urlParams = new URLSearchParams(window.location.search);
  const atendimentoId = urlParams.get("id");

  if (atendimentoId) {
    loadAtendimentoForEdit(parseInt(atendimentoId));
  }
});

// Funções auxiliares para exibir/limpar mensagens de formulário
function showFormMessage(messageId, message, isError = true) {
  const messageElement = document.getElementById(messageId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.style.color = isError ? "#dc3545" : "#2e7d32";
    messageElement.style.display = "block";
  }
}

function clearFormMessage(messageId) {
  const messageElement = document.getElementById(messageId);
  if (messageElement) {
    messageElement.textContent = "";
    messageElement.style.display = "none";
  }
}

function loadAtendimentoForEdit(id) {
  const atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];
  const atendimento = atendimentos.find((a) => a.id === id);

  if (atendimento) {
    // Preenche os campos do formulário
    document.getElementById("formaAtendimento").value =
      atendimento.formaAtendimento;
    document.getElementById("usuario").value = atendimento.usuario;
    document.getElementById("ativo").value = atendimento.ativo;
    document.getElementById("respostaAtendimento").value =
      atendimento.respostaAtendimento;
    document.getElementById("dataRetorno").value = atendimento.dataRetorno;

    // Muda o título da página e do formulário (feedback visual)
    document.title = "Helpo - Editar Atendimento";
    document.querySelector(".left-section h1").textContent =
      "Editar Atendimento";
    document.querySelector(".left-section p").textContent =
      "Modifique as informações do atendimento existente.";

    // Muda o texto do botão de submit e adiciona um atributo para identificar o modo de edição
    const submitButton = document.querySelector(".btn-cadastrar");
    submitButton.textContent = "Salvar Alterações";
    submitButton.dataset.editingId = id; // Armazena o ID do atendimento sendo editado
  } else {
    showFormMessage(
      "atendimentoFormMessage",
      "Erro: Atendimento não encontrado para edição.",
      true
    );
    setTimeout(() => {
      window.location.href = "lista-atendimentos.html";
    }, 1500);
  }
}

function handleCadastrarAtendimento(event) {
  event.preventDefault();

  clearFormMessage("atendimentoFormMessage");

  const formaAtendimento = document.getElementById("formaAtendimento").value;
  const usuario = document.getElementById("usuario").value;
  const ativo = document.getElementById("ativo").value;
  const respostaAtendimento = document
    .getElementById("respostaAtendimento")
    .value.trim();
  const dataRetorno = document.getElementById("dataRetorno").value;

  let hasError = false;

  // Validação dos campos
  if (!formaAtendimento) {
    showFormMessage(
      "atendimentoFormMessage",
      "Por favor, selecione uma Forma de Atendimento."
    );
    hasError = true;
  } else if (!usuario) {
    showFormMessage(
      "atendimentoFormMessage",
      "Por favor, selecione um Usuário."
    );
    hasError = true;
  } else if (!ativo) {
    showFormMessage(
      "atendimentoFormMessage",
      "Por favor, selecione se o atendimento está Ativo."
    );
    hasError = true;
  } else if (!respostaAtendimento) {
    showFormMessage(
      "atendimentoFormMessage",
      "Por favor, descreva a Resposta do Atendimento."
    );
    hasError = true;
  } else if (!dataRetorno) {
    showFormMessage(
      "atendimentoFormMessage",
      "Por favor, selecione uma Data para Retorno."
    );
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const submitButton = event.submitter;
  const editingId = submitButton.dataset.editingId
    ? parseInt(submitButton.dataset.editingId)
    : null;

  let atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];

  if (editingId) {
    // MODO EDIÇÃO: Atualiza o atendimento existente
    const index = atendimentos.findIndex((a) => a.id === editingId);
    if (index !== -1) {
      atendimentos[index] = {
        id: editingId,
        formaAtendimento: formaAtendimento,
        usuario: usuario,
        ativo: ativo,
        respostaAtendimento: respostaAtendimento,
        dataRetorno: dataRetorno,
      };
      localStorage.setItem("atendimentos", JSON.stringify(atendimentos));
      showFormMessage(
        "atendimentoFormMessage",
        "Atendimento atualizado com sucesso!",
        false
      );
      // Pequeno delay antes de redirecionar para dar tempo do localStorage salvar
      setTimeout(() => {
        window.location.href = "lista-atendimentos.html";
      }, 500);
    } else {
      showFormMessage(
        "atendimentoFormMessage",
        "Erro: Atendimento a ser editado não encontrado.",
        true
      );
    }
  } else {
    // MODO CADASTRO: Cria um novo atendimento
    const nextId =
      atendimentos.length > 0
        ? Math.max(...atendimentos.map((a) => a.id)) + 1
        : 1;
    const novoAtendimento = {
      id: nextId,
      formaAtendimento: formaAtendimento,
      usuario: usuario,
      ativo: ativo,
      respostaAtendimento: respostaAtendimento,
      dataRetorno: dataRetorno,
    };
    atendimentos.push(novoAtendimento);
    localStorage.setItem("atendimentos", JSON.stringify(atendimentos));

    showFormMessage(
      "atendimentoFormMessage",
      "Atendimento cadastrado com sucesso!",
      false
    );

    // Limpar o formulário após o cadastro
    event.target.reset();
    // Opcional: Redirecionar após o cadastro se desejar
    // setTimeout(() => {
    //     window.location.href = 'lista-atendimentos.html';
    // }, 500);
  }
}

function handleVoltar() {
  window.location.href = "lista-atendimentos.html";
}

function preencherUsuariosSelect() {
  const selectUsuario = document.getElementById("usuario");
  if (selectUsuario) {
    const funcionarios =
      JSON.parse(localStorage.getItem("registeredEmployees")) || [];
    selectUsuario.innerHTML = '<option value="">Selecione o usuário</option>';
    funcionarios.forEach((func) => {
      if (func.nome) {
        const opt = document.createElement("option");
        opt.value = func.nome;
        opt.textContent = func.nome;
        selectUsuario.appendChild(opt);
      }
    });
  }
}
