import { api, ApiError} from "../../../services/api"; 
import { startTransition, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import AsideBar from "../../../components/AsideBar/AsideBar";
import FormularioAcao from "../../../components/FormularioAcao/FormularioAcao";
import ModalSucesso from "../../../components/ModalSucesso/ModalSucesso";

import { ranking } from "../../../data/MetricasData";
import {
  acoesSustentaveis,
  missoesValidacao,
} from "../../../data/ValidacaoData";
import {
  addMovePoints,
  getCurrentRanking,
  getMovePoints,
} from "../../../utils/movePoints";

import type { AcaoSustentavel } from "../../../types/ValidacaoTypes";
import type { AtividadeBackend } from "../../../types/ValidacaoTypes";


export default function Validacao() {
  const navigate = useNavigate();
  const { acaoId } = useParams<{ acaoId?: string }>();
  
  const [acoes, setAcoes] = useState<AcaoSustentavel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [acaoAberta, setAcaoAberta] = useState<string>(acaoId || "");
  

  // Controla a abertura e o fechamento do modal.
  const [enviado, setEnviado] = useState(false);
  const [movePoints, setMovePoints] = useState(getMovePoints);
  const rankingAtual = getCurrentRanking(ranking);

  // Encontra os dados do usuário atual no ranking.
  const usuarioAtual = rankingAtual.find((pessoa) => pessoa.usuarioAtual);

  useEffect(() => {
    document.title = "SoulMove | Registrar ações";
  }, []);

  useEffect(() => {
    startTransition(() => {
      setAcaoAberta(acaoId || "");
    });
  }, [acaoId]);

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
    async function carregarAtividades() {
      try {
        // A API traz o catálogo completo
        const resposta = await api.get("/atividades"); 
        
        const listaAtividades = resposta.data || [];

        // Mapeamos diretamente os dados ricos que vêm do Java
        const acoesFormatadas = listaAtividades.map((item: AtividadeBackend) => {
          // Busca apenas o ícone e textos de ajuda no dicionário local
          const dadosVisuais = acoesSustentaveis.find((mock) => mock.id === item.tipoAtividade);

          return {
            id: String(item.id), // ID real do banco (ex: "3") para o React Router
            titulo: item.nome, // "Reciclar vidro" direto do Java
            pontos: item.pontuacao, // Pontuação oficial direto do Java
            icone: dadosVisuais?.icone || "📌",
            comprovacao: dadosVisuais?.comprovacao || item.validacao || "Envie um comprovante válido.",
            exemplo: dadosVisuais?.exemplo || item.descricao || "Ex.: Ação sustentável",
          };
        });

        setAcoes(acoesFormatadas);
      } catch (erro) {
        console.error("Erro ao carregar o catálogo de atividades:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarAtividades();
  }, []);

  async function handleEnviarAtividade(idDaAtividade: string, pontosGanhos: number) {
    try {
      // 1. Pega o ID do usuário logado do localStorage (ou usa 1 como fallback)
      const idUtilizadorLogado = Number(localStorage.getItem("usuariold")) || 1; 

      // 2. Dispara o POST usando a nossa função genérica
      await api.post("/atividades/registrar", {
        usuarioId: idUtilizadorLogado,
        atividadeId: Number(idDaAtividade)
      });

      // 3. Se o Java devolver 201 (Sucesso), atualizamos os pontos e abrimos o modal!
      setMovePoints(addMovePoints(pontosGanhos));
      setEnviado(true);

    } catch (erro: unknown) {
      
      if (erro instanceof ApiError) {
        // Se for 409 (Já registrou hoje), a mensagem vem bonitinha do Java
        alert(erro.message); 
      } else {
        console.error("Erro inesperado ao registar atividade:", erro);
        alert("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111]">
      <AsideBar />

      <main className="pb-[88px] min-[601px]:ml-[90px] min-[601px]:pb-0 min-[992px]:ml-[160px]">
        <section className="mx-auto w-[calc(100%-16px)] max-w-[960px] py-[20px] min-[426px]:w-[calc(100%-20px)] min-[426px]:py-[24px] min-[601px]:w-[calc(100%-24px)] min-[601px]:max-w-[760px] min-[601px]:py-[40px] min-[992px]:w-[calc(100%-32px)] min-[992px]:max-w-[960px] min-[992px]:py-[60px]">
          <div className="grid grid-cols-1 items-start gap-[28px] min-[992px]:grid-cols-[minmax(0,600px)_minmax(280px,340px)]">
            
            {/* Área principal com os cards das ações */}
            <div className="flex flex-col gap-[12px] min-[426px]:gap-[16px]">
              
              {/* MENSAGEM DE CARREGANDO ADICIONADA AQUI */}
              {carregando && (
                <div className="p-[22px] text-center text-[16px] font-bold text-[#2454de]">
                  Buscando atividades...
                </div>
              )}

              {/* LISTA DINÂMICA DA API EM VEZ DO MOCK */}
              {!carregando && acoes.map((acao) => (
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
                      {acao.icone}
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
                  {acaoAberta === acao.id && (
                    <div id={`formulario-${acao.id}`}>
                      <FormularioAcao
                        acao={acao}
                        aoEnviar={() => {
                          handleEnviarAtividade(acao.id, acao.pontos);
                          setEnviado(true);
                        }}
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
                  {usuarioAtual?.posicao ?? 0}º
                </span>
              </section>

              {/* Ranking Top 5 */}
              <section>
                <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
                  Ranking Top 5
                </h2>

                <ol className="flex flex-col gap-[10px]">
                  {rankingAtual.slice(0, 5).map((pessoa) => (
                    <li
                      key={pessoa.posicao}
                      className="grid grid-cols-[24px_32px_1fr] items-center gap-[12px] rounded-[8px] bg-white p-[12px] min-[601px]:grid-cols-[28px_36px_1fr_auto]"
                    >
                      <span className="text-[14px] font-bold text-[#2454de]">
                        {pessoa.posicao}º
                      </span>

                      {pessoa.foto ? (
                        <img
                          src={pessoa.foto}
                          alt={pessoa.nome}
                          className="h-[32px] w-[32px] rounded-full object-cover min-[601px]:h-[36px] min-[601px]:w-[36px]"
                        />
                      ) : (
                        <span className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#eaf2ff] text-[10px] font-bold text-[#2454de] min-[601px]:h-[36px] min-[601px]:w-[36px]">
                          {pessoa.iniciais}
                        </span>
                      )}

                      <div>
                        <strong className="block text-[14px] font-bold">
                          {pessoa.nome}
                        </strong>

                        <span className="block text-[12px] text-[#9b9b9b]">
                          {pessoa.cidade}
                        </span>
                      </div>

                      <strong className="col-start-3 text-[14px] font-bold text-[#2454de] min-[601px]:col-start-auto">
                        {pessoa.pontos.toLocaleString("pt-BR")}pts
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

              {/* Missões ativas */}
              <section className="flex flex-col">
                <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
                  Missões ativas
                </h2>

                {missoesValidacao.map((missao) => {
                  const progresso = (missao.progresso / missao.total) * 100;

                  return (
                    <article
                      key={missao.id}
                      className="mb-[10px] rounded-[8px] bg-white px-[16px] py-[12px]"
                    >
                      <div className="mb-[10px] flex items-center justify-between gap-2">
                        <strong className="text-[14px] font-bold">
                          {missao.titulo}
                        </strong>

                        <span className="text-[14px] font-bold text-[#ff7a00]">
                          +{missao.pontos}
                        </span>
                      </div>

                      <div className="mb-[8px] h-[7px] w-full overflow-hidden rounded-full bg-[#dedede]">
                        <span
                          className="block h-full rounded-full bg-[#2454de]"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[12px] text-[#777]">
                        <span>
                          {missao.progresso}/{missao.total}
                        </span>

                        <span>termina em {missao.diasRestantes} dias</span>
                      </div>
                    </article>
                  );
                })}

                <Link
                  to="/metricas"
                  className="mt-[4px] inline-flex text-[14px] font-semibold text-[#4d4d4d] transition hover:text-[#2454de]"
                >
                  Ver mais missões →
                </Link>
              </section>
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
