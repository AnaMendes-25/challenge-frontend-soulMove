import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import ButtonBase from '../ButtonBase/ButtonBase'; 
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';

interface NavItemProps {
  to: string;
  children: ReactNode;
}


function NavItem({ to, children }: NavItemProps) {
  const baseClasses = "px-3.5 py-2 rounded-3xl flex justify-center items-center gap-2 overflow-hidden text-sm font-semibold leading-5 transition-all duration-300 cursor-pointer";
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `${baseClasses} ${
          isActive
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
  return (
    <header className="flex items-center justify-around w-4/5 justify-self-center py-6 mb-5">
      {/* Usando Link para a logo voltar à home sem dar F5 */}
      <Link to="/" className="flex items-center">
        <img src={logoSoulMove} alt="Logotipo SoulMove na cor azul" className="w-auto" />
      </Link>
        
      {/* MOLÉCULA: Menu de Navegação com rotas internas */}
      <nav className="px-2.5 py-3 bg-blue-100 rounded-3xl inline-flex justify-start items-center gap-5">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/sobre">Sobre</NavItem>
        <NavItem to="/integrantes">Integrantes</NavItem>
        <NavItem to="/faq">Perguntas</NavItem>
        <NavItem to="/contato">Contato</NavItem>
      </nav>

      {/* ÁTOMO: Botão Principal */}
      <ButtonBase onClick={() => console.log('Clicou no botão do Header!')}>
        Começar agora
      </ButtonBase>
    </header>
  );
}

export default Header;