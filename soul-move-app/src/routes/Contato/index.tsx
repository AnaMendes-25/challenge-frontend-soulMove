import { useState, type ChangeEvent, type FormEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

// Define o formato dos dados que serão guardados pelo formulário.
interface FormularioContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

// Partial permite que o objeto tenha erro em apenas alguns campos.
type ErrosFormulario = Partial<FormularioContato>;

// Valores iniciais usados ao abrir e ao limpar o formulário.
const formularioVazio: FormularioContato = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

export default function Contato() {
  // O estado guarda tudo o que a pessoa digita nos quatro campos.
  const [formulario, setFormulario] =
    useState<FormularioContato>(formularioVazio);

  // Este estado guarda as mensagens de erro exibidas abaixo dos campos.
  const [erros, setErros] = useState<ErrosFormulario>({});

  // Controla a mensagem de sucesso mostrada depois de um envio válido.
  const [enviado, setEnviado] = useState(false);

  // Uma única função atualiza qualquer input usando o atributo name do campo.
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: value,
    }));

    // Ao voltar a digitar, removemos o erro daquele campo e o aviso de sucesso.
    setErros((errosAnteriores) => ({
      ...errosAnteriores,
      [name]: undefined,
    }));
    setEnviado(false);
  }

  // Verifica as mesmas regras de tamanho existentes no HTML original.
  function validarFormulario() {
    const novosErros: ErrosFormulario = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formulario.nome.trim().length < 10) {
      novosErros.nome = "Digite seu nome completo (mínimo de 10 caracteres).";
    }

    if (!emailValido.test(formulario.email.trim())) {
      novosErros.email = "Digite um e-mail válido.";
    }

    if (formulario.assunto.trim().length < 5) {
      novosErros.assunto = "O assunto deve ter pelo menos 5 caracteres.";
    }

    if (formulario.mensagem.trim().length < 20) {
      novosErros.mensagem = "A mensagem deve ter pelo menos 20 caracteres.";
    }

    setErros(novosErros);

    // O formulário só é válido quando o objeto não possui nenhuma mensagem.
    return Object.keys(novosErros).length === 0;
  }

  // Impede o recarregamento da página e valida os dados antes do envio.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(false);

    if (!validarFormulario()) {
      return;
    }

    setEnviado(true);
    setFormulario(formularioVazio);
    setErros({});
  }

  // Classes reutilizadas nos quatro campos para não repetir uma string enorme.
  const classeCampo =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  // Acrescenta a borda vermelha somente quando o campo possui erro.
  function classeCampoComErro(campo: keyof FormularioContato) {
    return `${classeCampo} ${
      erros[campo]
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : ""
    }`;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Hero: apresentação da página de contato. */}
        <section
          className="rounded-3xl bg-blue-950 px-6 py-14 text-indigo-50 sm:px-10 md:px-12 md:py-20"
          aria-labelledby="contato-title"
        >
          <span className="text-sm font-medium tracking-[0.18em] text-blue-300 sm:text-base">
            [ CONTATO ]
          </span>

          <h1
            className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
            id="contato-title"
          >
            Fale com a equipe SoulMove
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
            Dúvidas sobre o projeto ou a solução? A equipe responde.
          </p>
        </section>

        {/* No celular os blocos ficam empilhados; no desktop, lado a lado. */}
        <section
          className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-14"
          aria-label="Formulário e informações de contato"
        >
          <aside
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"
            aria-label="Informações rápidas"
          >
            {/* Card informativo claro. */}
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
                Pergunte sobre funcionalidades, a proposta ou os próximos passos
                do projeto.
              </p>
            </article>

            {/* Card institucional escuro. */}
            <article className="rounded-3xl bg-blue-950 p-7 text-white sm:p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-2xl"
                aria-hidden="true"
              >
                🌱
              </div>
              <h2 className="mt-6 text-2xl font-semibold">SoulMove</h2>
              <p className="mt-3 text-base leading-relaxed text-blue-100 sm:text-lg">
                Sistema de Gamificação Sustentável em parceria com a SoulUp by
                Prospera.
              </p>
            </article>
          </aside>

          {/* Formulário controlado pelo estado formulario. */}
          <form
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            id="contatoForm"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulário de contato para dúvidas e mensagens"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Campo nome. */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="nome"
                >
                  Nome
                </label>
                <input
                  className={classeCampoComErro("nome")}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  autoComplete="name"
                  value={formulario.nome}
                  onChange={handleChange}
                  maxLength={120}
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? "erro-nome" : undefined}
                />
                {erros.nome && (
                  <span
                    id="erro-nome"
                    className="mt-2 block text-sm text-red-600"
                  >
                    {erros.nome}
                  </span>
                )}
              </div>

              {/* Campo e-mail. */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className={classeCampoComErro("email")}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  value={formulario.email}
                  onChange={handleChange}
                  maxLength={120}
                  aria-invalid={Boolean(erros.email)}
                  aria-describedby={erros.email ? "erro-email" : undefined}
                />
                {erros.email && (
                  <span
                    id="erro-email"
                    className="mt-2 block text-sm text-red-600"
                  >
                    {erros.email}
                  </span>
                )}
              </div>

              {/* Campo assunto. */}
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block font-semibold text-slate-800"
                  htmlFor="assunto"
                >
                  Assunto
                </label>
                <input
                  className={classeCampoComErro("assunto")}
                  type="text"
                  id="assunto"
                  name="assunto"
                  placeholder="Digite o assunto"
                  value={formulario.assunto}
                  onChange={handleChange}
                  maxLength={200}
                  aria-invalid={Boolean(erros.assunto)}
                  aria-describedby={erros.assunto ? "erro-assunto" : undefined}
                />
                {erros.assunto && (
                  <span
                    id="erro-assunto"
                    className="mt-2 block text-sm text-red-600"
                  >
                    {erros.assunto}
                  </span>
                )}
              </div>

              {/* Campo mensagem. */}
              <div className="sm:col-span-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    className="font-semibold text-slate-800"
                    htmlFor="mensagem"
                  >
                    Mensagem
                  </label>
                  <span className="text-sm text-slate-500">
                    {formulario.mensagem.length}/500
                  </span>
                </div>
                <textarea
                  className={`${classeCampoComErro("mensagem")} min-h-36 resize-y`}
                  id="mensagem"
                  name="mensagem"
                  rows={6}
                  placeholder="Escreva sua mensagem"
                  value={formulario.mensagem}
                  onChange={handleChange}
                  maxLength={500}
                  aria-invalid={Boolean(erros.mensagem)}
                  aria-describedby={
                    erros.mensagem ? "erro-mensagem" : undefined
                  }
                />
                {erros.mensagem && (
                  <span
                    id="erro-mensagem"
                    className="mt-2 block text-sm text-red-600"
                  >
                    {erros.mensagem}
                  </span>
                )}
              </div>
            </div>

            {/* Feedback acessível exibido somente depois de um envio válido. */}

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

      {/* O modal só aparece quando enviado for true. */}
      {enviado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
        >
          {/* Conteúdo branco do modal. */}
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            {/* Ícone de sucesso. */}
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700"
              aria-hidden="true"
            >
              ✓
            </div>

            <h2
              id="modal-titulo"
              className="mt-5 text-2xl font-semibold text-blue-950"
            >
              Mensagem enviada!
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600">
              Sua mensagem foi enviada com sucesso. A equipe SoulMove responderá
              em breve.
            </p>

            <button
              type="button"
              className="mt-7 w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              /* Ao clicar, enviado volta para false e o modal desaparece. */
              onClick={() => setEnviado(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
