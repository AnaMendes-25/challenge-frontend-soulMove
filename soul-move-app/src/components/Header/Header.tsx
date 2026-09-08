import type { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import ButtonBase from '../ButtonBase/ButtonBase';
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';

interface NavItemProps {
  to: string;
  children: ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  const baseClasses = "px-3 py-1.5 md:px-3.5 md:py-2 rounded-3xl flex justify-center items-center gap-2 text-xs md:text-sm font-semibold leading-5 transition-all duration-300 cursor-pointer whitespace-nowrap";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${isActive
          ? "bg-[#2563eb] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-[#2563eb]"
          : "text-neutral-600 hover:bg-blue-200 hover:text-blue-800"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between lg:justify-around w-11/12 md:w-4/5 mx-auto py-4 md:py-6 mb-5 gap-4 md:gap-6">
      {/* Logo com altura controlada para não distorcer */}
      <Link to="/" className="flex items-center shrink-0">
        <img
          src={logoSoulMove}
          alt="Logotipo SoulMove na cor azul"
          className="w-auto min-w-30  shrink-0"
        />
      </Link>

      {/* Menu com rolagem suave no celular se a tela for muito pequena */}
      <nav className="max-w-full overflow-x-auto px-2 py-1.5 md:px-2.5 md:py-3 bg-blue-100 rounded-3xl inline-flex justify-start md:justify-center items-center gap-1 sm:gap-3 md:gap-5 no-scrollbar">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/sobre">Sobre</NavItem>
        <NavItem to="/integrantes">Integrantes</NavItem>
        <NavItem to="/faq">Perguntas</NavItem>
        <NavItem to="/contato">Contato</NavItem>
      </nav>

      {/* Botão com shrink-0 para não achatar */}
      <div className="shrink-0">
        <ButtonBase onClick={() => navigate('/solucao')}>
          Começar agora
        </ButtonBase>
      </div>
    </header>
  );
}

export default Header;