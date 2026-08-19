const botoesAbas = document.querySelectorAll(".solucao__aba-botao");
const conteudosAbas = document.querySelectorAll(".solucao__aba-conteudo");

botoesAbas.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const abaSelecionada = botao.dataset.aba;

    botoesAbas.forEach(function (outroBotao) {
      outroBotao.classList.remove("ativo");
    });

    conteudosAbas.forEach(function (conteudo) {
      conteudo.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    const conteudoSelecionado = document.querySelector(`#${abaSelecionada}`);
    conteudoSelecionado.classList.add("ativo");
  });
});