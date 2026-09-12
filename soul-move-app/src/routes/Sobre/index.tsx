import { useEffect } from "react";
import { FaLeaf } from "react-icons/fa";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import { destaquesSobre, etapasSobre } from "../../data/SobreData";

export default function Sobre() {
  useEffect(() => {
    document.title = "Sobre | SoulMove";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#131b2e]">
      <Header />

      <main className="w-full overflow-x-hidden">
        {/* Apresentação principal da página Sobre */}
        <section
          className="mx-auto my-5 grid min-h-[420px] w-[calc(100%-32px)] max-w-[1200px] grid-cols-1 items-center gap-[30px] rounded-2xl bg-[#172554] p-6 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:p-[clamp(30px,5vw,60px)]"
          aria-labelledby="sobre-title"
        >
          <div className="min-w-0">
            <span className="mb-4 inline-block text-sm font-semibold tracking-[0.15em] text-[#f1f4ff]">
              [ SOBRE O PROJETO ]
            </span>

            <h1
              id="sobre-title"
              className="mb-5 max-w-[780px] text-[32px] font-semibold leading-tight text-[#f1f4ff] lg:text-[48px]"
            >
              O SoulMove transforma mobilidade sustentável em pontos, competição
              e recompensas.
            </h1>

            <p className="max-w-[660px] text-[17px] leading-7 text-[#f1f4ff] md:text-xl">
              Criada para transformar bons hábitos em benefícios concretos.
            </p>
          </div>

          {/* Card de resumo */}
          <div
            className="min-w-0 rounded-2xl bg-[#bfdbfe] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.12)] md:p-10"
            aria-label="Resumo do SoulMove"
          >
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172554] text-[28px] text-white"
              aria-hidden="true"
            >
              <FaLeaf />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-[#172554]">
              Gamificação sustentável
            </h2>

            <p className="text-base leading-7 text-[#172554]">
              Caminhada, bicicleta e transporte público viram pontuação e ajudam
              a mostrar o impacto ambiental positivo de cada usuário.
            </p>
          </div>
        </section>

        {/* Conceito do projeto */}
        <section
          className="mx-auto my-5 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-1 items-start gap-[30px] py-[30px] md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:gap-[clamp(30px,5vw,60px)] md:pb-5 md:pt-[60px]"
          aria-labelledby="sobre-conceito-title"
        >
          <div>
            <span className="mb-4 inline-block text-sm font-semibold tracking-[0.15em] text-[#172554]">
              [ CONCEITO ]
            </span>

            <h2
              id="sobre-conceito-title"
              className="mb-5 text-[30px] font-semibold leading-tight text-[#172554] md:text-[36px]"
            >
              Uma ideia simples para gerar mudança real
            </h2>

            <div className="flex flex-col gap-4">
              <p className="text-lg leading-7 text-[#3c4a42]">
                O SoulMove é uma solução desenvolvida para o desafio SoulUp, com
                o objetivo de incentivar práticas sustentáveis por meio de
                gamificação. A ideia é simples: boas ações geram pontos, pontos
                geram competição, e competição gera engajamento contínuo.
              </p>

              <p className="text-lg leading-7 text-[#3c4a42]">
                Cada ação registrada — caminhar, reciclar, usar transporte
                público ou plantar — é avaliada pelo seu impacto ambiental real
                e convertida em pontuação. O resultado aparece no ranking e, com
                ele, a chance de conquistar recompensas concretas dentro da
                plataforma.
              </p>
            </div>
          </div>

          {/* Cards dos pilares */}
          <div className="grid gap-4" aria-label="Pilares do SoulMove">
            {destaquesSobre.map((destaque) => {
              const Icone = destaque.icone;

              return (
                <article
                  key={destaque.id}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
                >
                  <div
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#172554] text-[22px] text-white"
                    aria-hidden="true"
                  >
                    <Icone />
                  </div>

                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-[#172554]">
                      {destaque.titulo}
                    </h3>

                    <p className="text-base leading-6 text-[#3c4a42]">
                      {destaque.descricao}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Fluxo de funcionamento */}
        <section
          className="mx-auto my-5 w-[calc(100%-32px)] max-w-[1200px] rounded-2xl bg-[#bfdbfe] p-6 md:p-[clamp(30px,5vw,60px)]"
          aria-labelledby="sobre-fluxo-title"
        >
          <span className="mb-4 inline-block text-sm font-semibold tracking-[0.15em] text-[#172554]">
            [ FLUXO ]
          </span>

          <div className="mb-[30px] grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] md:gap-[clamp(20px,4vw,50px)]">
            <h2
              id="sobre-fluxo-title"
              className="text-[30px] font-semibold leading-tight text-[#172554] md:text-[36px]"
            >
              Como o SoulMove funciona na prática
            </h2>

            <p className="text-lg leading-7 text-[#3c4a42]">
              O usuário registra suas ações, acumula pontos, acompanha sua
              posição no ranking e pode conquistar recompensas de acordo com seu
              desempenho.
            </p>
          </div>

          {/* Cards com as etapas */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {etapasSobre.map((etapa) => {
              const Icone = etapa.icone;

              return (
                <article
                  key={etapa.id}
                  className="min-w-0 rounded-2xl bg-white p-6 shadow-[0_4px_10px_rgba(0,0,0,0.08)] lg:p-8"
                >
                  <div
                    className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#172554] text-2xl text-white"
                    aria-hidden="true"
                  >
                    <Icone />
                  </div>

                  <span className="mb-3 inline-block rounded-2xl bg-[#bfdbfe] px-3 py-2 text-xs font-semibold text-[#172554]">
                    {etapa.passo}
                  </span>

                  <h3 className="mb-2 text-xl font-semibold text-[#172554]">
                    {etapa.titulo}
                  </h3>

                  <p className="text-base leading-7 text-[#3c4a42]">
                    {etapa.descricao}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
