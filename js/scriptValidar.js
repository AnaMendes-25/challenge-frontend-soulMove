const cardsOpcoes = document.querySelectorAll(".registro__opcao-card");
const formularios = document.querySelectorAll(".registro__formulario-opcao");
const areasUpload = document.querySelectorAll(".registro__upload");
const modal = document.querySelector("#modalSucesso");
const fecharModal = document.querySelector("#fecharModal");

cardsOpcoes.forEach(function (card) {
  const header = card.querySelector(".registro__opcao-header");

  header.addEventListener("click", function () {
    cardsOpcoes.forEach(function (outroCard) {
      if (outroCard !== card) {
        outroCard.classList.remove("ativo");
      }
    });

    card.classList.toggle("ativo");
  });
});

function abrirModal() {
  modal.classList.add("ativo");
}

function fecharModalSucesso() {
  modal.classList.remove("ativo");
}

function mostrarErro(campo, elementoErro, mensagem) {
  campo.classList.add("erro");
  elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
  campo.classList.remove("erro");
  elementoErro.textContent = "";
}

function mostrarPreviewImagem(uploadArea, arquivo) {
  if (!arquivo) {
    return;
  }

  if (!arquivo.type.startsWith("image/")) {
    alert("Por favor, envie uma imagem PNG ou JPG.");

    const inputArquivo = uploadArea.querySelector(".registro__upload-input");
    inputArquivo.value = "";

    return;
  }

  const previewArea = uploadArea.querySelector(".registro__preview");
  const previewImagem = uploadArea.querySelector(".registro__preview-img");
  const nomeArquivo = uploadArea.querySelector(".registro__arquivo");

  const urlImagem = URL.createObjectURL(arquivo);

  previewImagem.src = urlImagem;
  nomeArquivo.textContent = `Arquivo selecionado: ${arquivo.name}`;

  previewArea.hidden = false;
  uploadArea.classList.add("tem-imagem");
}

function removerPreviewImagem(uploadArea) {
  const inputArquivo = uploadArea.querySelector(".registro__upload-input");
  const previewArea = uploadArea.querySelector(".registro__preview");
  const previewImagem = uploadArea.querySelector(".registro__preview-img");
  const nomeArquivo = uploadArea.querySelector(".registro__arquivo");

  inputArquivo.value = "";
  previewImagem.src = "";
  nomeArquivo.textContent = "";

  previewArea.hidden = true;
  uploadArea.classList.remove("tem-imagem");
}

formularios.forEach(function (formulario) {
  const inputTexto = formulario.querySelector(".registro__input");
  const textarea = formulario.querySelector(".registro__textarea");

  const erroNome = inputTexto.nextElementSibling;
  const erroComentario = textarea.nextElementSibling;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;

    if (inputTexto.value.trim() === "") {
      mostrarErro(inputTexto, erroNome, "Digite o nome da atividade.");
      formularioValido = false;
    } else {
      limparErro(inputTexto, erroNome);
    }

    if (textarea.value.trim() === "") {
      mostrarErro(textarea, erroComentario, "Insira um comentário sobre a atividade.");
      formularioValido = false;
    } else {
      limparErro(textarea, erroComentario);
    }


    if (formularioValido) {
      abrirModal();

      const uploadArea = formulario.querySelector(".registro__upload");

      formulario.reset();
      removerPreviewImagem(uploadArea);
    }
  });

  inputTexto.addEventListener("input", function () {
    limparErro(inputTexto, erroNome);
  });

  textarea.addEventListener("input", function () {
    limparErro(textarea, erroComentario);
  });
});

areasUpload.forEach(function (uploadArea) {
  const inputArquivo = uploadArea.querySelector(".registro__upload-input");
  const botaoRemover = uploadArea.querySelector(".registro__remover-img");

  inputArquivo.addEventListener("change", function () {
    const arquivo = inputArquivo.files[0];

    mostrarPreviewImagem(uploadArea, arquivo);
  });

  botaoRemover.addEventListener("click", function () {
    removerPreviewImagem(uploadArea);
  });

  uploadArea.addEventListener("dragover", function (evento) {
    evento.preventDefault();

    uploadArea.classList.add("ativo");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("ativo");
  });

  uploadArea.addEventListener("drop", function (evento) {
    evento.preventDefault();

    uploadArea.classList.remove("ativo");

    const arquivo = evento.dataTransfer.files[0];

    if (arquivo) {
      const arquivosTransferidos = new DataTransfer();

      arquivosTransferidos.items.add(arquivo);
      inputArquivo.files = arquivosTransferidos.files;

      mostrarPreviewImagem(uploadArea, arquivo);
    }
  });
});

fecharModal.addEventListener("click", function () {
  fecharModalSucesso();
});

modal.addEventListener("click", function (evento) {
  if (evento.target === modal) {
    fecharModalSucesso();
  }
});