import { useState } from "react";
import { useForm } from "react-hook-form";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ModalSucesso from "../../components/ModalSucesso/ModalSucesso";

import type { FormularioContato } from "../../types/ContatoTypes";

export default function Contato() {
  // Controla a abertura e o fechamento do modal.
  const [enviado, setEnviado] = useState(false);

  // O React Hook Form controla os campos, validações, erros e limpeza.
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormularioContato>({
    defaultValues: {
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
    mode: "onTouched",
  });

  // Observa a mensagem para atualizar o contador de caracteres.
  const mensagem = watch("mensagem") ?? "";

  // Executada somente quando todos os campos são válidos.
  function enviarFormulario() {
    setEnviado(true);
    reset();
  }

  const classeCampo =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  function classeCampoComErro(campo: keyof FormularioContato) {
    return `${classeCampo} ${
      errors[campo]
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : ""
    }`;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 md:gap-24 md:py-16 lg:px-8">
        {/* Apresentação da página */}
        <section
          className="rounded-3xl bg-blue-950 px-6 py-14 text-indigo-50 sm:px-10 md:px-12 md:py-20"
          aria-labelledby="contato-title"
        >
          <span className="text-sm font-medium tracking-[0.18em] text-blue-300 sm:text-base">
            [ CONTATO ]
          </span>

          <h1
            id="contato-title"
            className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
          >
            Fale com a equipe SoulMove
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
            Dúvidas sobre o projeto ou a solução? A equipe responde.
          </p>
        </section>

        <section
          className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-14"
          aria-label="Formulário e informações de contato"
        >
          {/* Informações laterais */}
          <aside
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"
            aria-label="Informações rápidas"
          >
            <article className="rounded-3xl bg-blue-50 p-7 sm:p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
                aria-hidden="true"
              >
                ?
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-blue-950">
                Dúvidas sobre o projeto
              </h2>

              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Pergunte sobre funcionalidades, a proposta ou os próximos
                passos do projeto.
              </p>
            </article>

            <article className="rounded-3xl bg-blue-950 p-7 text-white sm:p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-2xl"
                aria-hidden="true"
              >
                🌱
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                SoulMove
              </h2>

              <p className="mt-3 text-base leading-relaxed text-blue-100 sm:text-lg">
                Sistema de Gamificação Sustentável em parceria com a SoulUp by
                Prospera.
              </p>
            </article>
          </aside>

          {/* Formulário controlado pelo React Hook Form */}
          <form
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            id="contatoForm"
            onSubmit={handleSubmit(enviarFormulario)}
            onChange={() => setEnviado(false)}
            noValidate
            aria-label="Formulário de contato para dúvidas e mensagens"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Nome */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="nome"
                >
                  Nome
                </label>

                <input
                  {...register("nome", {
                    required: "O nome é obrigatório.",
                    validate: (valor) =>
                      valor.trim().length >= 10 ||
                      "Digite seu nome completo (mínimo de 10 caracteres).",
                    maxLength: {
                      value: 120,
                      message: "O nome deve ter no máximo 120 caracteres.",
                    },
                  })}
                  className={classeCampoComErro("nome")}
                  type="text"
                  id="nome"
                  placeholder="Digite seu nome"
                  autoComplete="name"
                  maxLength={120}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={
                    errors.nome ? "erro-nome" : undefined
                  }
                />

                {errors.nome && (
                  <span
                    id="erro-nome"
                    className="mt-2 block text-sm text-red-600"
                    role="alert"
                  >
                    {errors.nome.message}
                  </span>
                )}
              </div>

              {/* E-mail */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="email"
                >
                  E-mail
                </label>

                <input
                  {...register("email", {
                    required: "O e-mail é obrigatório.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Digite um e-mail válido.",
                    },
                    maxLength: {
                      value: 120,
                      message: "O e-mail deve ter no máximo 120 caracteres.",
                    },
                  })}
                  className={classeCampoComErro("email")}
                  type="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  maxLength={120}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "erro-email" : undefined
                  }
                />

                {errors.email && (
                  <span
                    id="erro-email"
                    className="mt-2 block text-sm text-red-600"
                    role="alert"
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Assunto */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="assunto"
                >
                  Assunto
                </label>

                <input
                  {...register("assunto", {
                    required: "O assunto é obrigatório.",
                    validate: (valor) =>
                      valor.trim().length >= 5 ||
                      "O assunto deve ter pelo menos 5 caracteres.",
                    maxLength: {
                      value: 200,
                      message:
                        "O assunto deve ter no máximo 200 caracteres.",
                    },
                  })}
                  className={classeCampoComErro("assunto")}
                  type="text"
                  id="assunto"
                  placeholder="Digite o assunto"
                  maxLength={200}
                  aria-invalid={Boolean(errors.assunto)}
                  aria-describedby={
                    errors.assunto ? "erro-assunto" : undefined
                  }
                />

                {errors.assunto && (
                  <span
                    id="erro-assunto"
                    className="mt-2 block text-sm text-red-600"
                    role="alert"
                  >
                    {errors.assunto.message}
                  </span>
                )}
              </div>

              {/* Mensagem */}
              <div className="sm:col-span-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    className="font-semibold text-slate-800"
                    htmlFor="mensagem"
                  >
                    Mensagem
                  </label>

                  <span className="text-sm text-slate-500">
                    {mensagem.length}/500
                  </span>
                </div>

                <textarea
                  {...register("mensagem", {
                    required: "A mensagem é obrigatória.",
                    validate: (valor) =>
                      valor.trim().length >= 20 ||
                      "A mensagem deve ter pelo menos 20 caracteres.",
                    maxLength: {
                      value: 500,
                      message:
                        "A mensagem deve ter no máximo 500 caracteres.",
                    },
                  })}
                  className={`${classeCampoComErro("mensagem")} min-h-36 resize-y`}
                  id="mensagem"
                  rows={6}
                  placeholder="Escreva sua mensagem"
                  maxLength={500}
                  aria-invalid={Boolean(errors.mensagem)}
                  aria-describedby={
                    errors.mensagem
                      ? "erro-mensagem"
                      : undefined
                  }
                />

                {errors.mensagem && (
                  <span
                    id="erro-mensagem"
                    className="mt-2 block text-sm text-red-600"
                    role="alert"
                  >
                    {errors.mensagem.message}
                  </span>
                )}
              </div>
            </div>

            <button
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
              type="submit"
              id="enviarBtn"
            >
              Enviar mensagem
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </main>

      <ModalSucesso
        aberto={enviado}
        titulo="Mensagem enviada!"
        texto="Sua mensagem foi enviada para a equipe SoulMove com sucesso."
        fecharModal={() => setEnviado(false)}
      />

      <Footer />
    </div>
  );
}