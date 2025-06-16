document.addEventListener("DOMContentLoaded", () => {
  // Protege a página
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove só a flag de login
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  const carouselImages = document.querySelectorAll(".carousel-image");
  const carouselDots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    carouselImages.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) {
        img.style.display = "block"; // Mostra a imagem ativa
      } else {
        img.style.display = "none"; // Esconde as imagens inativas
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
    slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
  }

  function stopCarousel() {
    clearInterval(slideInterval);
  }

  // Adiciona evento de clique para os pontos
  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopCarousel(); // Para o carrossel ao clicar
      currentIndex = index;
      showSlide(currentIndex);
      startCarousel(); // Reinicia o carrossel
    });
  });

  // Inicia o carrossel quando a página carrega
  showSlide(currentIndex); // Mostra a primeira imagem imediatamente
  startCarousel();

  // Opcional: Pausar carrossel ao passar o mouse sobre ele
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", stopCarousel);
  carouselContainer.addEventListener("mouseleave", startCarousel);
});
