import { useEffect, useRef, useState } from "react";
import AsideBar from "../../../components/AsideBar/AsideBar";
import { atividadesService } from "../../../services/atividadesService";
import { rankingService } from "../../../services/rankingService";
import { recompensasService } from "../../../services/recompensasService";
import { usuariosService } from "../../../services/usuariosService";
import { estatisticas } from "../../../data/MetricasData";
import type { RankingItem } from "../../../services/rankingTypes";
import type { Recompensa, UsuarioRecompensaResponse } from "../../../services/recompensasTypes";
import { ApiError } from "../../../services/api";
import ModalResgate from "../../../components/ModalResgate/ModalResgate";
import { concluirResgate } from "../../../services/concluirResgate";
import ButtonBase from "../../../components/ButtonBase/ButtonBase";
import { FiGift } from "react-icons/fi";

interface NumeroAnimadoProps {
  valorFinal: number;
}

type Consulta = "saldo" | "historico" | "posicao" | "ranking" | "recompensas";
type EstadoConsulta = "carregando" | "pronto" | "erro";

function estadosIniciais(estado: EstadoConsulta): Record<Consulta, EstadoConsulta> {
  return { saldo: estado, historico: estado, posicao: estado, ranking: estado, recompensas: estado };
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

  return <>{Math.max(0, valorFinal <= 0 ? 0 : numero).toLocaleString("pt-BR")}</>;
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
  const [fotosComErro, setFotosComErro] = useState<number[]>([]);
  const [recompensaEmResgate, setRecompensaEmResgate] = useState<number | null>(null);
  const [recompensaSelecionada, setRecompensaSelecionada] = useState<Recompensa | null>(null);
  const [erroResgate, setErroResgate] = useState("");
  const [resultadoResgate, setResultadoResgate] = useState<UsuarioRecompensaResponse | null>(null);
  const [ultimoResgate, setUltimoResgate] = useState<UsuarioRecompensaResponse | null>(null);
  const [saldoConfiavel, setSaldoConfiavel] = useState(false);
  const [resgateIncerto, setResgateIncerto] = useState(false);
  const [atualizandoSaldo, setAtualizandoSaldo] = useState(false);
  const [historicoResgates, setHistoricoResgates] = useState<UsuarioRecompensaResponse[] | null>(null);
  const envioEmAndamento = useRef(false);
  const [estados, setEstados] = useState(() =>
    estadosIniciais(usuarioId ? "carregando" : "erro"),
  );
  const [tentativa, setTentativa] = useState(0);
  const carregandoResumo = [estados.saldo, estados.historico, estados.posicao].includes("carregando");
  const erroResumo = !usuarioId
    ? "Não foi possível identificar o usuário autenticado. Entre novamente na sua conta."
    : [estados.saldo, estados.historico, estados.posicao].includes("erro")
      ? "Alguns dados do resumo estão indisponíveis. Tente novamente."
      : "";

  function tentarNovamente() {
    if (!usuarioId || envioEmAndamento.current) return;
    setSaldoConfiavel(false);
    setEstados(estadosIniciais("carregando"));
    setTentativa((atual) => atual + 1);
  }

  useEffect(() => {
    document.title = "SoulMove | Métricas";

    if (!usuarioId) {
      return;
    }

    const idUsuario = usuarioId;

    const controlador = new AbortController();

    // Cada consulta libera sua seção assim que termina, sem esperar pelas demais.
    async function consultar<T>(
      consulta: Consulta,
      requisicao: () => Promise<T>,
      aoCarregar: (dados: T) => void,
    ) {
      try {
        const dados = await requisicao();
        if (controlador.signal.aborted) return;
        aoCarregar(dados);
        setEstados((atuais) => ({ ...atuais, [consulta]: "pronto" }));
      } catch (erro) {
        if (controlador.signal.aborted) return;
        // Somente a posição individual admite 404 como ausência de classificação.
        if (consulta === "posicao" && erro instanceof ApiError && erro.status === 404) {
          setRankingUsuario(null);
          setEstados((atuais) => ({ ...atuais, posicao: "pronto" }));
        } else {
          setEstados((atuais) => ({ ...atuais, [consulta]: "erro" }));
        }
      }
    }

    void consultar("saldo", () => usuariosService.buscarPorId(idUsuario, { signal: controlador.signal }), (usuario) => {
      setMovePoints(usuario.pontuacaoSoul);
      setSaldoConfiavel(true);
    });
    void consultar("historico", () => atividadesService.obterHistorico(idUsuario, { signal: controlador.signal }), (historico) => setTotalAcoes(historico.length));
    void consultar("posicao", () => rankingService.obterPosicaoUsuario(idUsuario, { signal: controlador.signal }), setRankingUsuario);
    void consultar("ranking", () => rankingService.obterRankingGeral(10, { signal: controlador.signal }), setRankingComunidade);
    void consultar("recompensas", () => recompensasService.listarRecompensas(), setRecompensas);

    return () => controlador.abort();
  }, [usuarioId, tentativa]);

  async function consultarHistoricoResgates() {
    if (!usuarioId || envioEmAndamento.current) return;
    envioEmAndamento.current = true;
    setAtualizandoSaldo(true);
    try {
      setHistoricoResgates(await recompensasService.obterHistorico(usuarioId));
    } catch {
      setErroResgate("Não foi possível consultar seus resgates. Nenhum novo pedido foi enviado.");
    } finally {
      envioEmAndamento.current = false;
      setAtualizandoSaldo(false);
    }
  }

  async function atualizarSaldo() {
    if (!usuarioId || envioEmAndamento.current) return;
    envioEmAndamento.current = true;
    setAtualizandoSaldo(true);
    setErroResgate("");
    try {
      const usuario = await usuariosService.buscarPorId(usuarioId);
      setMovePoints(usuario.pontuacaoSoul);
      setSaldoConfiavel(true);
      setEstados((atuais) => ({ ...atuais, saldo: "pronto" }));
    } catch {
      setErroResgate("Não foi possível atualizar seu saldo. Tente consultar novamente.");
    } finally {
      envioEmAndamento.current = false;
      setAtualizandoSaldo(false);
    }
  }

  async function resgatar(recompensa: Recompensa) {
    if (!usuarioId || envioEmAndamento.current || !saldoConfiavel || resgateIncerto || resultadoResgate || movePoints < recompensa.valor) return;
    // O ref bloqueia o segundo clique antes de o React renderizar o estado de carregamento.
    envioEmAndamento.current = true;
    setErroResgate("");
    setRecompensaEmResgate(recompensa.id);
    try {
      const resultado = await concluirResgate(
        () => recompensasService.resgatar({ usuarioId, recompensaId: recompensa.id }),
        async () => (await usuariosService.buscarPorId(usuarioId)).pontuacaoSoul,
      );
      setResultadoResgate(resultado.resgate);
      setUltimoResgate(resultado.resgate);
      setSaldoConfiavel(resultado.saldo !== null);
      if (resultado.saldo !== null) setMovePoints(resultado.saldo);
    } catch (erro) {
      const rejeicaoConfirmada = erro instanceof ApiError && erro.status !== null && [400, 401, 403, 404, 409, 422].includes(erro.status);
      if (!rejeicaoConfirmada) {
        // Um timeout não prova que o servidor deixou de emitir o benefício. Não reenviar.
        setResgateIncerto(true);
        setSaldoConfiavel(false);
        setErroResgate("Não foi possível confirmar o resultado do resgate. Não envie novamente: confira o histórico de resgates antes de uma nova tentativa.");
      } else {
        setErroResgate(erro.message);
        if (erro.status === 409) {
          setSaldoConfiavel(false);
          try {
            const usuario = await usuariosService.buscarPorId(usuarioId);
            setMovePoints(usuario.pontuacaoSoul);
            setSaldoConfiavel(true);
          } catch { /* Manter novos resgates bloqueados até consultar o saldo. */ }
        }
        if (erro.status === 404) {
          setRecompensas((atuais) => atuais.filter((item) => item.id !== recompensa.id));
          setErroResgate("Esta recompensa não está mais disponível.");
        }
      }
    } finally {
      envioEmAndamento.current = false;
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
              const estado = estatistica.titulo === "MOVE POINTS"
                ? estados.saldo
                : estatistica.titulo === "Ranking" ? estados.posicao : estados.historico;
              const valor =
                estatistica.titulo === "MOVE POINTS"
                  ? movePoints
                  : estatistica.titulo === "Ranking"
                    ? rankingUsuario?.posicao ?? 0
                    : totalAcoes;

                return (
                  <article
                    key={estatistica.id}
                    aria-busy={estado === "carregando"}
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
                    {estado === "carregando" ? (
                      <span aria-label="Carregando">...</span>
                    ) : estado === "erro" || (estatistica.titulo === "MOVE POINTS" && !saldoConfiavel) ? (
                      <span className="text-sm font-medium">Indisponível</span>
                    ) : (
                      <>
                        {estatistica.titulo === "Ranking" && rankingUsuario === null ? (
                          <span className="text-sm font-medium">Sem classificação</span>
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
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erroResumo}
              {usuarioId && <button type="button" onClick={tentarNovamente} disabled={carregandoResumo || recompensaEmResgate !== null || atualizandoSaldo} className="mt-2 block min-h-11 font-semibold underline disabled:opacity-60">Tentar novamente</button>}
            </div>
          )}

          <section className="mt-6" aria-labelledby="ranking-title">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 id="ranking-title" className="text-sm font-medium text-slate-700">
                  Ranking da comunidade
                </h2>
              </div>
            </div>

            {estados.ranking === "carregando" ? (
              <p role="status" className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Carregando ranking...</p>
            ) : estados.ranking === "erro" ? (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p>Não foi possível carregar o ranking.</p>
                <button type="button" onClick={tentarNovamente} disabled={!usuarioId || recompensaEmResgate !== null || atualizandoSaldo} className="mt-2 min-h-11 font-semibold underline disabled:opacity-60">Tentar novamente</button>
              </div>
            ) : rankingComunidade.length === 0 ? (
              <p role="status" className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Ainda não há participantes no ranking.</p>
            ) : <ol className="space-y-2">
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
                      {pessoa.fotoUsuario && !fotosComErro.includes(pessoa.usuarioId) ? (
                        <img
                          src={pessoa.fotoUsuario}
                          alt={pessoa.nomeUsuario}
                          onError={() => {
                            setFotosComErro((atuais) =>
                              atuais.includes(pessoa.usuarioId)
                                ? atuais
                                : [...atuais, pessoa.usuarioId]
                            );
                          }}
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
            </ol>}
          </section>

          <section className="mt-6" aria-labelledby="rewards-title">
            <div className="mb-3 flex items-end justify-between">
              <h2 tabIndex={-1} id="rewards-title" className="text-sm font-medium text-slate-700">
                Recompensas para você
              </h2>
            </div>

            {estados.recompensas === "carregando" ? (
              <p role="status" className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Carregando recompensas...</p>
            ) : estados.recompensas === "erro" ? (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p>Não foi possível carregar as recompensas.</p>
                <button type="button" onClick={tentarNovamente} disabled={!usuarioId || recompensaEmResgate !== null || atualizandoSaldo} className="mt-2 min-h-11 font-semibold underline disabled:opacity-60">Tentar novamente</button>
              </div>
            ) : recompensas.length === 0 ? (
              <p role="status" className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Nenhuma recompensa disponível no momento.</p>
            ) : <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {recompensas.map((recompensa) => {
                const podeResgatar = saldoConfiavel && !resgateIncerto && movePoints >= recompensa.valor;
                const carregandoResgate = recompensaEmResgate === recompensa.id;

                return (
                <article
                  key={recompensa.id}
                  className="rounded-lg border border-blue-200 bg-white p-3 shadow-sm"
                >
                  <div
                    className="flex h-8 items-center text-blue-600"
                    aria-hidden="true"
                  >
                    <FiGift className="h-5 w-5" strokeWidth={1.7} />
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
                      setResultadoResgate(null);
                      setRecompensaSelecionada(recompensa);
                    }}
                    disabled={!podeResgatar || recompensaEmResgate !== null || atualizandoSaldo}
                    size="md"
                    className="mt-2 w-full rounded-md px-3 py-2 text-[11px] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:outline-slate-200 disabled:hover:translate-y-0"
                  >
                    {carregandoResgate
                      ? "Resgatando..."
                      : resgateIncerto || !saldoConfiavel
                        ? "Resgate indisponível"
                      : podeResgatar
                        ? "Resgatar"
                        : `Faltam ${(recompensa.valor - movePoints).toLocaleString("pt-BR")} pts`}
                  </ButtonBase>
                </article>
                );
              })}
            </div>}
            {resgateIncerto && <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p>Há uma tentativa com resultado desconhecido. Os novos resgates estão bloqueados nesta sessão para evitar uma cobrança repetida.</p>
              <button type="button" disabled={atualizandoSaldo} onClick={() => void consultarHistoricoResgates()} className="mt-2 min-h-11 font-semibold underline focus-visible:outline-2 focus-visible:outline-blue-600">Consultar histórico de resgates</button>
              {historicoResgates && <div className="mt-3" role="status">
                <h3 className="font-semibold">Registros retornados pelo histórico</h3>
                {historicoResgates.length === 0 ? <p>Nenhum resgate foi encontrado. Isso não confirma o resultado da tentativa; confira com o responsável antes de repetir.</p> : <ul className="mt-2 space-y-2">{historicoResgates.map((registro) => <li key={registro.id}>#{registro.id} — {registro.descricaoRecompensa} — {registro.dataRecebimento.split("-").reverse().join("/")}</li>)}</ul>}
              </div>}
            </div>}
            {ultimoResgate && <p role="status" className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
              Último resgate confirmado: <strong>#{ultimoResgate.id}</strong> — {ultimoResgate.descricaoRecompensa}. Benefício demonstrativo, sem validade comercial.
            </p>}
            {!saldoConfiavel && !carregandoResumo && !resgateIncerto && <button type="button" onClick={() => void atualizarSaldo()} disabled={atualizandoSaldo || recompensaEmResgate !== null} className="mt-4 min-h-11 text-sm font-semibold text-blue-700 underline focus-visible:outline-2 focus-visible:outline-blue-600">{atualizandoSaldo ? "Atualizando saldo..." : "Atualizar saldo para liberar resgates"}</button>}
            {erroResgate && (
              <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {erroResgate}
              </p>
            )}
          </section>
        </div>
      </main>
      {recompensaSelecionada && (
        <ModalResgate
          recompensa={recompensaSelecionada}
          saldo={saldoConfiavel ? movePoints : null}
          confirmando={recompensaEmResgate !== null || atualizandoSaldo}
          erro={erroResgate}
          resultado={resultadoResgate}
          incerto={resgateIncerto}
          aoConfirmar={() => void resgatar(recompensaSelecionada)}
          aoFechar={() => setRecompensaSelecionada(null)}
          aoAtualizarSaldo={() => void atualizarSaldo()}
        />
      )}
    </div>
  );
}
