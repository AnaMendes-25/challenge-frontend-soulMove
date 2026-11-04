import { startTransition, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { IconType } from "react-icons";
import { FiTruck } from "react-icons/fi";
import { PiRecycleLight, PiPersonSimpleBikeLight, PiPersonSimpleWalkThin  } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";

import { atividadesService } from "../../../services/atividadesService";
import { usuariosService } from "../../../services/usuariosService";
import { rankingService } from "../../../services/rankingService";

import AsideBar from "../../../components/AsideBar/AsideBar";
import FormularioAcao from "../../../components/FormularioAcao/FormularioAcao";
import ModalSucesso from "../../../components/ModalSucesso/ModalSucesso";
import HistoricoAtividades from "../../../components/HistoricoAtividades/HistoricoAtividades";

import { acoesSustentaveis } from "../../../data/ValidacaoData";

import type { AcaoSustentavel } from "../../../types/ValidacaoTypes";
import type { AtividadeBackend } from "../../../services/atividadesTypes";
import type { RankingItem } from "../../../services/rankingTypes";
import type { AsyncState } from "../../../types/AsyncState";

const iconesPorTipo: Record<string, IconType> = {
  RECICLAGEM: PiRecycleLight,
  REDUCAO_ENERGIA: SlEnergy,
  TRANSPORTE_PUBLICO: FiTruck,
  TRAJETO_BIKE: PiPersonSimpleBikeLight,
  TRAJETO_CAMINHADA: PiPersonSimpleWalkThin,
};

function IconeAcao({ tipo }: { tipo: string }) {
  const Icone = iconesPorTipo[tipo] ?? PiPersonSimpleWalkThin;

  return (
    <Icone
      className="h-[24px] w-[24px] min-[601px]:h-[30px] min-[601px]:w-[30px]"
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}


export default function Validacao() {
  const navigate = useNavigate();
  const { acaoId } = useParams<{ acaoId?: string }>();


  const [estadoAtividades, setEstadoAtividades] = useState<AsyncState<AcaoSustentavel[]>>({ status: "loading" });
  const [acaoAberta, setAcaoAberta] = useState<string>(acaoId || "");
  const [rankingApi, setRankingApi] = useState<RankingItem[]>([]);
  const [posicaoUsuario, setPosicaoUsuario] = useState<RankingItem | null>(null);
  const [fotosComErro, setFotosComErro] = useState<number[]>([]);


  //Cria a ref no topo do componente index.tsx (dentro da função da página)
  const enviandoBackend = useRef(false);

  // Controla a abertura e o fechamento do modal.
  const [enviado, setEnviado] = useState(false);
  const [movePoints, setMovePoints] = useState(0);
  const [recarregarHistorico, setRecarregarHistorico] = useState(0);

  useEffect(() => {
    document.title = "SoulMove | Registrar ações";
  }, []);

  useEffect(() => {
    startTransition(() => {
      setAcaoAberta(acaoId || "");
    });
  }, [acaoId]);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarPontuacaoUsuario() {
      try {
        const usuarioId = usuariosService.getUsuarioIdGuardado() ?? 1;

        const usuario = await usuariosService.buscarPorId(usuarioId, { signal: controller.signal });

        setMovePoints(usuario.pontuacaoSoul);
      } catch (erro) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar pontuação do usuário:", erro);
      }
    }

    void carregarPontuacaoUsuario();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarRanking() {
      try {
        const usuarioId = usuariosService.getUsuarioIdGuardado() ?? 1;

        const [dadosRanking, dadosUsuario] = await Promise.all([
          rankingService.obterRankingGeral(5, { signal: controller.signal, }),
          rankingService.obterPosicaoUsuario(usuarioId, { signal: controller.signal, }),
        ]);

        if (controller.signal.aborted) return;

        setRankingApi(dadosRanking);
        setPosicaoUsuario(dadosUsuario);
      } catch (erro) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar ranking:", erro);
      }
    }

    void carregarRanking();

    return () => controller.abort();
  }, []);

  // Abre o card selecionado e fecha os outros.
  function abrirOuFecharCard(id: string) {
    if (acaoAberta === id) {
      setAcaoAberta("");
      navigate("/validacao");
      return;
    }

    setAcaoAberta(id);
    navigate(`/validacao/${id}`);
  }



  useEffect(() => {
    const controller = new AbortController();

    async function carregarAtividades() {
      try {
        const listaAtividades = await atividadesService.listarAtividades(
          undefined,
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        const acoesFormatadas = listaAtividades.map((item: AtividadeBackend) => {
          const dadosVisuais = acoesSustentaveis.find(
            (mock) =>
              mock.id.toLowerCase() === item.tipoAtividade.toLowerCase()
          );

          return {
            id: String(item.id),
            titulo: item.nome,
            pontos: item.pontuacao,
            icone: dadosVisuais?.icone || "📌",
            comprovacao:
              dadosVisuais?.comprovacao ||
              item.validacao ||
              "Envie um comprovante válido.",
            exemplo:
              dadosVisuais?.exemplo ||
              item.descricao ||
              "Ex.: Ação sustentável",
            dadoOriginalJava: item,
          };
        });

        setEstadoAtividades({
          status: "success",
          data: acoesFormatadas,
        });
      } catch (erro) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar o catálogo de atividades:", erro);

        setEstadoAtividades({
          status: "error",
          message:
            erro instanceof Error
              ? erro.message
              : "Não foi possível carregar as atividades.",
        });
      }
    }

    void carregarAtividades();

    return () => controller.abort();
  }, []);

  async function handleEnviarAtividade(idDaAtividade: string) {

    if (enviandoBackend.current) return;
    enviandoBackend.current = true;

    try {
      const idUtilizadorLogado = usuariosService.getUsuarioIdGuardado() ?? 1;

      await atividadesService.registrarAtividade({
        usuarioId: idUtilizadorLogado,
        atividadeId: Number(idDaAtividade),
      });

      setRecarregarHistorico((valorAtual) => valorAtual + 1);
      setEnviado(true);

      try {
        const usuarioAtualizado = await usuariosService.buscarPorId(idUtilizadorLogado);
        setMovePoints(usuarioAtualizado.pontuacaoSoul);
      } catch (erro) {
        console.error(
          "Atividade registrada, mas não foi possível atualizar os pontos:",
          erro
        );
      }

      try {
        const [rankingAtualizado, posicaoAtualizada] = await Promise.all([
          rankingService.obterRankingGeral(5),
          rankingService.obterPosicaoUsuario(idUtilizadorLogado),
        ]);

        setRankingApi(rankingAtualizado);
        setPosicaoUsuario(posicaoAtualizada);
      } catch (erro) {
        console.error(
          "Atividade registrada, mas não foi possível atualizar o ranking:",
          erro
        );
      }
    } finally {
      enviandoBackend.current = false;
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111]">
      <AsideBar />

      <main className="pb-24 md:ml-24 md:pb-0">
        <section className="mx-auto w-[calc(100%-16px)] max-w-[960px] py-[20px] min-[426px]:w-[calc(100%-20px)] min-[426px]:py-[24px] min-[601px]:w-[calc(100%-24px)] min-[601px]:max-w-[760px] min-[601px]:py-[40px] min-[992px]:w-[calc(100%-32px)] min-[992px]:max-w-[960px] min-[992px]:py-[60px]">
          <div className="grid grid-cols-1 items-start gap-[28px] min-[992px]:grid-cols-[minmax(0,600px)_minmax(280px,340px)]">

            {/* Área principal com os cards das ações */}
            <div className="flex flex-col gap-[12px] min-[426px]:gap-[16px]">

              {/* Carregamento */}
              {estadoAtividades.status === "loading" && (
                <div className="p-[22px] text-center text-[16px] font-bold text-[#2454de]">
                  Buscando atividades...
                </div>
              )}

              {/* Erro */}
              {estadoAtividades.status === "error" && (
                <div
                  role="alert"
                  className="rounded-[8px] bg-white p-[22px] text-center text-[14px] text-[#b42318]"
                >
                  {estadoAtividades.message}
                </div>
              )}

              {/* Lista vazia */}
              {estadoAtividades.status === "success" &&
                estadoAtividades.data.length === 0 && (
                  <div className="rounded-[8px] bg-white p-[22px] text-center text-[14px] text-[#444]">
                    Nenhuma atividade disponível no momento.
                  </div>
                )}

              {/* Atividades carregadas */}
              {estadoAtividades.status === "success" && estadoAtividades.data.map((acao) => (
                <article
                  key={acao.id}
                  className="overflow-hidden rounded-[8px] border border-[#b7d4ff] bg-white"
                >
                  {/* Cabeçalho clicável do card */}
                  <button
                    type="button"
                    onClick={() => abrirOuFecharCard(acao.id)}
                    className="flex min-h-[90px] w-full cursor-pointer items-start gap-[12px] p-[14px] text-left min-[601px]:min-h-[115px] min-[601px]:items-center min-[601px]:gap-[16px] min-[601px]:p-[22px]"
                    aria-expanded={acaoAberta === acao.id}
                    aria-controls={`formulario-${acao.id}`}
                  >
                    <div
                      className="grid h-[42px] min-w-[42px] place-items-center rounded-full bg-[#eaf2ff] text-[20px] text-[#2454de] min-[601px]:h-[56px] min-[601px]:min-w-[56px] min-[601px]:text-[24px]"
                      aria-hidden="true"
                    >
                      <IconeAcao tipo={acao.dadoOriginalJava?.tipoAtividade ?? ""} />
                    </div>

                    <div className="flex-1">
                      <h2 className="mb-[8px] text-[14px] font-bold text-[#111] min-[601px]:text-[16px]">
                        {acao.titulo}
                      </h2>

                      <strong className="text-[15px] font-bold text-[#2454de]">
                        +{acao.pontos}pts
                      </strong>
                    </div>

                    <span
                      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#2454de] text-white transition-transform min-[601px]:h-[44px] min-[601px]:w-[44px]"
                      aria-hidden="true"
                    >
                      {acaoAberta === acao.id ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-[18px] w-[18px] min-[601px]:h-[22px] min-[601px]:w-[22px]"
                        >
                          <path d="M6 15l6-6 6 6" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-[18px] w-[18px] min-[601px]:h-[22px] min-[601px]:w-[22px]"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Formulário da ação selecionada */}
                  {acaoAberta === acao.id && acao.dadoOriginalJava && (
                    <div id={`formulario-${acao.id}`}>
                      <FormularioAcao
                        acao={acao}
                        atividade={acao.dadoOriginalJava}
                        aoEnviar={() => handleEnviarAtividade(acao.id)}
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Painel lateral */}
            <aside className="flex flex-col gap-[24px] min-[601px]:grid min-[601px]:grid-cols-2 min-[992px]:flex">
              {/* Pontuação do usuário */}
              <section className="col-span-full flex items-center justify-between rounded-[8px] bg-[#bdd8fb] p-[18px] min-[601px]:p-[24px]">
                <div>
                  <span className="mb-[12px] block text-[12px] uppercase text-[#1f2937]">
                    MOVE POINTS
                  </span>

                  <strong className="text-[24px] font-bold text-[#111] min-[601px]:text-[28px]">
                    {movePoints.toLocaleString("pt-BR")} pts
                  </strong>
                </div>

                <span className="text-[14px] font-bold text-[#111]">
                  <span className="text-[#13b95e]">↑</span>{" "}
                  {posicaoUsuario?.posicao ?? "—"}º
                </span>
              </section>

              {/* Ranking Top 5 */}
              <section>
                <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
                  Ranking Top 5
                </h2>

                <ol className="flex flex-col gap-[10px]">
                  {rankingApi.map((pessoa) => (
                    <li
                      key={pessoa.id}
                      className="grid grid-cols-[24px_32px_1fr] items-center gap-[12px] rounded-[8px] bg-white p-[12px] min-[601px]:grid-cols-[28px_36px_1fr_auto]"
                    >
                      <span className="text-[14px] font-bold text-[#2454de]">
                        {pessoa.posicao}º
                      </span>

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
                          className="h-[32px] w-[32px] rounded-full object-cover min-[601px]:h-[36px] min-[601px]:w-[36px]"
                        />
                      ) : (
                        <span className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#eaf2ff] text-[10px] font-bold text-[#2454de] min-[601px]:h-[36px] min-[601px]:w-[36px]">
                          {pessoa.nomeUsuario
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((nome) => nome[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}

                      <div>
                        <strong className="block text-[14px] font-bold">
                          {pessoa.nomeUsuario}
                        </strong>
                      </div>

                      <strong className="col-start-3 text-[14px] font-bold text-[#2454de] min-[601px]:col-start-auto">
                        {pessoa.pontuacaoTotal.toLocaleString("pt-BR")} pts
                      </strong>
                    </li>
                  ))}
                </ol>

                <Link
                  to="/metricas"
                  className="mt-[14px] inline-flex text-[14px] font-semibold text-[#4d4d4d] transition hover:text-[#2454de]"
                >
                  Ver ranking completo →
                </Link>
              </section>

              {/* Atividades registradas (histórico real da API) */}
              <HistoricoAtividades
                usuarioId={usuariosService.getUsuarioIdGuardado() ?? 1}
                recarregarKey={recarregarHistorico}
              />
            </aside>
          </div>
        </section>
      </main>

      {/* Modal reutilizado pelo Contato e pela Validação */}
      <ModalSucesso
        aberto={enviado}
        titulo="Atividade enviada!"
        texto="Sua atividade foi enviada para avaliação com sucesso."
        fecharModal={() => setEnviado(false)}
      />
    </div>
  );
}
