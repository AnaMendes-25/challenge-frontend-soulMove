import { NavLink } from "react-router";
import { FiBarChart2, FiSliders, FiUser } from "react-icons/fi";
import logoSoulMove from "../../assets/logo/LogoSWhite.png";

function IconeInicio() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

function IconeAcao() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

const estiloLink = ({ isActive }: { isActive: boolean }) =>
  `flex h-11 w-11 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
    isActive
      ? "bg-blue-50 text-[#2545cd]"
      : "text-[#6681d1] hover:bg-blue-50 hover:text-[#2545cd]"
  }`;

export default function AsideBar() {
  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 flex h-20 items-center justify-between border-t border-slate-100 bg-white px-2 sm:px-4 md:inset-y-0 md:left-0 md:right-auto md:h-dvh md:w-24 md:flex-col md:justify-start md:border-r md:border-t-0 md:px-0 md:py-8"
      aria-label="Menu lateral principal"
    >
      <NavLink
        to="/"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2545ed] transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        aria-label="Página inicial SoulMove"
        title="Página inicial"
      >
        <img src={logoSoulMove} alt="" className="h-5 w-5 object-contain" width={20} height={20} />
      </NavLink>

      <nav
        className="flex items-center gap-1 sm:gap-3 md:absolute md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-8"
        aria-label="Navegação principal"
      >
        <NavLink to="/solucao" className={estiloLink} aria-label="Solução" title="Solução">
          <IconeInicio />
        </NavLink>
        <NavLink to="/metricas" className={estiloLink} aria-label="Métricas" title="Métricas">
          <FiBarChart2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" focusable="false" />
        </NavLink>
        <NavLink to="/validacao" className={estiloLink} aria-label="Registrar ação" title="Registrar ação">
          <IconeAcao />
        </NavLink>
      </nav>
      <div className="flex items-center gap-1 sm:gap-3 md:mt-auto md:flex-col md:gap-3" role="group" aria-label="Conta e configurações">
        {/* Ativar os controles quando a tela de conta da issue #8 estiver disponível. */}
        <button
          type="button"
          disabled
          aria-label="Configurações — indisponível no momento"
          title="Configurações — em breve"
          className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg text-[#6681d1]"
        >
          <FiSliders className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" focusable="false" />
        </button>
        <button
          type="button"
          disabled
          aria-label="Minha conta — indisponível no momento"
          title="Minha conta — em breve"
          className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500"
        >
          <FiUser className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" focusable="false" />
        </button>
      </div>
    </aside>
  );
}