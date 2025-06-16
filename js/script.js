function validarEmail(email) {
  // Regex simples para validar e-mail
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

  const registeredEmail = localStorage.getItem("registeredUserEmail");
  const registeredPassword = localStorage.getItem("registeredUserPassword");

  if (email === registeredEmail && senha === registeredPassword) {
    // Seta flag de login
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  } else {
    erro = document.createElement("div");
    erro.id = "erro-login";
    erro.style.color = "red";
    erro.style.marginBottom = "10px";
    erro.textContent = "E-mail ou senha incorretos.";
    form.insertBefore(erro, btn);
  }
}
