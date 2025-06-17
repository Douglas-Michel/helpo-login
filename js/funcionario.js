document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um ID na URL para saber se é modo de edição
  const urlParams = new URLSearchParams(window.location.search);
  const funcionarioId = urlParams.get("id");

  if (funcionarioId) {
    loadFuncionarioForEdit(parseInt(funcionarioId));
  }
});

// Funções auxiliares para exibir/limpar mensagens de formulário (local para este script)
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

function loadFuncionarioForEdit(id) {
  const funcionarios =
    JSON.parse(localStorage.getItem("registeredEmployees")) || [];
  const funcionario = funcionarios.find((f) => f.id === id);

  if (funcionario) {
    // Preenche os campos do formulário
    document.getElementById("nomeFuncionario").value = funcionario.nome;
    document.getElementById("emailFuncionario").value = funcionario.email;
    document.getElementById("posicaoFuncionario").value = funcionario.posicao;
    document.getElementById("celularFuncionario").value = funcionario.celular;
    // Senha e confirmar senha não devem ser preenchidas por segurança
    // document.getElementById('senhaFuncionario').value = funcionario.password;
    // document.getElementById('confirmarSenhaFuncionario').value = funcionario.password;
    document.getElementById("ativoFuncionario").value = funcionario.ativo;

    // Muda o título da página e do formulário
    document.title = "Helpo - Editar Funcionário";
    document.querySelector(".left-section h1").textContent =
      "Editar Funcionário";
    document.querySelector(".left-section p").textContent =
      "Modifique os dados do funcionário existente.";

    // Muda o texto do botão de submit e armazena o ID
    const submitButton = document.querySelector(".btn-cadastrar");
    submitButton.textContent = "Salvar Alterações";
    submitButton.dataset.editingId = id; // Armazena o ID para identificar no submit
  } else {
    showFormMessage(
      "funcionarioFormMessage",
      "Erro: Funcionário não encontrado para edição.",
      true
    );
    setTimeout(() => {
      window.location.href = "lista-funcionarios.html";
    }, 1500);
  }
}

function handleFuncionario(event) {
  event.preventDefault();

  clearFormMessage("funcionarioFormMessage");

  const nome = document.getElementById("nomeFuncionario").value.trim();
  const email = document.getElementById("emailFuncionario").value.trim();
  const posicao = document.getElementById("posicaoFuncionario").value.trim();
  const celular = document.getElementById("celularFuncionario").value.trim();
  const password = document.getElementById("senhaFuncionario").value;
  const confirmPassword = document.getElementById(
    "confirmarSenhaFuncionario"
  ).value;
  const ativo = document.getElementById("ativoFuncionario").value;

  let hasError = false;

  // 1. Validação de Campos Vazios
  if (
    !nome ||
    !email ||
    !posicao ||
    !celular ||
    !password ||
    !confirmPassword ||
    !ativo
  ) {
    showFormMessage(
      "funcionarioFormMessage",
      "Por favor, preencha todos os campos obrigatórios."
    );
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // 2. Validação de Formato de E-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage(
      "funcionarioFormMessage",
      "Por favor, insira um endereço de e-mail válido."
    );
    hasError = true;
  }

  // 3. Validação de Senhas Coincidentes (apenas para o modo de cadastro)
  const submitButton = event.submitter;
  const editingId = submitButton.dataset.editingId
    ? parseInt(submitButton.dataset.editingId)
    : null;

  if (!editingId && password !== confirmPassword) {
    // Apenas valida correspondência se for um NOVO cadastro
    showFormMessage("funcionarioFormMessage", "As senhas não coincidem.");
    hasError = true;
  }

  // 4. Validação de Força da Senha (apenas para o modo de cadastro ou se a senha for alterada)
  const passwordMinLength = 6;
  const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!editingId || (editingId && password)) {
    // Se é novo ou editando e senha foi digitada
    if (password.length > 0 && password.length < passwordMinLength) {
      // Permite que a senha seja vazia na edição se não quiser mudar
      showFormMessage(
        "funcionarioFormMessage",
        `A senha deve ter no mínimo ${passwordMinLength} caracteres.`
      );
      hasError = true;
    } else if (password.length > 0 && !passwordStrongRegex.test(password)) {
      showFormMessage(
        "funcionarioFormMessage",
        "A senha deve conter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número."
      );
      hasError = true;
    }
  }

  if (hasError) {
    return;
  }

  let funcionarios =
    JSON.parse(localStorage.getItem("registeredEmployees")) || [];

  // 5. Validação de E-mail já Cadastrado (apenas para novos cadastros ou se o email mudar na edição)
  const emailExists = funcionarios.some(
    (f) => f.email === email && f.id !== editingId
  );
  if (emailExists) {
    showFormMessage(
      "funcionarioFormMessage",
      "Este e-mail já está cadastrado para outro funcionário."
    );
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // --- Processamento de Cadastro ou Edição ---
  if (editingId) {
    // MODO EDIÇÃO: Atualiza o funcionário existente
    const index = funcionarios.findIndex((f) => f.id === editingId);
    if (index !== -1) {
      funcionarios[index] = {
        id: editingId, // Mantém o ID
        nome: nome,
        email: email,
        posicao: posicao,
        celular: celular,
        // A senha só é atualizada se uma nova foi digitada, caso contrário, mantém a antiga
        password: password || funcionarios[index].password,
        ativo: ativo,
      };
      localStorage.setItem("registeredEmployees", JSON.stringify(funcionarios));
      showFormMessage(
        "funcionarioFormMessage",
        "Dados do funcionário atualizados com sucesso!",
        false
      );
      setTimeout(() => {
        window.location.href = "lista-funcionarios.html";
      }, 1000);
    } else {
      showFormMessage(
        "funcionarioFormMessage",
        "Erro: Funcionário a ser editado não encontrado.",
        true
      );
    }
  } else {
    // MODO CADASTRO: Cria um novo funcionário
    const nextId =
      funcionarios.length > 0
        ? Math.max(...funcionarios.map((f) => f.id)) + 1
        : 1;
    const novoFuncionario = {
      id: nextId,
      nome: nome,
      email: email,
      posicao: posicao,
      celular: celular,
      password: password, // Senha definida no cadastro
      ativo: ativo,
    };
    funcionarios.push(novoFuncionario);
    localStorage.setItem("registeredEmployees", JSON.stringify(funcionarios));

    showFormMessage(
      "funcionarioFormMessage",
      "Funcionário cadastrado com sucesso!",
      false
    );

    // Limpar o formulário após o cadastro
    event.target.reset();
    // Opcional: redirecionar após cadastro
    // setTimeout(() => {
    //     window.location.href = 'lista-funcionarios.html';
    // }, 1000);
  }
}
