import logoSoulMove from '../../assets/logo/LogoSoulMoveIndigo.png';
// OBS: Substitua a logo acima por uma versão clara/branca da logo, se você tiver, 
// já que o fundo do footer é azul escuro (bg-blue-950).

// --- MOLÉCULA: Coluna de Links do Footer ---
interface FooterColumnProps {
    title: string;
    links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="flex-1 flex flex-col items-start gap-1">
            {/* Título da coluna (ex: [ PÁGINAS ]) */}
            <h3 className="w-full text-left text-blue-300 text-base font-normal leading-6 uppercase tracking-wider">
                {title}
            </h3>
            {/* Lista de links */}
            <ul className="flex flex-col w-full">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            className="text-indigo-50 text-lh font-normal leading-8 hover:text-white hover:underline transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// --- ORGANISMO: O Footer Completo ---
export function Footer() {
    // Dados dos links separados da estrutura visual
    const paginasLinks = [
        { label: 'Home', href: '/' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Integrantes', href: '/integrantes' },
        { label: 'Perguntas', href: '/faq' },
        { label: 'Contato', href: '/contato' },
    ];

    const parceirosLinks = [
        { label: 'SoulUp', href: 'https://soulup.com.br' }, // Coloque os links reais depois
        { label: 'FIAP', href: 'https://fiap.com.br' },
    ];

    return (
        // Removi a largura fixa (w-[1280px]) e coloquei w-full para se adaptar melhor a diferentes telas
        <footer className="w-full p-12 bg-blue-950 flex flex-col justify-start items-center mt-5 pb-0">

            {/* 1. SEÇÃO SUPERIOR (Logo + Texto vs Colunas de Links) */}
            <div className="w-full flex justify-around items-start flex-wrap md:flex-nowrap mb-4">

                {/* Bloco da Esquerda (Logo e Descrição) */}
                <div className="w-full md:w-96 flex flex-col justify-start items-start gap-3">

                    {/* Logo da Marca (Usando o padrão que você já fez no Header) */}
                    <a href="/" className="flex items-center gap-3">
                        <img src={logoSoulMove} alt="Logotipo SoulMove" className="h-5 w-auto" />
                    </a>
                    <span className="text-indigo-50 text-xl font-semibold leading-8">
                        BitLab
                    </span>

                    {/* Descrição do Projeto */}
                    <p className="text-indigo-50 text-md font-normal max-w-[350px]">
                        Sistema de Gamificação Sustentável <br />
                        FIAP Challenge 2026, Desafio 1. <br />
                        Parceria com SoulUp by Prospera.
                    </p>
                </div>

                {/* Bloco da Direita (Colunas de Links) */}
                <div className="w-full md:w-[560px] flex justify-start items-start gap-12">
                    <FooterColumn title="[ PÁGINAS ]" links={paginasLinks} />
                    <FooterColumn title="[ PARCEIROS ]" links={parceirosLinks} />
                </div>

            </div>

            {/* 2. LINHA DIVISÓRIA */}
            <div className="w-full h-px bg-blue-800" />

            {/* 3. SEÇÃO INFERIOR (Copyright) */}
            <div className="w-full text-center py-5">
                <p className="text-indigo-50 text-md font-normal">
                    © 2026 SoulMove • Projeto Acadêmico
                </p>
            </div>

        </footer>
    );
}

export default Footer;