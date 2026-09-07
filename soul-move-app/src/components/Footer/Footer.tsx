import { Link } from 'react-router';
import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';
// OBS: Substitua a logo acima por uma versão clara/branca da logo, se você tiver, 
// já que o fundo do footer é azul escuro (bg-blue-950).

// --- MOLÉCULA: Coluna de Links do Footer ---
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col items-start gap-2 min-w-[140px]">
      {/* Título da coluna (ex: [ PÁGINAS ]) */}
      <h3 className="w-full text-left text-blue-300 text-sm md:text-base font-semibold leading-6 uppercase tracking-wider">
        {title}
      </h3>
      {/* Lista de links */}
      <ul className="flex flex-col w-full gap-1">
        {links.map((link, index) => {
          const isExternal = link.href.startsWith('http');

          return (
            <li key={index}>
              {isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-50 text-sm md:text-base font-normal leading-7 hover:text-white hover:underline transition-colors duration-200 block"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-indigo-50 text-sm md:text-base font-normal leading-7 hover:text-white hover:underline transition-colors duration-200 block"
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// --- ORGANISMO: O Footer Completo ---
export function Footer() {
  const paginasLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Integrantes', href: '/integrantes' },
    { label: 'Perguntas', href: '/faq' },
    { label: 'Contato', href: '/contato' },
  ];

  const parceirosLinks = [
    { label: 'SoulUp', href: 'https://soulup.com.br' },
    { label: 'FIAP', href: 'https://fiap.com.br' },
  ];

  return (
    <footer className="w-full bg-blue-950 text-indigo-50 mt-10">
      {/* Container Principal Centralizado */}
      <div className="w-11/12 md:w-4/5 mx-auto pt-10 pb-6 flex flex-col justify-start items-center">
        
        {/* 1. SEÇÃO SUPERIOR */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-8">
          
          {/* Bloco da Esquerda (Logo e Descrição) */}
          <div className="w-full md:w-1/2 lg:w-96 flex flex-col items-start gap-3">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img 
                src={logoSoulMove} 
                alt="Logotipo SoulMove" 
                className="h-6 md:h-8 w-auto shrink-0 object-contain" 
              />
            </Link>
            
            <span className="text-white text-lg md:text-xl font-semibold leading-tight">
              BitLab
            </span>

            <p className="text-indigo-100 text-sm md:text-base font-normal leading-relaxed max-w-sm">
              Sistema de Gamificação Sustentável <br />
              FIAP Challenge 2026, Desafio 1. <br />
              Parceria com SoulUp by Prospera.
            </p>
          </div>

          {/* Bloco da Direita (Colunas de Links) */}
          <div className="w-full md:w-auto grid grid-cols-2 sm:flex sm:justify-start gap-8 md:gap-16">
            <FooterColumn title="[ PÁGINAS ]" links={paginasLinks} />
            <FooterColumn title="[ PARCEIROS ]" links={parceirosLinks} />
          </div>

        </div>

        {/* 2. LINHA DIVISÓRIA */}
        <div className="w-full h-px bg-blue-800/80 my-2" />

        {/* 3. SEÇÃO INFERIOR (Copyright) */}
        <div className="w-full text-center pt-4">
          <p className="text-indigo-200 text-xs md:text-sm font-normal">
            © 2026 SoulMove • Projeto Acadêmico
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;