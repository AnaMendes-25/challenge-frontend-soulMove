import { Link, NavLink } from "react-router";
import logoSoulMove from "../../assets/logo/LogoSWhite.png";

// Ícones em SVG evitam a necessidade de carregar Font Awesome por CDN.
function IconeLampada() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18h6M10 22h4M8.5 15.5a7 7 0 1 1 7 0c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z" />
    </svg>
  );
}

function IconeGrafico() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 20V10M10 20V4M16 20v-7M22 20V7" />
    </svg>
  );
}

function IconeMais() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function AsideBar() {
  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 grid h-20 grid-cols-[1fr_auto_1fr] items-center bg-blue-500 px-3 text-white shadow-2xl md:flex md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-24 md:flex-col md:justify-start md:gap-10 md:px-0 md:py-7"
      aria-label="Menu lateral principal"
    >
      <Link
        to="/"
        className="flex h-10 w-20 items-center justify-center justify-self-start rounded-xl p-2 transition hover:bg-white/10 md:h-auto md:w-auto md:justify-self-auto"
        aria-label="Página inicial SoulMove"
      >
        <img
          src={logoSoulMove}
          alt="Logo SoulMove"
          className="h-5 w-auto object-contain md:h-6"
          width={100}
          height={100}
        />
      </Link>

      <nav
        className="flex items-center justify-self-center gap-4 md:justify-self-auto md:flex-col"
        aria-label="Navegação principal"
      >
        <NavLink
          to="/solucao"
          className={({ isActive }) =>
            `flex h-12 w-12 items-center justify-center rounded-2xl transition ${
              isActive
                ? "bg-white text-blue-950 shadow-lg"
                : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`
          }
          aria-label="Solução"
        >
          <IconeLampada />
        </NavLink>

        <NavLink
          to="/metricas"
          className={({ isActive }) =>
            `flex h-12 w-12 items-center justify-center rounded-2xl transition ${
              isActive
                ? "bg-white text-blue-950 shadow-lg"
                : "text-blue-200 hover:bg-white/10 hover:text-white"
            }`
          }
          aria-label="Métricas"
        >
          <IconeGrafico />
        </NavLink>

        <Link
          to="/validacao"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-950 shadow-lg transition hover:scale-105 hover:bg-blue-50"
          aria-label="Registrar ação"
        >
          <IconeMais />
        </Link>
      </nav>

      <span className="md:hidden" aria-hidden="true" />
    </aside>
  );
}
