const numeros = document.querySelectorAll("[data-numero]");

function animarNumero(elemento) {
  const alvo = Number(elemento.dataset.numero);

  let atual = 0;

  const incremento = alvo / 60;

  const timer = setInterval(function () {
    atual += incremento;

    if (atual >= alvo) {
      elemento.textContent = alvo;
      clearInterval(timer);
      return;
    }

    elemento.textContent = Math.floor(atual);
  }, 20);
}

numeros.forEach(function (numero) {
  animarNumero(numero);
});