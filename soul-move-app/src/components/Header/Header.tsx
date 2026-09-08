import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import ButtonBase from '../ButtonBase/ButtonBase';
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';

interface NavItemProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

function NavItem({ to, children, onClick }: NavItemProps) {
  // Adicionado scale e transições refinadas
  const baseClasses = "px-4 py-2 lg:px-4 lg:py-2.5 rounded-3xl flex justify-center items-center gap-2 text-sm font-medium transition-all duration-300 ease-out cursor-pointer whitespace-nowrap w-full lg:w-auto";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClasses} ${isActive
          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
          : "text-neutral-600 hover:bg-blue-200/60 hover:text-blue-900 hover:scale-[1.02]"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between lg:justify-around w-11/12 md:w-4/5 mx-auto py-4 md:py-6 mb-5 gap-4 lg:gap-6 relative z-50">
      
      {/* Linha superior / Mobile & Tablet (< 1024px) */}
      <div className="w-full flex items-center justify-between lg:w-auto">
        <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <img
            src={logoSoulMove}
            alt="Logotipo SoulMove na cor azul"
            className="w-32 md:w-40 max-w-[160px] h-auto shrink-0 object-contain"
          />
        </Link>

        {/* Botão Hambúrguer com hover refinado */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2.5 rounded-2xl bg-blue-50 text-blue-900 focus:outline-none hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
          aria-label="Abrir menu de navegação"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navegação */}
      <nav className={`
        w-full lg:w-auto 
        ${isOpen ? 'flex' : 'hidden'} lg:flex 
        flex-col lg:flex-row 
        items-center justify-center 
        gap-2 lg:gap-3 
        bg-blue-50/80 backdrop-blur-md
        p-4 lg:px-2.5 lg:py-2 
        rounded-3xl 
        transition-all duration-300 shadow-xl lg:shadow-none border border-blue-100/50 lg:border-none
      `}>
        <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
        <NavItem to="/sobre" onClick={() => setIsOpen(false)}>Sobre</NavItem>
        <NavItem to="/integrantes" onClick={() => setIsOpen(false)}>Integrantes</NavItem>
        <NavItem to="/faq" onClick={() => setIsOpen(false)}>Perguntas</NavItem>
        <NavItem to="/contato" onClick={() => setIsOpen(false)}>Contato</NavItem>
      </nav>

      {/* Botão de Ação */}
      <div className={`w-full lg:w-auto flex justify-center ${isOpen ? 'flex' : 'hidden'} lg:flex shrink-0`}>
        <div className="transition-transform duration-200 hover:scale-105 active:scale-95">
          <ButtonBase onClick={() => console.log('Clicou no botão do Header!')}>
            Começar agora
          </ButtonBase>
        </div>
      </div>
    </header>
  );
}