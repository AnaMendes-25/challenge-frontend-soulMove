import { useEffect, useState } from "react";
import { Link } from "react-router";
import AsideBar from "../../../components/AsideBar/AsideBar";
import { problemas, etapas } from "../../../types/SolucaoTypes";

export default function Solucao() {
  // Controla a exibição do fluxo completo.
  const [mostrarFluxo, setMostrarFluxo] = useState(false);

  // Altera o título exibido na aba do navegador.
  useEffect(() => {
    document.title = "SoulMove | Solução";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AsideBar />

      <main className="pb-24 md:ml-24 md:pb-0">
        {/* Apresentação principal da solução */}
        <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Solução SoulMove
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-blue-950 sm:text-5xl lg:text-6xl">
              Uma plataforma que transforma atitudes sustentáveis em pontos,
              missões e evolução real.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A solução permite que o usuário registre ações como caminhada, uso
              de transporte público, trajeto de bike, reciclagem e economia de
              energia. Depois, ele acompanha seu desempenho por meio de
              métricas, ranking, missões e recompensas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#problema"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Entender o problema
              </a>

              <a
                href="#demonstracao"
                className="rounded-2xl border border-blue-600 px-6 py-3 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Ver demonstração
              </a>
            </div>
          </div>

          {/* Painel visual */}
          <aside
            className="rounded-4xl bg-blue-950 p-5 shadow-2xl sm:p-7"
            aria-label="Resumo da solução"
          >
            <div className="rounded-3xl bg-blue-600 p-6 text-white">
              <span className="text-sm font-semibold tracking-wider text-blue-100">
                MOVE POINTS
              </span>

              <strong className="mt-5 block text-3xl">Pontos ilimitados</strong>

              <small className="mt-3 block text-blue-100">
                ↑ Sobe posições no ranking
              </small>
            </div>

            <div className="mt-4 rounded-3xl bg-white p-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"
                  aria-hidden="true"
                >
                  +
                </span>

                <strong className="text-blue-950">Registrar ações</strong>
              </div>

              <p className="mt-4 leading-relaxed text-slate-600">
                Usuário envia comprovantes e descreve suas atividades
                sustentáveis.
              </p>
            </div>

            <div className="mt-4 rounded-3xl bg-blue-50 p-6">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-blue-950">Métricas</strong>

                <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800">
                  Dashboard
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-slate-600">
                Usuário acompanha pontos, missões, ranking e recompensas.
              </p>
            </div>
          </aside>
        </section>

        {/* Problema identificado */}
        <section
          className="scroll-mt-8 bg-white px-5 py-20 sm:px-8 lg:px-12"
          id="problema"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Problema identificado
              </span>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">
                O que a SoulMove resolve?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                O problema não é apenas a falta de informação sobre
                sustentabilidade. Muitas pessoas sabem que pequenas atitudes
                ajudam o meio ambiente, mas não possuem incentivo,
                acompanhamento ou uma forma prática de transformar essas
                atitudes em hábito.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {problemas.map((problema) => (
                <article
                  key={problema.numero}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <span className="text-4xl font-bold text-blue-200">
                    {problema.numero}
                  </span>

                  <h3 className="mt-8 text-xl font-bold text-blue-950">
                    {problema.titulo}
                  </h3>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    {problema.descricao}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionamento da solução */}
        <section
          className="scroll-mt-8 bg-blue-950 px-5 py-20 text-white sm:px-8 lg:px-12"
          id="como-funciona"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Funcionamento da solução
              </span>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Como o sistema funciona na prática?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-blue-100">
                A solução é dividida em páginas funcionais. Primeiro, o usuário
                registra uma ação sustentável. Depois, acompanha sua evolução na
                página de métricas.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {etapas.map((etapa) => (
                <article
                  key={etapa.numero}
                  className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm transition hover:bg-white/15"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                    {etapa.numero}
                  </span>

                  <h3 className="mt-7 text-xl font-bold">{etapa.titulo}</h3>

                  <p className="mt-3 leading-relaxed text-blue-100">
                    {etapa.descricao}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Demonstração das páginas funcionais */}
        <section
          className="scroll-mt-8 bg-slate-50 px-5 py-20 sm:px-8 lg:px-12"
          id="demonstracao"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Demonstração funcional
              </span>

              <h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">
                Páginas que demonstram a solução
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                A SoulMove possui páginas dedicadas ao funcionamento da solução,
                usando elementos reais de interface como cards, formulários,
                upload, ranking, missões, progresso e pontuação.
              </p>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div
                className="flex flex-col gap-3 sm:flex-row"
                role="tablist"
                aria-label="Demonstração da solução"
              >
                <Link
                  to="/validacao"
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Registrar ações
                </Link>

                <Link
                  to="/metricas"
                  className="rounded-2xl bg-blue-50 px-6 py-3 text-center font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Métricas
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setMostrarFluxo((estadoAnterior) => !estadoAnterior)
                  }
                  className="cursor-pointer rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  aria-expanded={mostrarFluxo}
                  aria-controls="fluxo-completo"
                >
                  {mostrarFluxo ? "Ocultar fluxo" : "Fluxo completo"}
                </button>
              </div>

              {mostrarFluxo && (
                <article
                  className="mt-8 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-2"
                  id="fluxo-completo"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-blue-950">
                      Fluxo completo da experiência
                    </h3>

                    <p className="mt-4 leading-relaxed text-slate-600">
                      As páginas funcionam juntas. A página de registro coleta
                      as ações sustentáveis e a página de métricas transforma
                      essas informações em acompanhamento visual, pontuação,
                      ranking e recompensas.
                    </p>

                    <ul className="mt-6 space-y-3 text-slate-700">
                      <li>✓ O usuário realiza uma ação sustentável.</li>
                      <li>✓ Registra a atividade com comprovante.</li>
                      <li>✓ A ação é avaliada e convertida em pontos.</li>
                      <li>✓ O desempenho aparece no painel de métricas.</li>
                      <li>
                        ✓ O usuário se mantém engajado por ranking, missões e
                        recompensas.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["1", "Registrar ação", "Upload + descrição"],
                      ["2", "Validar atividade", "Avaliação da ação"],
                      ["3", "Gerar pontos", "Move Points"],
                      ["4", "Acompanhar evolução", "Métricas"],
                    ].map(([numero, titulo, descricao]) => (
                      <div
                        key={numero}
                        className="flex items-center gap-4 rounded-2xl bg-blue-50 p-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                          {numero}
                        </span>

                        <div>
                          <strong className="block text-blue-950">
                            {titulo}
                          </strong>

                          <small className="text-slate-600">{descricao}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* Resultado esperado */}
        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Resultado esperado
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-blue-950 sm:text-4xl">
                A SoulMove transforma pequenas atitudes em uma jornada de
                engajamento sustentável.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                A proposta da plataforma é incentivar a mudança de comportamento
                por meio de uma experiência simples, visual e interativa. O
                usuário não apenas registra ações: ele acompanha sua evolução,
                participa de missões e enxerga valor em manter hábitos mais
                sustentáveis.
              </p>
            </div>

            <div className="space-y-4">
              <article className="rounded-3xl bg-blue-50 p-6">
                <strong className="text-xl text-blue-950">
                  Mais participação
                </strong>

                <span className="mt-2 block leading-relaxed text-slate-600">
                  A gamificação aumenta o interesse do usuário em registrar
                  ações sustentáveis.
                </span>
              </article>

              <article className="rounded-3xl bg-blue-50 p-6">
                <strong className="text-xl text-blue-950">Mais controle</strong>

                <span className="mt-2 block leading-relaxed text-slate-600">
                  O painel de métricas mostra pontos, ranking, missões e
                  recompensas em um só lugar.
                </span>
              </article>

              <article className="rounded-3xl bg-blue-50 p-6">
                <strong className="text-xl text-blue-950">Mais impacto</strong>

                <span className="mt-2 block leading-relaxed text-slate-600">
                  A plataforma incentiva escolhas como caminhada, bike,
                  transporte público, reciclagem e economia de energia.
                </span>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
