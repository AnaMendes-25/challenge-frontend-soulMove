import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ButtonBase from "../../components/ButtonBase/ButtonBase";


export default function Home() {
  return (
    <div>
      <Header/>
      <main>
        <section className="w-full max-w-6xl mx-auto p-8 md:p-12 bg-blue-950 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-12">
      
      {/* Bloco de Texto (Esquerda no desktop, Topo no mobile) */}
      <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-12">
        
        {/* Títulos e Descrição */}
        <div className="w-full flex flex-col gap-4">
          <span className="text-blue-300 text-base font-normal tracking-wide uppercase">
            [ SOULMOVE ]
          </span>
          
          {/* 2. SEMÂNTICA: O título principal da página DEVE ser um <h1> */}
          <h1 className="text-indigo-50 text-5xl font-semibold leading-tight">
            Boas ações merecem recompensa de verdade.
          </h1>
          
          {/* 3. SEMÂNTICA: Textos descritivos devem ser parágrafos <p> */}
          <p className="text-indigo-50 text-lg md:text-xl font-normal leading-relaxed">
            O SoulScore transforma ações sustentáveis em recompensas reais, incluindo conta de energia subsidiada.
          </p>
        </div>

        {/* Prova Social (Avatares e texto) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex -space-x-3"> {/* -space-x-3 faz as imagens ficarem sobrepostas */}
            {/* 4. ACESSIBILIDADE: Imagens decorativas recebem alt="" vazio para o leitor de tela pular */}
            <img className="w-10 h-10 rounded-full border-2 border-blue-950 object-cover" src="https://placehold.co/40x40" alt="" />
            <img className="w-10 h-10 rounded-full border-2 border-blue-950 object-cover" src="https://placehold.co/40x40" alt="" />
            <img className="w-10 h-10 rounded-full border-2 border-blue-950 object-cover" src="https://placehold.co/40x40" alt="" />
            <img className="w-10 h-10 rounded-full border-2 border-blue-950 object-cover" src="https://placehold.co/40x40" alt="" />
          </div>
          <span className="text-blue-200 text-sm font-normal">
            junte-se a milhares de movers
          </span>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          
          {/* 5. ATOMIC DESIGN: Reutilizando o seu botão! */}
          <ButtonBase onClick={() => console.log('Começar')}>
            Começar agora
          </ButtonBase>

          {/* Botão Secundário (Ícone de Play ou Seta) */}
          {/* O Figma desenhou um ícone com divs. O ideal é usar a tag <button> e colocar um SVG real dentro. */}
          <button 
            aria-label="Ver mais informações"
            className="w-12 h-12 flex justify-center items-center bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            {/* Exemplo de um ícone SVG real de seta em vez da "sopa de divs" do Figma */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-700 stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
      </div>

      {/* Imagem Principal (Direita no desktop, Baixo no mobile) */}
      {/* 6. RESPONSIVIDADE: Deixamos a imagem adaptável em vez de cravada em 560px */}
      <img 
        className="w-full md:w-1/2 max-w-[560px] aspect-square object-cover rounded-2xl shadow-lg" 
        src="https://placehold.co/560x560" 
        alt="Demonstração do aplicativo SoulMove no celular" 
      />
      
    </section>

    
      </main>
      <Footer/>
    </div>
  )
}
