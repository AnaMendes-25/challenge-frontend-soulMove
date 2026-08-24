import type { ReactNode } from 'react';
import ButtonBase from '../ButtonBase/ButtonBase'; 
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';
// --- ÁTOMO: O item individual de navegação ---
// Se preferir, você pode colocar este componente em um arquivo separado 
// (ex: src/components/NavItem/NavItem.tsx) e importá-lo aqui.
interface NavItemProps {
  href: string;
  children: ReactNode;
  isActive?: boolean;
}

function NavItem({ href, children, isActive = false }: NavItemProps) {
  const baseClasses = "px-3.5 py-2 rounded-3xl flex justify-center items-center gap-2 overflow-hidden text-sm font-semibold leading-5 transition-colors duration-200 cursor-pointer";
  
  const stateClasses = isActive
    ? "bg-blue-600 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-blue-600"
    : "text-neutral-600 hover:bg-blue-200 hover:text-blue-800"; 

  return (
    <a href={href} className={`${baseClasses} ${stateClasses}`}>
      {children}
    </a>
  );
}

// --- ORGANISMO: O Header que une a navegação e o botão ---
function Header() {
  return (
    // O header recebe padding e flex para separar os elementos na tela
    <header className="flex justify-between items-center p-4 w-full">
    <a href="/" className="flex items-center">
         <img src={logoSoulMove} alt="Logotipo SoulMove na cor azul" className="h-7 w-auto" />
       </a>
       
      {/* MOLÉCULA: O Menu de Navegação */}
      <nav className="px-2.5 py-2 bg-blue-100 rounded-3xl inline-flex justify-start items-center gap-6">
        <NavItem href="/" isActive>home</NavItem>
        <NavItem href="/sobre">sobre</NavItem>
        <NavItem href="/integrantes">integrantes</NavItem>
        <NavItem href="/perguntas">perguntas</NavItem>
        <NavItem href="/contato">contato</NavItem>
      </nav>

      {/* ÁTOMO: O Botão Principal */}
      <ButtonBase onClick={() => console.log('Clicou no botão do Header!')}>
        Começar agora
      </ButtonBase>

    </header>
  );
}

export default Header;