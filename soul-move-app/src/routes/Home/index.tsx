import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ButtonBase from "../../components/ButtonBase/ButtonBase";
import { useNavigate } from "react-router";

// assets
import iconAndando from "../../assets/icones/andando-pé.png";
import iconTransporte from "../../assets/icones/transporte-publico.png";
import iconReciclagem from "../../assets/icones/reciclagem-correta.png";
import iconBicicleta from "../../assets/icones/bike.png";
import iconPlantar from "../../assets/icones/plantacao.png";
import imgRanking from "../../assets/banners/ranking-global.png";
import imgHeaderHomem from "../../assets/banners/img-header-homem.png";
import avatarGroup from "../../assets/banners/Avatar group.png";

// Ícones SVG
export function ZapIcon({
  className = "w-14 h-14",
  ...props
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="56" height="56" rx="12" fill="#2563EB" />
      <path
        d="M29.1667 16.3335L17.5 30.3335H28L26.8333 39.6668L38.5 25.6668H28L29.1667 16.3335Z"
        stroke="white"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartIcon({
  className = "w-14 h-14",
  ...props
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="56" height="56" rx="12" fill="#2563EB" />
      <path
        d="M28 37.3332V25.6665M35 37.3332V18.6665M21 37.3332V32.6665"
        stroke="white"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({
  className = "w-14 h-14",
  ...props
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="56" height="56" rx="12" fill="#2563EB" />
      <path
        d="M32.6667 16.3335V21.0002M23.3333 16.3335V21.0002M17.5 25.6668H38.5M19.8333 18.6668H36.1667C37.4553 18.6668 38.5 19.7115 38.5 21.0002V37.3335C38.5 38.6222 37.4553 39.6668 36.1667 39.6668H19.8333C18.5447 39.6668 17.5 38.6222 17.5 37.3335V21.0002C17.5 19.7115 18.5447 18.6668 19.8333 18.6668Z"
        stroke="white"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SmileIcon({
  className = "w-6 h-6 text-white",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.16675 15.1667C8.16675 15.1667 9.91675 17.5001 12.8334 17.5001C15.7501 17.5001 17.5001 15.1667 17.5001 15.1667M9.33342 9.33342H9.34508M16.3334 9.33342H16.3451M24.5001 12.8334C24.5001 19.2767 19.2767 24.5001 12.8334 24.5001C6.39009 24.5001 1.16675 19.2767 1.16675 12.8334C1.16675 6.39009 6.39009 1.16675 12.8334 1.16675C19.2767 1.16675 24.5001 6.39009 24.5001 12.8334Z"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface IconProps {
  className?: string;
}

export function CameraIcon({ className = "w-7 h-7 text-white" }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M40.8334 36.1667C40.8334 36.7855 40.5876 37.379 40.15 37.8166C39.7124 38.2542 39.1189 38.5 38.5001 38.5H17.5001C16.8812 38.5 16.2878 38.2542 15.8502 37.8166C15.4126 37.379 15.1667 36.7855 15.1667 36.1667V23.3333C15.1667 22.7145 15.4126 22.121 15.8502 21.6834C16.2878 21.2458 16.8812 21 17.5001 21H22.1667L24.5001 17.5H31.5001L33.8334 21H38.5001C39.1189 21 39.7124 21.2458 40.15 21.6834C40.5876 22.121 40.8334 22.7145 40.8334 23.3333V36.1667Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.0001 33.8333C30.5774 33.8333 32.6667 31.744 32.6667 29.1667C32.6667 26.5893 30.5774 24.5 28.0001 24.5C25.4228 24.5 23.3334 26.5893 23.3334 29.1667C23.3334 31.744 25.4228 33.8333 28.0001 33.8333Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThumbsUpIcon({ className = "w-7 h-7 text-white" }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.16659 25.6666H4.66659C4.04775 25.6666 3.45425 25.4208 3.01667 24.9832C2.57908 24.5456 2.33325 23.9521 2.33325 23.3333V15.1666C2.33325 14.5477 2.57908 13.9543 3.01667 13.5167C3.45425 13.0791 4.04775 12.8333 4.66659 12.8333H8.16659M16.3333 10.4999V5.83325C16.3333 4.90499 15.9645 4.01476 15.3081 3.35838C14.6517 2.702 13.7615 2.33325 12.8333 2.33325L8.16659 12.8333V25.6666H21.3266C21.8893 25.6729 22.4354 25.4757 22.8641 25.1113C23.2929 24.7468 23.5755 24.2396 23.6599 23.6833L25.2699 13.1833C25.3207 12.8488 25.2981 12.5074 25.2038 12.1825C25.1095 11.8577 24.9457 11.5573 24.7238 11.302C24.5018 11.0468 24.227 10.8428 23.9184 10.7043C23.6098 10.5658 23.2748 10.4961 22.9366 10.4999H16.3333Z"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChartIcon({ className = "w-7 h-7 text-white" }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 23.3334V11.6667M14 23.3334V4.66675M7 23.3334V16.3334"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Estrutura central da página com gap uniforme de 64px no mobile e 96px em telas médias/grandes */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-16 md:gap-24">
        {/* SEÇÃO 1: Hero Banner */}
        <section className="w-full p-8 md:p-12 bg-blue-950 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Bloco de Texto */}
          <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-8 md:gap-12">
            <div className="w-full flex flex-col gap-4">
              <span className="text-blue-300 text-base font-normal tracking-wide uppercase">
                [ SOULMOVE ]
              </span>
              <h1 className="text-indigo-50 text-4xl sm:text-5xl font-semibold leading-tight">
                Boas ações merecem ser recompensadas.
              </h1>
              <p className="text-indigo-50 text-lg md:text-xl font-normal leading-relaxed">
                O SoulScore transforma ações sustentáveis em recompensas reais,
                incluindo conta de energia subsidiada.
              </p>
            </div>

            {/* Prova Social */}
            <div className="flex flex-wrap items-center gap-3">
              <img
                className="w-40 h-auto object-contain"
                src={avatarGroup}
                alt="Grupo de integrantes SoulMove"
              />
              <span className="text-blue-200 text-sm font-normal leading-relaxed">
                junte-se a milhares de movers
              </span>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center gap-4">
              <ButtonBase onClick={() => navigate("/solucao")}>
                Começar agora
              </ButtonBase>

              <button
                aria-label="Ver mais informações"
                className="w-12 h-12 flex justify-center items-center bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-blue-700 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Imagem Principal */}
          <img
            className="w-full md:w-1/2 max-w-140 aspect-square object-cover rounded-2xl shadow-lg"
            src={imgHeaderHomem}
            alt="Demonstração do aplicativo SoulMove no celular"
          />
        </section>

        {/* SEÇÃO 2: Como Funciona */}
        <section className="w-full flex flex-col gap-10 md:gap-14">
          <header className="flex flex-col gap-3">
            <span className="text-blue-600 font-semibold text-sm md:text-base tracking-wider uppercase">
              [ COMO FUNCIONA ]
            </span>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-medium text-stone-900 leading-tight lg:max-w-[624px]">
                É fácil transformar suas ações em pontos
              </h2>
              <p className="text-neutral-600 text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed lg:max-w-[600px]">
                O SoulScore transforma ações sustentáveis em recompensas reais,
                incluindo conta de energia subsidiada.
              </p>
            </div>
          </header>

          {/* Grid de Passos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="p-6 bg-blue-100 rounded-3xl flex flex-col justify-between gap-8 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <SmileIcon />
              </div>
              <div className="flex flex-col gap-4">
                <span className="self-start px-3 py-1 bg-indigo-50 text-blue-700 rounded-2xl text-sm font-medium">
                  Passo 01
                </span>
                <h3 className="text-blue-950 text-2xl font-medium leading-8">
                  Escolha
                </h3>
                <p className="text-blue-950/80 text-lg font-normal leading-relaxed">
                  Lista pré-definida ou missão do dia proposta pela plataforma.
                </p>
              </div>
            </article>

            <article className="p-6 bg-blue-600 text-white rounded-3xl flex flex-col justify-between gap-8 shadow-lg transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-400/30">
                <CameraIcon className="w-9 h-9 text-white" />
              </div>
              <div className="flex flex-col gap-4">
                <span className="self-start px-3 py-1 bg-white/20 text-white rounded-2xl text-sm font-medium backdrop-blur-sm">
                  Passo 02
                </span>
                <h3 className="text-2xl font-medium leading-8">Comprove</h3>
                <p className="text-blue-50 text-lg font-normal leading-relaxed">
                  Foto, vídeo ou app parceiro (Google Fit, Apple Health,
                  Strava).
                </p>
              </div>
            </article>

            <article className="p-6 bg-blue-100 rounded-3xl flex flex-col justify-between gap-8 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <ThumbsUpIcon />
              </div>
              <div className="flex flex-col gap-4">
                <span className="self-start px-3 py-1 bg-indigo-50 text-blue-700 rounded-2xl text-sm font-medium">
                  Passo 03
                </span>
                <h3 className="text-blue-950 text-2xl font-medium leading-8">
                  Valide
                </h3>
                <p className="text-blue-950/80 text-lg font-normal leading-relaxed">
                  Algoritmo atribui pontuação de 0 a 100 pelo impacto ambiental.
                </p>
              </div>
            </article>

            <article className="p-6 bg-blue-100 rounded-3xl flex flex-col justify-between gap-8 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <BarChartIcon />
              </div>
              <div className="flex flex-col gap-4">
                <span className="self-start px-3 py-1 bg-indigo-50 text-blue-700 rounded-2xl text-sm font-medium">
                  Passo 04
                </span>
                <h3 className="text-blue-950 text-2xl font-medium leading-8">
                  Pontue
                </h3>
                <p className="text-blue-950/80 text-lg font-normal leading-relaxed">
                  Top 1 global tem conta de energia 100% subsidiada.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* SEÇÃO 3: Ações & Missões */}
        <section className="w-full p-6 sm:p-8 md:p-12 bg-blue-950 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Coluna 1: Ações Pontuadas */}
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-3">
                <span className="text-blue-300 text-sm md:text-base font-normal tracking-wider uppercase">
                  [ AÇÕES ]
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-indigo-50 text-2xl md:text-3xl font-semibold leading-snug">
                    Ações pontuadas
                  </h2>
                  <p className="text-indigo-100/80 text-lg md:text-xl font-normal">
                    Pontuação base por impacto ambiental real.
                  </p>
                </div>
              </header>

              <div className="flex flex-col gap-4">
                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 text-2xl">
                    <img
                      src={iconTransporte}
                      alt="Ícone de transporte público"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Usar transporte público
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      GPS automático ou foto
                    </p>
                  </div>
                  <span className="text-yellow-600 font-semibold text-base md:text-lg shrink-0">
                    +30pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 text-2xl">
                    <img src={iconReciclagem} alt="Ícone de reciclagem" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Reciclagem correta
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Foto obrigatória
                    </p>
                  </div>
                  <span className="text-yellow-600 font-semibold text-base md:text-lg shrink-0">
                    +30pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 text-2xl">
                    <img src={iconBicicleta} alt="Ícone de bicicleta" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Andar de bike (min 5km)
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      GPS automático ou foto
                    </p>
                  </div>
                  <span className="text-yellow-600 font-semibold text-base md:text-lg shrink-0">
                    +30pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 text-2xl">
                    <img src={iconAndando} alt="Ícone de andando" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Andar a pé (min 2km)
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      GPS automático ou foto
                    </p>
                  </div>
                  <span className="text-yellow-600 font-semibold text-base md:text-lg shrink-0">
                    +30pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 text-2xl">
                    <img src={iconPlantar} alt="Ícone de plantar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Plantar ou cuidar
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Foto obrigatória
                    </p>
                  </div>
                  <span className="text-yellow-600 font-semibold text-base md:text-lg shrink-0">
                    +30pts
                  </span>
                </article>
              </div>
            </div>

            {/* Coluna 2: Missões / Desafios */}
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-3">
                <span className="text-blue-300 text-sm md:text-base font-normal tracking-wider uppercase">
                  [ MISSÕES ]
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-indigo-50 text-2xl md:text-3xl font-semibold leading-snug">
                    Desafios da semana
                  </h2>
                  <p className="text-indigo-100/80 text-lg md:text-xl font-normal">
                    Pontuação base por impacto ambiental real.
                  </p>
                </div>
              </header>

              <div className="flex flex-col gap-4">
                <article className="p-4 bg-blue-200 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 text-3xl">
                    <img src={iconReciclagem} alt="Ícone de reciclagem" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Semana da reciclagem
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Recicle 5 dias seguidos
                    </p>
                    <span className="mt-1 px-3 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Missão especial
                    </span>
                  </div>
                  <span className="text-blue-950 font-semibold text-base md:text-lg shrink-0">
                    +200pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 text-3xl">
                    <img src={iconTransporte} alt="" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Semana do transporte público
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Transporte público 3× essa semana
                    </p>
                    <span className="mt-1 px-3 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Missão especial
                    </span>
                  </div>
                  <span className="text-blue-950 font-semibold text-base md:text-lg shrink-0">
                    +200pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 text-3xl">
                    <img src={iconPlantar} alt="Ícone de plantar" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1 items-start">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Semana do verde na janela
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Plante e documente o crescimento
                    </p>
                    <span className="mt-1 px-3 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Missão especial
                    </span>
                  </div>
                  <span className="text-blue-950 font-semibold text-base md:text-lg shrink-0">
                    +200pts
                  </span>
                </article>

                <article className="p-4 bg-blue-100 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.01]">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 text-3xl">
                    <img src={iconAndando} alt="Ícone de andando" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h3 className="text-blue-950 text-base md:text-lg font-semibold truncate">
                      Semana da caminhada
                    </h3>
                    <p className="text-blue-950/80 text-xs md:text-sm font-normal">
                      Caminhada 3× essa semana
                    </p>
                  </div>
                  <span className="text-blue-950 font-semibold text-base md:text-lg shrink-0">
                    +200pts
                  </span>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: Sistema de Ranking */}
        <section className="w-full p-6 sm:p-8 md:p-12 bg-blue-100 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Coluna Principal de Informações */}
            <article className="flex flex-col gap-6">
              <header className="flex flex-col gap-3">
                <span className="text-blue-600 text-sm md:text-base font-normal tracking-wider uppercase">
                  [ SISTEMA DE RANKING ]
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-blue-950 text-2xl md:text-3xl font-semibold leading-snug">
                    Você pode ser o campeão do seu grupo e também o campeão
                    nacional
                  </h2>
                  <p className="text-blue-950/80 text-lg md:text-xl font-normal">
                    Dois níveis para manter a motivação em qualquer estágio.
                  </p>
                </div>
              </header>

              {/* Lista de Recursos / Benefícios */}
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 bg-blue-600 rounded-xl flex items-center justify-center">
                    <ZapIcon className="w-14 h-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 text-lg font-semibold">
                      Ranking Global
                    </h3>
                    <p className="text-blue-950/80 text-sm font-normal">
                      Todos os usuários. Renovado mensalmente. Top 1 tem conta
                      de energia subsidiada.
                    </p>
                  </div>
                </li>

                <li className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 bg-blue-600 rounded-xl flex items-center justify-center">
                    <ChartIcon className="w-14 h-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 text-lg font-semibold">
                      Recompensas escalonadas
                    </h3>
                    <p className="text-blue-950/80 text-sm font-normal">
                      Top 1: energia grátis. Top 10: descontos. Top 100: Pontos
                      ECOA bônus.
                    </p>
                  </div>
                </li>

                <li className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 bg-blue-600 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-14 h-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-950 text-lg font-semibold">
                      Streak de engajamento
                    </h3>
                    <p className="text-blue-950/80 text-sm font-normal">
                      Dias consecutivos multiplicam seus pontos. Não quebre o
                      streak!
                    </p>
                  </div>
                </li>
              </ul>
            </article>

            {/* Coluna da Imagem/Leaderboard */}
            <aside className="w-full flex justify-center items-center">
              <img
                src={imgRanking}
                alt="Ilustração do ranking"
                className="w-full max-w-lg h-auto object-contain rounded-2xl"
              />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
