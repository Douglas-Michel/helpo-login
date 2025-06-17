function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  let erro = document.getElementById("erro-login");
  if (erro) erro.remove();

  const form = document.querySelector(".login-form");
  const btn = form.querySelector('button[type="submit"]');

  if (!email || !senha) {
    erro = document.createElement("div");
    erro.id = "erro-login";
    erro.style.color = "red";
    erro.style.marginBottom = "10px";
    erro.textContent = "Preencha todos os campos.";
    form.insertBefore(erro, btn);
    return;
  }

  if (!validarEmail(email)) {
    erro = document.createElement("div");
    erro.id = "erro-login";
    erro.style.color = "red";
    erro.style.marginBottom = "10px";
    erro.textContent = "Digite um e-mail válido.";
    form.insertBefore(erro, btn);
    return;
  }

  // --- NOVIDADE: Buscar o funcionário no array registeredEmployees ---
  const funcionarios = JSON.parse(localStorage.getItem("registeredEmployees")) || [];
  const funcionarioEncontrado = funcionarios.find(
    (f) => f.email === email && f.password === senha
  );

  if (funcionarioEncontrado) {
    if (funcionarioEncontrado.ativo === "Sim") {
      // Login bem-sucedido e ativo
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUserEmail", funcionarioEncontrado.email); // Armazena o e-mail do usuário logado
      window.location.href = "home.html"; // Redireciona para a home
    } else {
      // Funcionário encontrado, mas não está ativo
      erro = document.createElement("div");
      erro.id = "erro-login";
      erro.style.color = "red";
      erro.style.marginBottom = "10px";
      erro.textContent = "Sua conta está inativa. Entre em contato com o administrador.";
      form.insertBefore(erro, btn);
    }
  } else {
    // E-mail ou senha não encontrados na lista de funcionários
    erro = document.createElement("div");
    erro.id = "erro-login";
    erro.style.color = "red";
    erro.style.marginBottom = "10px";
    erro.textContent = "E-mail ou senha incorretos.";
    form.insertBefore(erro, btn);
  }
}