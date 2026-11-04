import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ApiError } from "../../services/api";
import { atividadesService } from "../../services/atividadesService";
import type { AtividadeBackend, UsuarioAtividadeResponse } from "../../services/atividadesTypes";
import { acoesSustentaveis } from "../../data/ValidacaoData";
import { formatarDataPtBr } from "../../utils/formatarData";

interface HistoricoAtividadesProps {
  usuarioId: number;
  /** Incrementar este valor recarrega a lista (ex.: depois de registrar uma atividade). */
  recarregarKey?: number;
}

type EstadoLista = "carregando" | "pronto" | "erro";

interface EstadoDetalhe {
  registro: UsuarioAtividadeResponse;
  status: "carregando" | "pronto" | "erro" | "removido";
  atividade?: AtividadeBackend;
  mensagem?: string;
}

const ROTULO_TIPO: Record<string, string> = {
  RECICLAGEM: "Reciclagem",
  TRANSPORTE_PUBLICO: "Transporte público",
  TRAJETO_CAMINHADA: "Trajeto a pé",
  TRAJETO_BIKE: "Trajeto de bike",
  REDUCAO_ENERGIA: "Redução de energia",
};

/** Ícone da atividade: o histórico só traz o nome; o tipo vem do catálogo. */
function visualDaAtividade(nomeAtividade: string, catalogo: AtividadeBackend[] | null) {
  const tipo = catalogo?.find((item) => item.nome === nomeAtividade)?.tipoAtividade;
  return acoesSustentaveis.find((visual) => visual.id === tipo);
}

function mensagemDeErro(erro: unknown, padrao: string): string {
  return erro instanceof ApiError ? erro.message : padrao;
}

