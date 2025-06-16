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

function excluirAtendimento(idParaExcluir) {
  const idNum = parseInt(idParaExcluir);

  if (isNaN(idNum)) {
    console.error("ID inválido para exclusão:", idParaExcluir);
    alert("Erro ao excluir: ID do atendimento inválido.");
    return;
  }

  if (
    confirm(`Tem certeza que deseja excluir o atendimento com ID: ${idNum}?`)
  ) {
    let atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];

    console.log("-----------------------------------------");
    console.log("Antes da exclusão:");
    console.log("Array original:", JSON.stringify(atendimentos));
    console.log("ID a ser excluído:", idNum);

    const atendimentosAtualizados = atendimentos.filter((atendimento) => {
      console.log(
        `Comparando atendimento.id=${
          atendimento.id
        } (tipo: ${typeof atendimento.id}) com idNum=${idNum} (tipo: ${typeof idNum})`
      );
      return atendimento.id !== idNum;
    });

    if (atendimentos.length === atendimentosAtualizados.length) {
      console.warn(
        `Atendimento com ID ${idNum} não encontrado para exclusão. Array não alterado.`
      );
      alert(
        `Atendimento com ID ${idNum} não encontrado. Nenhuma alteração foi feita.`
      );
    } else {
      // *** Esta é a linha que salva no localStorage ***
      localStorage.setItem(
        "atendimentos",
        JSON.stringify(atendimentosAtualizados)
      );

      console.log("Após a exclusão e salvamento:");
      console.log(
        "Array atualizado (após filtro):",
        JSON.stringify(atendimentosAtualizados)
      );
      console.log(
        "localStorage 'atendimentos' agora contém (lido após setItem):",
        localStorage.getItem("atendimentos")
      );

      alert(`Atendimento com ID ${idNum} excluído com sucesso.`);

      // Recarrega a página para atualizar a lista
      location.reload();
    }
    // Se o item não foi encontrado e alertou, ainda assim recarrega a lista para garantir consistência
    // Se a exclusão foi bem-sucedida, já chamamos loadAtendimentosList dentro do setTimeout
    // então esta linha é redundante/potencialmente problemática se não for ajustada.
    // Vou remover a chamada externa para evitar duplo carregamento ou problemas de tempo
    // loadAtendimentosList();
    console.log("-----------------------------------------");
  }
}
