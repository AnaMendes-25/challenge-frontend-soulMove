import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import ButtonBase from '../ButtonBase/ButtonBase'; 
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';

interface NavItemProps {
  to: string;
  children: ReactNode;
}


function NavItem({ to, children }: NavItemProps) {
  const baseClasses = "px-3.5 py-2 rounded-3xl flex justify-center items-center gap-2 overflow-hidden text-sm font-semibold leading-5 transition-colors duration-200 cursor-pointer";
  
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `${baseClasses} ${
          isActive
            ? "bg-blue-600 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-blue-600"
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
    <header className="flex justify-between items-center p-4 w-full">
      {/* Usando Link para a logo voltar à home sem dar F5 */}
      <Link to="/" className="flex items-center">
        <img src={logoSoulMove} alt="Logotipo SoulMove na cor azul" className="h-7 w-auto" />
      </Link>
        
      {/* MOLÉCULA: Menu de Navegação com rotas internas */}
      <nav className="px-2.5 py-2 bg-blue-100 rounded-3xl inline-flex justify-start items-center gap-6">
        <NavItem to="/">home</NavItem>
        <NavItem to="/sobre">sobre</NavItem>
        <NavItem to="/integrantes">integrantes</NavItem>
        <NavItem to="/perguntas">perguntas</NavItem>
        <NavItem to="/contato">contato</NavItem>
      </nav>

      {/* ÁTOMO: Botão Principal */}
      <ButtonBase onClick={() => console.log('Clicou no botão do Header!')}>
        Começar agora
      </ButtonBase>
    </header>
  );
}

export default Header;