import { Link } from "react-router";
import logoSoulMove from "../../assets/logo/LogoSWhite.png";

// Ícones em SVG evitam a necessidade de carregar Font Awesome por CDN.
function IconeLampada() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6M10 22h4M8.5 15.5a7 7 0 1 1 7 0c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z" />
    </svg>
  );
}

function IconeGrafico() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20V7" />
    </svg>
  );
}

function IconeMais() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function AsideBar() {
  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 flex h-20 items-center justify-around bg-blue-500 px-4 text-white shadow-2xl md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-24 md:flex-col md:justify-start md:gap-10 md:px-0 md:py-7"
      aria-label="Menu lateral principal"
    >
        <Link
          to="/"
          className="hidden rounded-xl p-2 transition hover:bg-white/10 md:block"
          aria-label="Página inicial SoulMove"
        >
          <img src={logoSoulMove} alt="Logo SoulMove" className="h-11 w-11 object-contain" />
        </Link>

        <nav className="flex items-center gap-4 md:flex-col" aria-label="Navegação principal">
          <Link
            to="/solucao"
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-blue-200 transition hover:bg-white/10 hover:text-white"
            aria-label="Solução"
          >
            <IconeLampada />
          </Link>

          <Link
            to="/metricas"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-950/30"
            aria-label="Métricas"
            aria-current="page"
          >
            <IconeGrafico />
          </Link>

          <Link
            to="/validacao"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-950 shadow-lg transition hover:scale-105 hover:bg-blue-50"
            aria-label="Registrar ação"
          >
            <IconeMais />
          </Link>
        </nav>
    </aside>
  );
}
