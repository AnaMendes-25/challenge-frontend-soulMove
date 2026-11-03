import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logoSoulMove from "../../assets/logo/LogoSoulMoveIndigo.png";
import imagemMobilidade from "../../assets/banners/loginEcadastro-acesso.png";
import { ApiError } from "../../services/api";
import { usuariosService } from "../../services/usuariosService";

type DadosCadastro = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    aceitouTermos: boolean;
};

const estiloCampo =
    "mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100";

export default function Cadastro() {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erroCadastro, setErroCadastro] = useState("");

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<DadosCadastro>({
        mode: "onTouched",
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
            aceitouTermos: false,
        },
    });

    useEffect(() => {
        document.title = "SoulMove | Cadastro";
    }, []);

    async function onSubmit(dados: DadosCadastro) {
        setCarregando(true);
        setErroCadastro("");

        try {
            await usuariosService.cadastrar({
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
            });
            navigate("/solucao", { replace: true });
        } catch (erro) {
            if (erro instanceof ApiError && erro.status === 409) {
                setErroCadastro("Este e-mail já está cadastrado.");
            } else if (erro instanceof Error) {
                setErroCadastro(erro.message);
            } else {
                setErroCadastro("Não foi possível criar sua conta. Tente novamente.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="min-h-dvh bg-white text-slate-900 lg:grid lg:grid-cols-2">
            <div className="flex min-h-dvh flex-col">
                <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
                    <Link
                        to="/"
                        aria-label="Página inicial SoulMove"
                        className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                    >
                        <img
                            src={logoSoulMove}
                            alt="SoulMove"
                            className="h-auto w-40"
                            width={160}
                        />
                    </Link>

                    <Link
                        to="/contato"
                        className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline"
                    >
                        Precisa de ajuda?
                    </Link>
                </header>

                <section
                    aria-labelledby="titulo-cadastro"
                    className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8 sm:px-8"
                >
                    <h1 id="titulo-cadastro" className="text-3xl font-semibold tracking-tight">
                        Crie sua conta
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        É grátis. Comece a fazer a diferença hoje.
                    </p>

                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="cadastro-nome" className="text-sm font-semibold">
                                Nome completo
                            </label>
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
                                    setValueAs: (valor: string) => valor.trim(),
                                    minLength: {
                                        value: 2,
                                        message: "Informe seu nome completo.",
                                    },
                                })}
                            />
                            {errors.nome && (
                                <p id="erro-cadastro-nome" className="mt-2 text-sm text-red-700">
                                    {errors.nome.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cadastro-email" className="text-sm font-semibold">
                                E-mail
                            </label>
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
                            <label htmlFor="cadastro-senha" className="text-sm font-semibold">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="cadastro-senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Crie uma senha"
                                    className={`${estiloCampo} pr-12`}
                                    aria-invalid={Boolean(errors.senha)}
                                    aria-describedby={errors.senha ? "erro-cadastro-senha" : "ajuda-cadastro-senha"}
                                    {...register("senha", {
                                        required: "Informe uma senha.",
                                        minLength: {
                                            value: 8,
                                            message: "A senha deve ter pelo menos 8 caracteres.",
                                        },
                                        validate: (valor) =>
                                            (/[A-Za-z]/.test(valor) && /\d/.test(valor)) ||
                                            "Use letras e números na senha.",
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
                            {!errors.senha && (
                                <p id="ajuda-cadastro-senha" className="mt-2 text-xs text-slate-500">
                                    Use ao menos 8 caracteres, com letras e números.
                                </p>
                            )}
                            {errors.senha && (
                                <p id="erro-cadastro-senha" className="mt-2 text-sm text-red-700">
                                    {errors.senha.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cadastro-confirmar-senha" className="text-sm font-semibold">
                                Confirmar senha
                            </label>
                            <div className="relative">
                                <input
                                    id="cadastro-confirmar-senha"
                                    type={mostrarConfirmacao ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Digite sua senha novamente"
                                    className={`${estiloCampo} pr-12`}
                                    aria-invalid={Boolean(errors.confirmarSenha)}
                                    aria-describedby={errors.confirmarSenha ? "erro-cadastro-confirmar-senha" : undefined}
                                    {...register("confirmarSenha", {
                                        required: "Confirme sua senha.",
                                        validate: (valor) =>
                                            valor === getValues("senha") || "As senhas não coincidem.",
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarConfirmacao((visivel) => !visivel)}
                                    aria-label={mostrarConfirmacao ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                                    aria-pressed={mostrarConfirmacao}
                                    aria-controls="cadastro-confirmar-senha"
                                    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
                                >
                                    {mostrarConfirmacao ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                                </button>
                            </div>
                            {errors.confirmarSenha && (
                                <p id="erro-cadastro-confirmar-senha" className="mt-2 text-sm text-red-700">
                                    {errors.confirmarSenha.message}
                                </p>
                            )}
                        </div>

                        <label className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                            <input
                                type="checkbox"
                                className="mt-0.5 size-4 accent-blue-700"
                                {...register("aceitouTermos", {
                                    required: "Aceite os termos para continuar.",
                                })}
                            />
                            <span>
                                Li e aceito os{" "}
                                <Link to="/sobre" className="font-medium text-blue-700 hover:underline">
                                    Termos de uso
                                </Link>{" "}
                                e a{" "}
                                <Link to="/sobre" className="font-medium text-blue-700 hover:underline">
                                    Política de privacidade
                                </Link>
                                .
                            </span>
                        </label>
                        {errors.aceitouTermos && (
                            <p className="-mt-3 text-sm text-red-700">{errors.aceitouTermos.message}</p>
                        )}

                        {erroCadastro && (
                            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {erroCadastro}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={carregando}
                            className="min-h-12 w-full cursor-pointer rounded-lg bg-[#2545ed] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {carregando ? "Criando conta..." : "Criar minha conta"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="font-semibold text-blue-700 underline-offset-4 hover:underline">
                            Entrar
                        </Link>
                    </p>
                </section>

                <footer className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs text-slate-500 sm:px-8">
                    <span>© {new Date().getFullYear()} SoulMove</span>
                    <div className="flex gap-5">
                        <span>Privacidade</span>
                        <span>Termos de uso</span>
                    </div>
                </footer>
            </div>

            <div className="relative hidden min-h-0 overflow-hidden bg-slate-100 lg:block">
                <img
                    src={imagemMobilidade}
                    alt="Pessoa com uma bicicleta, representando mobilidade sustentável"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
            </div>
        </main>
    );
}
