import { NavLink } from "react-router";
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
      className="fixed inset-x-0 bottom-0 z-40 flex h-20 items-center justify-between border-t border-slate-100 bg-white px-6 md:inset-y-0 md:left-0 md:right-auto md:h-dvh md:w-24 md:flex-col md:justify-start md:border-r md:border-t-0 md:px-0 md:py-8"
      aria-label="Menu lateral principal"
    >
      <NavLink
        to="/solucao"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2545ed] transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        aria-label="Início da área interna — Solução"
        title="Solução"
      >
        <img src={logoSoulMove} alt="" className="h-5 w-5 object-contain" width={20} height={20} />
      </NavLink>

      <nav
        className="flex items-center gap-6 md:absolute md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-8"
        aria-label="Navegação principal"
      >
        <NavLink to="/metricas" className={estiloLink} aria-label="Métricas" title="Métricas">
          <IconeInicio />
        </NavLink>
        <NavLink to="/validacao" className={estiloLink} aria-label="Registrar ação" title="Registrar ação">
          <IconeAcao />
        </NavLink>
      </nav>
    </aside>
  );
}