export default function HistoricoAtividades({ usuarioId, recarregarKey = 0 }: HistoricoAtividadesProps) {
  const [registros, setRegistros] = useState<UsuarioAtividadeResponse[]>([]);
  const [estado, setEstado] = useState<EstadoLista>("carregando");
  const [mensagemErro, setMensagemErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [detalhe, setDetalhe] = useState<EstadoDetalhe | null>(null);
  const [catalogo, setCatalogo] = useState<AtividadeBackend[] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const tituloDetalheId = useId();
  const detalheAberto = detalhe !== null;

  // GET /atividades/historico/{usuarioId}
  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setEstado("carregando");

      try {
        // O catálogo só serve para ícone/detalhe: se falhar, a lista continua sendo exibida.
        const [lista, catalogoApi] = await Promise.all([
          atividadesService.obterHistorico(usuarioId, { signal: controller.signal }),
          atividadesService.listarAtividades(undefined, { signal: controller.signal }).catch(() => null),
        ]);
        if (controller.signal.aborted) return;

        if (catalogoApi) setCatalogo(catalogoApi);
        setRegistros(lista);
        setEstado("pronto");
      } catch (erro) {
        if (controller.signal.aborted) return;

        console.error("Erro ao carregar o histórico de atividades:", erro);
        setMensagemErro(mensagemDeErro(erro, "Não foi possível carregar suas atividades."));
        setEstado("erro");
      }
    }

    void carregar();

    return () => controller.abort();
  }, [usuarioId, recarregarKey, tentativa]);

  // Detalhe: o histórico só traz o nome da atividade; o GET por ID existe no catálogo (/atividades/{id}).
  const abrirDetalhe = useCallback(
    async (registro: UsuarioAtividadeResponse) => {
      setDetalhe({ registro, status: "carregando" });

      try {
        const lista = catalogo ?? (await atividadesService.listarAtividades());
        if (!catalogo) setCatalogo(lista);

        const correspondente = lista.find((item) => item.nome === registro.nomeAtividade);
        if (!correspondente) {
          setDetalhe((atual) => atual?.registro.id === registro.id ? {
            registro,
            status: "removido",
            mensagem: "Esta atividade não está mais disponível no catálogo.",
          } : atual);
          return;
        }

        const atividade = await atividadesService.buscarPorId(correspondente.id);
        setDetalhe((atual) =>
          atual?.registro.id === registro.id ? { registro, status: "pronto", atividade } : atual,
        );
      } catch (erro) {
        if (erro instanceof ApiError && erro.status === 404) {
          setDetalhe((atual) => atual?.registro.id === registro.id ? {
            registro,
            status: "removido",
            mensagem: "Esta atividade não está mais disponível no catálogo.",
          } : atual);
          return;
        }

        setDetalhe((atual) =>
          atual?.registro.id === registro.id
            ? { registro, status: "erro", mensagem: mensagemDeErro(erro, "Não foi possível carregar o detalhe.") }
            : atual,
        );
      }
    },
    [catalogo],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!detalheAberto || !dialog) return;

    const disparador = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    dialog.showModal();
    fecharRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = overflowAnterior;
      if (disparador instanceof HTMLElement && disparador.isConnected) disparador.focus();
    };
  }, [detalheAberto]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open && !dialog.contains(document.activeElement)) {
      fecharRef.current?.focus();
    }
  }, [detalhe?.status]);

  return (
    <section className="flex flex-col">
      <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
        Atividades registradas
      </h2>

      {estado === "carregando" && (
        <p className="rounded-[8px] bg-white px-[16px] py-[14px] text-[14px] text-[#777]" role="status">
          Carregando atividades...
        </p>
      )}

      {estado === "erro" && (
        <div className="rounded-[8px] bg-white px-[16px] py-[14px]" role="alert">
          <p className="mb-[10px] text-[14px] text-[#b42318]">{mensagemErro}</p>
          <button
            type="button"
            onClick={() => setTentativa((n) => n + 1)}
            className="cursor-pointer text-[14px] font-semibold text-[#2454de] hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {estado === "pronto" && registros.length === 0 && (
        <p className="rounded-[8px] bg-white px-[16px] py-[14px] text-[14px] text-[#777]">
          Você ainda não registrou nenhuma atividade.
        </p>
      )}

      {estado === "pronto" && registros.length > 0 && (
        <ul className="flex flex-col gap-[10px]">
          {registros.slice(0, 5).map((registro) => {
            const visual = visualDaAtividade(registro.nomeAtividade, catalogo);

            return (
            <li
              key={registro.id}
              className="flex items-center gap-[10px] rounded-[8px] bg-white px-[16px] py-[12px]"
            >
              <div
                className="grid h-[36px] min-w-[36px] place-items-center rounded-full bg-[#eaf2ff] text-[16px] text-[#2454de]"
                aria-hidden="true"
              >
                {visual?.iconeImg ? (
                  <img src={visual.iconeImg} alt="" className="h-[22px] w-[22px] object-contain" />
                ) : (
                  (visual?.icone ?? "📌")
                )}
              </div>

              <button
                type="button"
                onClick={() => void abrirDetalhe(registro)}
                className="flex min-w-0 flex-1 cursor-pointer flex-col gap-[4px] text-left"
                aria-label={`Ver detalhes de ${registro.nomeAtividade}`}
              >
                <strong className="truncate text-[14px] font-bold text-[#111]">
                  {registro.nomeAtividade}
                </strong>

                <span className="flex items-center justify-between gap-2 text-[12px] text-[#777]">
                  <time dateTime={registro.dataAtividade}>{formatarDataPtBr(registro.dataAtividade)}</time>
                  <span className="text-[14px] font-bold text-[#ff7a00]">+{registro.pontosRecebida} pts</span>
                </span>
              </button>

            </li>
            );
          })}
        </ul>
      )}

      {detalhe && (
        <dialog
          ref={dialogRef}
          aria-modal="true"
          aria-labelledby={tituloDetalheId}
          className="fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none place-items-center border-0 bg-black/40 p-[16px] open:grid backdrop:bg-transparent"
          onCancel={(evento) => {
            evento.preventDefault();
            setDetalhe(null);
          }}
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) setDetalhe(null);
          }}
          onKeyDown={(evento) => {
            if (evento.key !== "Tab") return;
            const focaveis = Array.from(
              evento.currentTarget.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]',
              ),
            ).filter((elemento) => elemento.tabIndex >= 0 && elemento.getClientRects().length > 0);
            const primeiro = focaveis[0];
            const ultimo = focaveis[focaveis.length - 1];
            if (!primeiro) {
              evento.preventDefault();
            } else if (evento.shiftKey && document.activeElement === primeiro) {
              evento.preventDefault();
              ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
              evento.preventDefault();
              primeiro.focus();
            }
          }}
        >
          <div className="max-h-[85dvh] w-full max-w-[420px] overflow-y-auto rounded-[12px] bg-white p-[20px]">
            <div className="mb-[12px] flex items-start justify-between gap-[12px]">
              <h3 id={tituloDetalheId} className="text-[16px] font-bold text-[#111]">
                {detalhe.registro.nomeAtividade}
              </h3>
              <button
                ref={fecharRef}
                type="button"
                onClick={() => setDetalhe(null)}
                className="cursor-pointer rounded text-[18px] leading-none text-[#555] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2454de]"
                aria-label="Fechar detalhes"
              >
                ×
              </button>
            </div>

            <dl className="mb-[12px] grid grid-cols-[auto_1fr] gap-x-[12px] gap-y-[6px] text-[14px]">
              <dt className="text-[#777]">Data</dt>
              <dd>{formatarDataPtBr(detalhe.registro.dataAtividade)}</dd>
              <dt className="text-[#777]">Pontos</dt>
              <dd className="font-bold text-[#ff7a00]">+{detalhe.registro.pontosRecebida} pts</dd>
            </dl>

            {detalhe.status === "carregando" && (
              <p className="text-[14px] text-[#777]" role="status">Carregando detalhes...</p>
            )}

            {detalhe.status === "pronto" && detalhe.atividade && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-[12px] gap-y-[6px] text-[14px]">
                <dt className="text-[#777]">Tipo</dt>
                <dd>{ROTULO_TIPO[detalhe.atividade.tipoAtividade] ?? detalhe.atividade.tipoAtividade}</dd>
                <dt className="text-[#777]">Descrição</dt>
                <dd>{detalhe.atividade.descricao}</dd>
                <dt className="text-[#777]">Validação</dt>
                <dd>{detalhe.atividade.validacao}</dd>
              </dl>
            )}

            {detalhe.status === "removido" && (
              <p className="text-[14px] text-[#777]" role="status">{detalhe.mensagem}</p>
            )}

            {detalhe.status === "erro" && (
              <div role="alert">
                <p className="mb-[8px] text-[14px] text-[#b42318]">{detalhe.mensagem}</p>
                <button
                  type="button"
                  onClick={() => void abrirDetalhe(detalhe.registro)}
                  className="cursor-pointer text-[14px] font-semibold text-[#2454de] hover:underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
}
