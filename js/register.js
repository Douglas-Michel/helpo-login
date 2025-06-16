function handleRegister(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, digite novamente.');
        return;
    }

    // Armazenar os dados no localStorage (simulação de cadastro)
    localStorage.setItem('registeredUserEmail', email);
    localStorage.setItem('registeredUserPassword', password);
    localStorage.setItem('registeredUserName', fullName); // Opcional, para simular o nome

    alert('Cadastro realizado com sucesso! Você já pode fazer login.');

    // Redireciona para a página de login
    window.location.href = 'index.html'; 
}