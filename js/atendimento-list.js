document.addEventListener("DOMContentLoaded", () => {
  loadAtendimentosList();
});

function loadAtendimentosList() {
  const atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];
  const atendimentosListDiv = document.getElementById("atendimentosList");
  const noAtendimentosMessage = document.getElementById(
    "noAtendimentosMessage"
  );

  // Limpa a lista existente antes de renderizar
  atendimentosListDiv.innerHTML = "";

  if (atendimentos.length === 0) {
    noAtendimentosMessage.style.display = "block";
    return;
  } else {
    noAtendimentosMessage.style.display = "none";
  }

  atendimentos.forEach((atendimento) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("atendimento-item");
    itemDiv.dataset.id = atendimento.id;

    itemDiv.innerHTML = `
            <div class="atendimento-info">
                <strong>ID do Cliente:</strong> ${atendimento.id}
            </div>
            <div class="atendimento-info">
                <strong>Formato do Atendimento:</strong> ${atendimento.formaAtendimento}
            </div>
            <div class="atendimento-info">
                <strong>Usuário que cadastrou:</strong> ${atendimento.usuario}
            </div>
            <div class="atendimento-info">
                <strong>Ativo:</strong> ${atendimento.ativo}
            </div>
            <div class="atendimento-info">
                <strong>Resposta:</strong> ${atendimento.respostaAtendimento}
            </div>
            <div class="atendimento-info">
                <strong>Data para Retorno:</strong> ${atendimento.dataRetorno}
            </div>
            <div class="atendimento-actions">
                <button class="btn-item-action btn-editar" onclick="editarAtendimento(${atendimento.id})">Editar</button>
                <button class="btn-item-action btn-excluir" onclick="excluirAtendimento(${atendimento.id})">Excluir</button>
            </div>
        `;
    atendimentosListDiv.appendChild(itemDiv);
  });
}

function editarAtendimento(id) {
  window.location.href = `cadastrar-atendimento.html?id=${id}`;
}

let atendimentoIdParaExcluir = null;

function excluirAtendimento(idParaExcluir) {
  atendimentoIdParaExcluir = parseInt(idParaExcluir);
  // Mostra o modal
  document.getElementById("modalConfirmacao").style.display = "flex";
}

// Evento para confirmar exclusão
document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmar = document.getElementById("btnConfirmarExcluir");
  const btnCancelar = document.getElementById("btnCancelarExcluir");
  const modal = document.getElementById("modalConfirmacao");

  btnConfirmar.onclick = function () {
    if (atendimentoIdParaExcluir !== null) {
      let atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];
      const atendimentosAtualizados = atendimentos.filter(
        (a) => a.id !== atendimentoIdParaExcluir
      );
      localStorage.setItem(
        "atendimentos",
        JSON.stringify(atendimentosAtualizados)
      );
      modal.style.display = "none";
      atendimentoIdParaExcluir = null;
      location.reload();
    }
  };

  btnCancelar.onclick = function () {
    modal.style.display = "none";
    atendimentoIdParaExcluir = null;
  };
});
