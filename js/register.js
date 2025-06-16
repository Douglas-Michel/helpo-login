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

  // Verifica se já existe cadastro com o mesmo e-mail
  const registeredEmail = localStorage.getItem("registeredUserEmail");
  if (registeredEmail && registeredEmail === email) {
    erro.textContent = "Já existe um cadastro com este e-mail.";
    form.insertBefore(erro, btn);
    return;
  }

  // Armazenar os dados no localStorage (simulação de cadastro)
  localStorage.setItem("registeredUserEmail", email);
  localStorage.setItem("registeredUserPassword", password);
  localStorage.setItem("registeredUserName", fullName);

  erro.style.color = "green";
  erro.textContent = "Cadastro realizado com sucesso! Redirecionando...";
  form.insertBefore(erro, btn);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}
