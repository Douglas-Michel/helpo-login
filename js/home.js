document.addEventListener("DOMContentLoaded", () => {
  // --- NOVIDADE: Proteção da página e verificação de status ativo ---
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  if (isLoggedIn !== "true" || !loggedInUserEmail) {
    // Se não estiver logado ou não houver e-mail de usuário logado
    window.location.href = "index.html"; // Redireciona para a página de login
    return;
  }

  // Verificar status "Ativo" do usuário logado periodicamente (a cada 5 segundos)
  setInterval(() => {
    const funcionarios = JSON.parse(localStorage.getItem("registeredEmployees")) || [];
    const currentUser = funcionarios.find(f => f.email === loggedInUserEmail);

    if (!currentUser || currentUser.ativo !== "Sim") {
      // Se o usuário não for encontrado ou estiver inativo, força o logout
      alert("Sua sessão foi encerrada porque sua conta não está mais ativa.");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUserEmail");
      window.location.href = "index.html";
    }
  }, 5000); // Verifica a cada 5 segundos (5000 ms)


  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove a flag de login e o e-mail do usuário logado
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUserEmail");
      window.location.href = "index.html";
    });
  }

  // --- Código do carrossel (existente) ---
  const carouselImages = document.querySelectorAll(".carousel-image");
  const carouselDots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    carouselImages.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });

    carouselDots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) {
        dot.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showSlide(currentIndex);
  }

  function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopCarousel() {
    clearInterval(slideInterval);
  }

  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopCarousel();
      currentIndex = index;
      showSlide(currentIndex);
      startCarousel();
    });
  });

  showSlide(currentIndex);
  startCarousel();

  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", stopCarousel);
  carouselContainer.addEventListener("mouseleave", startCarousel);
});