import { useEffect, useState } from "react";
import AsideBar from "../../../components/AsideBar/AsideBar";
import { atividadesService } from "../../../services/atividadesService";
import { rankingService } from "../../../services/rankingService";
import { recompensasService } from "../../../services/recompensasService";
import { usuariosService } from "../../../services/usuariosService";
import { estatisticas } from "../../../data/MetricasData";
import type { RankingItem } from "../../../services/rankingTypes";
import type { Recompensa } from "../../../services/recompensasTypes";
import { ApiError } from "../../../services/api";
import ModalSucesso from "../../../components/ModalSucesso/ModalSucesso";
import ButtonBase from "../../../components/ButtonBase/ButtonBase";

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

function obterIniciais(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Metricas() {
  const usuarioId = usuariosService.getUsuarioIdGuardado();
  const [movePoints, setMovePoints] = useState(0);
  const [totalAcoes, setTotalAcoes] = useState(0);
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [rankingUsuario, setRankingUsuario] = useState<RankingItem | null>(null);
  const [rankingComunidade, setRankingComunidade] = useState<RankingItem[]>([]);
  const [recompensaEmResgate, setRecompensaEmResgate] = useState<number | null>(null);
  const [recompensaSelecionada, setRecompensaSelecionada] = useState<Recompensa | null>(null);
  const [erroResgate, setErroResgate] = useState("");
  const [resgateConcluido, setResgateConcluido] = useState(false);
  const [carregandoResumo, setCarregandoResumo] = useState(Boolean(usuarioId));
  const [erroResumo, setErroResumo] = useState(
    usuarioId ? "" : "Não foi possível identificar o usuário autenticado.",
  );

  useEffect(() => {
    document.title = "SoulMove | Métricas";

    if (!usuarioId) {
      return;
    }

    const idUsuario = usuarioId;

    const controlador = new AbortController();

    async function carregarResumo() {
      try {
        const resultados = await Promise.allSettled([
          usuariosService.buscarPorId(idUsuario, { signal: controlador.signal }),
          atividadesService.obterHistorico(idUsuario, { signal: controlador.signal }),
          rankingService.obterPosicaoUsuario(idUsuario, { signal: controlador.signal }),
          rankingService.obterRankingGeral(10, { signal: controlador.signal }),
          recompensasService.listarRecompensas(),
        ]);

        const [
          usuarioResultado,
          historicoResultado,
          rankingResultado,
          rankingComunidadeResultado,
          recompensasResultado,
        ] = resultados;

        if (usuarioResultado.status === "fulfilled") {
          setMovePoints(usuarioResultado.value.pontuacaoSoul);
        }

        if (historicoResultado.status === "fulfilled") {
          setTotalAcoes(historicoResultado.value.length);
        }

        if (rankingResultado.status === "fulfilled") {
          setRankingUsuario(rankingResultado.value);
        }

        if (rankingComunidadeResultado.status === "fulfilled") {
          setRankingComunidade(rankingComunidadeResultado.value);
        }

        if (recompensasResultado.status === "fulfilled") {
          setRecompensas(recompensasResultado.value);
        }

        const falha = resultados.find(
          (resultado) =>
            resultado.status === "rejected" &&
            !(resultado.reason instanceof ApiError && resultado.reason.status === 404),
        );

        if (falha?.status === "rejected") {
          throw falha.reason;
        }
      } catch (erro) {
        if (controlador.signal.aborted) {
          return;
        }

        setErroResumo(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar seus dados.",
        );
      } finally {
        if (!controlador.signal.aborted) {
          setCarregandoResumo(false);
        }
      }
    }

    void carregarResumo();

    return () => controlador.abort();
  }, [usuarioId]);

  async function resgatar(recompensa: Recompensa) {
    if (!usuarioId || recompensaEmResgate !== null || movePoints < recompensa.valor) {
      return;
    }

    setErroResgate("");
    setRecompensaEmResgate(recompensa.id);

    try {
      await recompensasService.resgatar({
        usuarioId,
        recompensaId: recompensa.id,
      });

      const usuarioAtualizado = await usuariosService.buscarPorId(usuarioId);
      setMovePoints(usuarioAtualizado.pontuacaoSoul);
      setRecompensaSelecionada(null);
      setResgateConcluido(true);
    } catch (erro) {
      setErroResgate(
        erro instanceof Error
          ? erro.message
          : "Não foi possível resgatar esta recompensa.",
      );
    } finally {
      setRecompensaEmResgate(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <AsideBar />

      <main className="min-h-screen overflow-x-hidden pb-28 md:ml-24 md:pb-10">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 lg:px-10">
          <header className="mb-7">
           
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Visão geral
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Acompanhe seu impacto e veja sua posição na comunidade.
            </p>
          </header>

          <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumo do desempenho">
            {estatisticas
              .filter((estatistica) => estatistica.titulo !== "Missões")
              .map((estatistica) => {
              const valor =
                estatistica.titulo === "MOVE POINTS"
                  ? movePoints
                  : estatistica.titulo === "Ranking"
                    ? rankingUsuario?.posicao ?? 0
                    : totalAcoes;

                return (
                  <article
                    key={estatistica.id}
                    className={`min-h-28 rounded-xl border p-4 shadow-sm ${
                    estatistica.principal
                      ? "border-blue-600 bg-blue-600 text-white shadow-blue-100"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        estatistica.principal ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {estatistica.titulo}
                    </span>
                  </div>
                  <strong className="mt-6 block text-2xl font-bold leading-none sm:text-3xl">
                    {carregandoResumo ? (
                      <span aria-label="Carregando">...</span>
                    ) : (
                      <>
                        {estatistica.titulo === "Ranking" && rankingUsuario === null ? (
                          <span aria-label="Sem ranking">—</span>
                        ) : (
                          <NumeroAnimado valorFinal={valor} />
                        )}
                        {estatistica.titulo === "MOVE POINTS" && (
                          <span className="ml-1 text-sm font-semibold">pts</span>
                        )}
                      </>
                    )}
                  </strong>
                </article>
              );
              })}
          </section>

          {erroResumo && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erroResumo}
            </p>
          )}

          <section className="mt-6" aria-labelledby="ranking-title">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 id="ranking-title" className="text-sm font-medium text-slate-700">
                  Ranking da comunidade
                </h2>
              </div>
            </div>

            <ol className="space-y-2">
                {rankingComunidade.map((pessoa) => {
                  const usuarioAtual = pessoa.usuarioId === usuarioId;

                  return (
                  <li
                    key={`${pessoa.usuarioId}-${pessoa.posicao}`}
                    className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-lg border px-3 py-2.5 transition sm:grid-cols-[40px_1fr_auto] sm:px-4 ${
                      usuarioAtual
                        ? "border-blue-600 bg-blue-50"
                        : "border-blue-200 bg-white hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-xs font-bold text-blue-700">
                      {pessoa.posicao}º
                    </span>
                    <div className="flex min-w-0 items-center gap-3">
                      {pessoa.fotoUsuario ? (
                        <img
                          src={pessoa.fotoUsuario}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-blue-700">
                          {obterIniciais(pessoa.nomeUsuario)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <strong className={`block truncate text-xs font-bold ${usuarioAtual ? "text-blue-700" : "text-slate-900"}`}>
                          {pessoa.nomeUsuario}
                        </strong>
                      </div>
                    </div>
                    <strong className="text-right text-xs font-bold text-blue-700">
                      <NumeroAnimado valorFinal={pessoa.pontuacaoTotal} />
                      <span className="ml-1 text-xs font-normal text-slate-400">pts</span>
                    </strong>
                  </li>
                  );
                })}
            </ol>
          </section>

          <section className="mt-6" aria-labelledby="rewards-title">
            <div className="mb-3 flex items-end justify-between">
              <h2 id="rewards-title" className="text-sm font-medium text-slate-700">
                Recompensas para você
              </h2>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {recompensas.map((recompensa) => {
                const podeResgatar = movePoints >= recompensa.valor;
                const carregandoResgate = recompensaEmResgate === recompensa.id;

                return (
                <article
                  key={recompensa.id}
                  className="rounded-lg border border-blue-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex h-8 items-center text-xl" aria-hidden="true">
                    🎁
                  </div>
                  <h3 className="mt-1 text-[11px] font-bold text-slate-900">
                    {recompensa.descricao}
                  </h3>
                  <strong className="mt-1 block text-[10px] text-blue-700">
                    {recompensa.valor.toLocaleString("pt-BR")} pts
                  </strong>
                  <ButtonBase
                    type="button"
                    onClick={() => {
                      setErroResgate("");
                      setRecompensaSelecionada(recompensa);
                    }}
                    disabled={!podeResgatar || recompensaEmResgate !== null}
                    size="md"
                    className="mt-2 w-full rounded-md px-3 py-2 text-[11px] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:outline-slate-200 disabled:hover:translate-y-0"
                  >
                    {carregandoResgate
                      ? "Resgatando..."
                      : podeResgatar
                        ? "Resgatar"
                        : `Faltam ${(recompensa.valor - movePoints).toLocaleString("pt-BR")} pts`}
                  </ButtonBase>
                </article>
                );
              })}
            </div>
            {erroResgate && (
              <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {erroResgate}
              </p>
            )}
          </section>
        </div>
      </main>
      {recompensaSelecionada && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-confirmacao-resgate"
          onClick={() => setRecompensaSelecionada(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2
                  id="titulo-confirmacao-resgate"
                  className="text-lg font-bold text-slate-900"
                >
                  Confirmar resgate
                </h2>
              </div>
              <ButtonBase
                type="button"
                onClick={() => setRecompensaSelecionada(null)}
                variant="secondary"
                size="md"
                className="rounded-md border-0 px-2 py-1 text-xs text-slate-500 outline-none hover:bg-slate-100 hover:text-slate-900 hover:translate-y-0"
              >
                Fechar
              </ButtonBase>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Revise a recompensa e o custo em MOVE Points antes de confirmar.
            </p>

            <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/30 p-4">
              <p className="text-[11px] text-slate-500">Recompensa</p>
              <h3 className="mt-2 text-sm font-bold text-slate-900">
                {recompensaSelecionada.descricao}
              </h3>
              <strong className="mt-2 block text-sm font-bold text-blue-700">
                {recompensaSelecionada.valor.toLocaleString("pt-BR")} MOVE Points
              </strong>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Seu saldo</span>
                <strong className="text-slate-900">
                  {movePoints.toLocaleString("pt-BR")} pts
                </strong>
              </div>
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Saldo após o resgate</span>
                <strong className="text-blue-700">
                  {(movePoints - recompensaSelecionada.valor).toLocaleString("pt-BR")} pts
                </strong>
              </div>
            </div>

            <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-800">
              Protótipo: o resgate e o desconto de pontos são demonstrativos
              nesta etapa.
            </p>

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <ButtonBase
                type="button"
                onClick={() => setRecompensaSelecionada(null)}
                variant="secondary"
                size="md"
                className="rounded-md border-red-200 text-red-600 outline-red-200 hover:bg-red-50 hover:text-red-700 sm:min-w-32"
              >
                Cancelar
              </ButtonBase>
              <ButtonBase
                type="button"
                onClick={() => void resgatar(recompensaSelecionada)}
                disabled={recompensaEmResgate !== null}
                size="md"
                className="rounded-md px-4 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-36"
              >
                {recompensaEmResgate === recompensaSelecionada.id
                  ? "Resgatando..."
                  : "Confirmar resgate"}
              </ButtonBase>
            </div>
          </div>
        </div>
      )}
      <ModalSucesso
        aberto={resgateConcluido}
        titulo="Resgate realizado!"
        texto="Sua recompensa foi resgatada com sucesso."
        fecharModal={() => setResgateConcluido(false)}
      />
    </div>
  );
}
