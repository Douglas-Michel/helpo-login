function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleRegister(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const form = document.querySelector(".register-form");
  const btn = form.querySelector('button[type="submit"]');

  // Remove mensagem de erro anterior, se houver
  let erro = document.getElementById("erro-register");
  if (erro) erro.remove();

  // Cria o elemento de erro
  erro = document.createElement("div");
  erro.id = "erro-register";
  erro.style.color = "red";
  erro.style.marginBottom = "10px";

  // Validações
  if (!fullName || !email || !password || !confirmPassword) {
    erro.textContent = "Preencha todos os campos.";
    form.insertBefore(erro, btn);
    return;
  }

  if (!validarEmail(email)) {
    erro.textContent = "Digite um e-mail válido.";
    form.insertBefore(erro, btn);
    return;
  }

  if (password.length < 6) {
    erro.textContent = "A senha deve ter no mínimo 6 caracteres.";
    form.insertBefore(erro, btn);
    return;
  }

  if (password !== confirmPassword) {
    erro.textContent = "As senhas não coincidem.";
    form.insertBefore(erro, btn);
    return;
  }

  // Verifica se o e-mail já existe na lista de funcionários
  let funcionarios = JSON.parse(localStorage.getItem("registeredEmployees")) || [];
  const emailExists = funcionarios.some(f => f.email === email);

  if (emailExists) {
    erro.textContent = "Já existe um cadastro com este e-mail.";
    form.insertBefore(erro, btn);
    return;
  }

  // Cria um novo funcionário e adiciona à lista
  const nextId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
  const novoFuncionario = {
    id: nextId,
    nome: fullName,
    email: email,
    posicao: "",
    celular: "",
    password: password,
    ativo: "Sim" // ALTERADO: Agora o padrão é "Sim"
  };

  funcionarios.push(novoFuncionario);
  localStorage.setItem("registeredEmployees", JSON.stringify(funcionarios));

  erro.style.color = "green";
  erro.textContent = "Conta criada com sucesso! Redirecionando...";
  form.insertBefore(erro, btn);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}