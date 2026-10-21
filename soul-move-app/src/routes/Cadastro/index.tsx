import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logoSoulMove from "../../assets/logo/LogoSoulMoveIndigo.png";
import imagemMobilidade from "../../assets/banners/img-header-homem.png";

type DadosCadastro = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

const estiloCampo =
  "mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100";

export default function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<DadosCadastro>({
    mode: "onTouched",
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
  });

  useEffect(() => {
    document.title = "SoulMove | Cadastro";
  }, []);

  return (
    <main className="min-h-dvh bg-white text-slate-900 lg:grid lg:grid-cols-2">
      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center justify-between gap-4 px-5 py-7 sm:px-8">
          <Link
            to="/"
            aria-label="Página inicial SoulMove"
            className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <img src={logoSoulMove} alt="SoulMove" className="h-auto w-40" width={160} />
          </Link>
          <Link to="/contato" className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline">
            Precisa de ajuda?
          </Link>
        </header>

        <section
          aria-labelledby="titulo-cadastro"
          className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:py-10"
        >
          <h1 id="titulo-cadastro" className="text-3xl font-bold tracking-tight">Crie sua conta</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">É grátis. Comece a fazer a diferença hoje.</p>

          {/* Aceite dos termos e envio serão implementados nas próximas etapas. */}
          <form noValidate className="mt-7 space-y-5">
            <div>
              <label htmlFor="cadastro-nome" className="text-sm font-semibold">Nome completo</label>
              <input
                id="cadastro-nome"
                type="text"
                autoComplete="name"
                placeholder="Como você se chama?"
                className={estiloCampo}
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? "erro-cadastro-nome" : undefined}
                {...register("nome", {
                  required: "Informe seu nome.",
                  validate: (valor) => valor.trim().length > 0 || "Informe seu nome.",
                })}
              />
              {errors.nome && (
                <p id="erro-cadastro-nome" className="mt-2 text-sm text-red-700">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cadastro-email" className="text-sm font-semibold">E-mail</label>
              <input
                id="cadastro-email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="voce@exemplo.com"
                className={estiloCampo}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "erro-cadastro-email" : undefined}
                {...register("email", {
                  required: "Informe seu e-mail.",
                  setValueAs: (valor: string) => valor.trim(),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Informe um e-mail válido.",
                  },
                })}
              />
              {errors.email && (
                <p id="erro-cadastro-email" className="mt-2 text-sm text-red-700">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cadastro-senha" className="text-sm font-semibold">Senha</label>
              <div className="relative">
                <input
                  id="cadastro-senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Crie uma senha"
                  className={`${estiloCampo} pr-12`}
                  aria-invalid={Boolean(errors.senha)}
                  aria-describedby={`ajuda-cadastro-senha${errors.senha ? " erro-cadastro-senha" : ""}`}
                  {...register("senha", {
                    required: "Crie uma senha.",
                    // Regra indicada no Figma; confirmar com o contrato da API na integração.
                    minLength: { value: 8, message: "Use pelo menos 8 caracteres." },
                    validate: (valor) =>
                      (/[a-zA-Z]/.test(valor) && /\d/.test(valor)) ||
                      "Inclua letras e números na senha.",
                    deps: ["confirmarSenha"],
                  })}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((visivel) => !visivel)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={mostrarSenha}
                  aria-controls="cadastro-senha"
                  className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  {mostrarSenha ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
              <p id="ajuda-cadastro-senha" className="mt-2 text-xs leading-relaxed text-slate-500">Use ao menos 8 caracteres, com letras e números.</p>
              {errors.senha && (
                <p id="erro-cadastro-senha" className="mt-2 text-sm text-red-700">
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cadastro-confirmacao" className="text-sm font-semibold">Confirmar senha</label>
              <div className="relative">
                <input
                  id="cadastro-confirmacao"
                  type={mostrarConfirmacao ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Digite sua senha novamente"
                  className={`${estiloCampo} pr-12`}
                  aria-invalid={Boolean(errors.confirmarSenha)}
                  aria-describedby={errors.confirmarSenha ? "erro-cadastro-confirmacao" : undefined}
                  {...register("confirmarSenha", {
                    required: "Confirme sua senha.",
                    validate: (valor) =>
                      valor === getValues("senha") || "As senhas precisam ser iguais.",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao((visivel) => !visivel)}
                  aria-label={mostrarConfirmacao ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                  aria-pressed={mostrarConfirmacao}
                  aria-controls="cadastro-confirmacao"
                  className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  {mostrarConfirmacao ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
              {errors.confirmarSenha && (
                <p id="erro-cadastro-confirmacao" className="mt-2 text-sm text-red-700">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input id="cadastro-termos" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />
              <label htmlFor="cadastro-termos" className="text-sm leading-relaxed text-slate-600">
                Li e aceito os <span className="text-blue-700">Termos de uso</span> e a <span className="text-blue-700">Política de privacidade</span>.
              </label>
            </div>

            <button type="button" disabled className="min-h-12 w-full cursor-not-allowed rounded-lg bg-[#2545ed] px-5 py-3 text-sm font-semibold text-white">
              Criar minha conta
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Já tem uma conta? <button type="button" disabled className="cursor-not-allowed font-semibold text-blue-700">Entrar</button>
          </p>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-slate-500 sm:px-8">
          <span>© {new Date().getFullYear()} SoulMove</span>
          <div className="flex gap-5"><span>Privacidade</span><span>Termos de uso</span></div>
        </footer>
      </div>

      {/* Imagem provisória do projeto até receber a foto usada no Figma. */}
      <div className="hidden min-h-dvh bg-slate-100 lg:block">
        <img src={imagemMobilidade} alt="Pessoa com uma bicicleta, representando mobilidade sustentável" className="sticky top-0 h-dvh w-full object-cover" />
      </div>
    </main>
  );
}