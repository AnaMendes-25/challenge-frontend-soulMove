import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logoSoulMove from "../../assets/logo/LogoSoulMoveIndigo.png";
import imagemMobilidade from "../../assets/banners/img-header-homem.png";
import { BsAlignEnd } from "react-icons/bs";
type DadosLogin = { email: string; senha: string; };

const estiloCampo = "mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100";

export default function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const { register, handleSubmit, formState: { errors } } = 
        useForm<DadosLogin>({
            mode: "onTouched",
            defaultValues: {
                email: "",
                senha: "",
            },
        });

    useEffect(() => {
        document.title = "SoulMove | Login";
    }, []);

    function onSubmit(dados: DadosLogin) {
        console.log("Dados do login:", dados);
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

                <section aria-labelledby="titulo-login" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8 sm:px-8">
                    <h1 id="titulo-login" className="text-3xl font-semibold tracking-tight">
                        Entre na sua conta
                    </h1>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        Acompanhe suas ações, conquistas e recompensas
                    </p>

                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="login-email"
                                className="text-sm font-semibold"
                            >
                                E-mail
                            </label>

                            <input
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                autoCapitalize="none"
                                spellCheck={false}
                                placeholder="voce@exemplo.com"
                                className={estiloCampo}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "erro-login-email" : undefined}
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
                                <p id="erro-login-email" className="mt-2 text-sm text-red-700">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="login-senha" className="text-sm font-semibold">
                                Senha
                            </label>

                            <div className="relative">
                                <input
                                    id="login-senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Digite sua senha"
                                    className={`${estiloCampo} pr-12`}
                                    aria-invalid={Boolean(errors.senha)}
                                    aria-describedby={errors.senha ? "erro-login-senha" : undefined}
                                    {...register("senha", {
                                        required: "Informe sua senha.",
                                    })}
                                />
                        
                                <button
                                    type="button"
                                    onClick={() => setMostrarSenha((visivel) => !visivel)}
                                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                    aria-pressed={mostrarSenha}
                                    aria-controls="login-senha"
                                    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
                                >
                                    {mostrarSenha ? (
                                        <FiEyeOff aria-hidden="true" />
                                    ) : (
                                        <FiEye aria-hidden="true" />
                                    )}
                                </button>
                            </div>

                            {errors.senha && (
                                <p id="erro-login-senha" className="mt-2 text-sm text-red-700">
                                    {errors.senha.message}
                                </p>
                            )}
                            
                            <div className="w-full text-end mt-2">
                                <Link 
                                    to="/recuperar-senha"
                                    className="text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600"
                                >
                                    Esqueci minha senha
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="min-h-12 w-full cursor-pointer rounded-lg bg-[#2545ed] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Entrar
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Ainda não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="font-semibold text-blue-700 underline-offset-4 hover:underline"
                        >
                            Cadastre-se
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

            {/* Imagem provisória do projeto até receber a foto usada no Figma. */}
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