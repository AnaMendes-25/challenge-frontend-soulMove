import { useEffect, useState } from "react";
import AsideBar from "../../../components/AsideBar/AsideBar";
import { estatisticas, missoes, ranking } from "../../../data/MetricasData";
import { getCurrentRanking, getMovePoints } from "../../../utils/movePoints";

interface NumeroAnimadoProps {
  valorFinal: number;
}

function NumeroAnimado({ valorFinal }: NumeroAnimadoProps) {
  const [numero, setNumero] = useState(0);

  useEffect(() => {
    if (valorFinal <= 0) {
      return;
    }

    let numeroAtual = 0;
    const incremento = valorFinal / 60;

    const intervalo = window.setInterval(() => {
      numeroAtual += incremento;

      if (numeroAtual >= valorFinal) {
        setNumero(valorFinal);
        window.clearInterval(intervalo);
        return;
      }

      setNumero(Math.floor(numeroAtual));
    }, 20);

    return () => window.clearInterval(intervalo);
  }, [valorFinal]);

  return <>{Math.max(0, numero).toLocaleString("pt-BR")}</>;
}

export default function Metricas() {
  const [movePoints] = useState(getMovePoints);
  const rankingAtual = getCurrentRanking(ranking);
  const usuarioAtual = rankingAtual.find((pessoa) => pessoa.usuarioAtual);

  useEffect(() => {
    document.title = "Métricas";
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#111]">
      <AsideBar />

      <main className="min-h-screen overflow-x-hidden bg-[#f3f3f3] pb-[88px] min-[601px]:ml-[90px] min-[601px]:pb-0 min-[992px]:ml-[160px]">
        <section
          className="mx-auto mb-[50px] mt-[20px] w-[calc(100%-20px)] max-w-[960px] min-[426px]:mb-[80px] min-[426px]:mt-[40px] min-[426px]:w-[calc(100%-32px)]"
          aria-label="Painel de desempenho SoulMove"
        >
          {/* Cards das estatísticas */}
          <div className="mb-[24px] grid grid-cols-1 gap-[10px] min-[426px]:grid-cols-2 min-[426px]:gap-[12px] min-[850px]:grid-cols-[1.1fr_1fr_1fr_1fr]">
            {estatisticas.map((estatistica) => (
              <article
                key={estatistica.id}
                className={`flex min-h-[100px] flex-col justify-between rounded-[12px] border p-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] min-[426px]:min-h-[130px] min-[426px]:p-[18px] ${
                  estatistica.principal
                    ? "border-[#2554d9] bg-[#2554d9] text-white"
                    : "border-[#ddd] bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between text-[13px] ${
                    estatistica.principal ? "text-white" : "text-[#555]"
                  }`}
                >
                  <span>{estatistica.titulo}</span>

                  {estatistica.titulo === "Ações" && (
                    <span aria-hidden="true">⋮</span>
                  )}
                </div>

                <div className="flex items-end justify-between gap-[10px]">
                  <strong
                    className={`text-[24px] font-bold leading-none min-[426px]:text-[30px] ${
                      estatistica.principal ? "text-white" : "text-[#111]"
                    }`}
                  >
                    <NumeroAnimado
                      valorFinal={
                        estatistica.titulo === "MOVE POINTS"
                          ? movePoints
                          : estatistica.titulo === "Ranking"
                            ? (usuarioAtual?.posicao ?? estatistica.valor)
                            : estatistica.valor
                      }
                    />
                  </strong>
                </div>
              </article>
            ))}
          </div>

          {/* Missões ativas */}
          <section className="mt-[30px]" aria-labelledby="missions-title">
            <div className="mb-[12px] flex items-center justify-between gap-[20px]">
              <h2
                id="missions-title"
                className="text-[13px] font-semibold text-[#444]"
              >
                {" "}
                MISSÕES ATIVAS{" "}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-[12px] min-[650px]:grid-cols-2">
              {missoes.map((missao) => {
                const progresso =
                  (missao.progressoAtual / missao.progressoTotal) * 100;

                return (
                  <article
                    key={missao.id}
                    className={`rounded-[8px] p-[20px] ${
                      missao.destaque ? "bg-[#dbeafe]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-[10px]">
                      <h3 className="text-[15px] font-bold text-[#111]">
                        {missao.titulo}
                      </h3>

                      <strong className="text-[15px] font-bold text-[#ff7a00]">
                        +{missao.pontos}
                      </strong>
                    </div>

                    <div className="my-[8px] mt-[16px] h-[8px] w-full overflow-hidden rounded-full bg-[#e7e7e7]">
                      <span
                        className="block h-full rounded-full bg-[#2554d9]"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-[10px] text-[12px] text-[#777]">
                      <span>
                        {missao.progressoAtual}/{missao.progressoTotal}
                      </span>

                      <span>termina em {missao.diasRestantes} dias</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Ranking */}
          <section className="mt-[30px]" aria-labelledby="ranking-title">
            <div className="mb-[12px] flex items-center justify-between gap-[20px]">
              <h2
                id="ranking-title"
                className="text-[13px] font-semibold text-[#444]"
              >
                RANKING
              </h2>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[680px] border-separate border-spacing-y-[9px]">
                <thead>
                  <tr>
                    <th className="px-[14px] py-[10px] text-left text-[13px] font-bold uppercase text-[#999]">
                      Posição
                    </th>

                    <th className="px-[14px] py-[10px] text-left text-[13px] font-bold uppercase text-[#999]">
                      Avatar
                    </th>

                    <th className="px-[14px] py-[10px] text-left text-[13px] font-bold uppercase text-[#999]">
                      Usuário
                    </th>

                    <th className="px-[14px] py-[10px] text-left text-[13px] font-bold uppercase text-[#999]">
                      Cidade
                    </th>

                    <th className="px-[14px] py-[10px] text-left text-[13px] font-bold uppercase text-[#999]">
                      Pontuação
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rankingAtual.map((pessoa) => (
                    <tr
                      key={pessoa.posicao}
                      className={`h-[62px] transition hover:-translate-y-[2px] ${
                        pessoa.usuarioAtual ? "bg-[#dbeafe]" : "bg-white"
                      }`}
                    >
                      <td className="rounded-l-[8px] px-[14px] py-[12px] align-middle text-[15px] font-extrabold text-[#2554d9]">
                        {pessoa.posicao}º
                      </td>

                      <td className="px-[14px] py-[12px] align-middle">
                        {pessoa.foto ? (
                          <img
                            src={pessoa.foto}
                            alt={pessoa.nome}
                            className="flex h-[34px] w-[34px] rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`flex h-[34px] w-[34px] items-center justify-center rounded-full text-[11px] font-extrabold ${
                              pessoa.usuarioAtual
                                ? "bg-black/20 text-black"
                                : "bg-[#e8e8e8] text-[#2554d9]"
                            }`}
                          >
                            {pessoa.iniciais}
                          </div>
                        )}
                      </td>

                      <td className="px-[14px] py-[12px] align-middle">
                        <strong className="text-[15px] font-bold text-[#111]">
                          {pessoa.nome}
                        </strong>
                      </td>

                      <td className="px-[14px] py-[12px] align-middle text-[13px] text-[#999]">
                        {pessoa.cidade}
                      </td>

                      <td className="rounded-r-[8px] px-[14px] py-[12px] align-middle text-[15px] font-extrabold text-[#2554d9]">
                        <NumeroAnimado
                          valorFinal={
                            pessoa.usuarioAtual ? movePoints : pessoa.pontos
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
