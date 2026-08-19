const form = document.getElementById("contatoForm");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const assunto = document.getElementById("assunto");
const mensagem = document.getElementById("mensagem");

const botao = document.getElementById("enviarBtn");


//Validação em tempo real
nome.addEventListener("input", () => {

    if (nome.value.trim().length >= 10) {

        removerErro(nome);

    }
});

email.addEventListener("input", () => {

    if (validarEmail(email.value)) {

        removerErro(email);

    }
});

assunto.addEventListener("input", () => {

    if (assunto.value.trim().length >= 5) {

        removerErro(assunto);

    }
});

mensagem.addEventListener("input", () => {

    if (mensagem.value.trim().length >= 20) {

        removerErro(mensagem);

    }
});



form.addEventListener("submit", function (event) {

    event.preventDefault();

    limparErros();

    let formularioValido = true;




    if (nome.value.trim().length < 10) {

        mostrarErro(
            nome,
            "O nome deve ter pelo menos 10 caracteres."
        );

        formularioValido = false;
    }




    if (!validarEmail(email.value)) {

        mostrarErro(
            email,
            "Digite um e-mail válido."
        );

        formularioValido = false;
    }




    if (assunto.value.trim().length < 5) {

        mostrarErro(
            assunto,
            "O assunto deve ter pelo menos 5 caracteres."
        );

        formularioValido = false;
    }



    if (mensagem.value.trim().length < 20) {

        mostrarErro(
            mensagem,
            "A mensagem deve ter pelo menos 20 caracteres."
        );

        formularioValido = false;
    }




    if (formularioValido) {

        botao.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Enviando...
    `;

        botao.disabled = true;


        setTimeout(() => {

            mostrarMensagem(
                "Mensagem enviada com sucesso!",
                "success"
            );

            form.reset();


            botao.innerHTML = `
        Enviar mensagem
        <i class="fa-solid fa-arrow-right"></i>
      `;

            botao.disabled = false;

        }, 1000);

    } else {

        mostrarMensagem(
            "Corrija os campos do formulário.",
            "error"
        );
    }
});



function mostrarErro(campo, mensagem) {

    campo.classList.add(
        "contato-form__field--error"
    );

    const errorSpan =
        campo.parentElement.querySelector(
            ".contato-form__error"
        );

    errorSpan.textContent = mensagem;
}



function removerErro(campo) {

    campo.classList.remove(
        "contato-form__field--error"
    );

    campo.classList.add(
        "contato-form__field--success"
    );

    const errorSpan =
        campo.parentElement.querySelector(
            ".contato-form__error"
        );

    errorSpan.textContent = "";
}




function limparErros() {

    const campos = document.querySelectorAll(
        ".contato-form__field"
    );

    campos.forEach((campo) => {

        campo.classList.remove(
            "contato-form__field--error"
        );

        campo.classList.remove(
            "contato-form__field--success"
        );


    });


    const erros = document.querySelectorAll(
        ".contato-form__error"
    );

    erros.forEach((erro) => {

        erro.textContent = "";
    });


    const mensagemAnterior =
        document.querySelector(
            ".contato-form__message"
        );

    if (mensagemAnterior) {

        mensagemAnterior.remove();
    }
}



function validarEmail(email) {
    // Expressão regular simples para validar e-mail (consultei IA para esse regex)
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}



function mostrarMensagem(texto, tipo) {

    const mensagem =
        document.createElement("div");

    mensagem.classList.add(
        "contato-form__message",
        `contato-form__message--${tipo}`
    );

    mensagem.textContent = texto;

    form.prepend(mensagem);
}