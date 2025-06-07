function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Simulação de login
  alert(`Login realizado com:\nEmail: ${email}`);
}
