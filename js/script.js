function login() {
  const emailInput = document.getElementById('email').value;
  const senhaInput = document.getElementById('senha').value;

  if (!emailInput || !senhaInput) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Recupera os dados do usuário cadastrado do localStorage
  const registeredEmail = localStorage.getItem('registeredUserEmail');
  const registeredPassword = localStorage.getItem('registeredUserPassword');

  if (emailInput === registeredEmail && senhaInput === registeredPassword) {
    alert(`Login bem-sucedido! Bem-vindo(a), ${localStorage.getItem('registeredUserName') || emailInput}!`);
    // Aqui você pode redirecionar para a página principal do usuário
    // window.location.href = 'dashboard.html'; 
  } else {
    alert('E-mail ou senha inválidos. Verifique suas credenciais.');
  }
}