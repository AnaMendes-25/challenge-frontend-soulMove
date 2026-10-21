import { useEffect, useId, useRef } from "react";
import { FiX } from "react-icons/fi";

export interface RecompensaResgate {
  id: string;
  titulo: string;
  descricao: string;
  custoPontos: number;
}

interface ModalResgateProps {
  aberto: boolean;
  recompensa: RecompensaResgate | null;
  saldoPontos: number;
  aoCancelar: () => void;
}

export default function ModalResgate({
  aberto,
  recompensa,
  saldoPontos,
  aoCancelar,
}: ModalResgateProps) {
  const tituloId = useId();
  const descricaoId = useId();
  const saldoId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelarRef = useRef<HTMLButtonElement>(null);
  const temRecompensa = recompensa !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!aberto || !temRecompensa || !dialog) {
      return;
    }

    const focoAnterior = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    cancelarRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = overflowAnterior;
      if (focoAnterior instanceof HTMLElement && focoAnterior.isConnected) {
        focoAnterior.focus();
      }
    };
  }, [aberto, temRecompensa]);

  if (!aberto || !recompensa) {
    return null;
  }

  const pontosFaltantes = Math.max(0, recompensa.custoPontos - saldoPontos);
  const saldoAposResgate = saldoPontos - recompensa.custoPontos;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      aria-describedby={`${descricaoId} ${saldoId}`}
      onCancel={(evento) => {
        evento.preventDefault();
        aoCancelar();
      }}
      onKeyDown={(evento) => {
        if (evento.key !== "Tab") return;

        const botoes = evento.currentTarget.querySelectorAll<HTMLButtonElement>(
          "button:not(:disabled)",
        );
        const primeiro = botoes[0];
        const ultimo = botoes[botoes.length - 1];

        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo?.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro?.focus();
        }
      }}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) {
          aoCancelar();
        }
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-3rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/45"
    >
      <div className="p-6 sm:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 id={tituloId} className="text-xl font-bold">Confirmar resgate</h2>
            <p id={descricaoId} className="mt-2 text-sm leading-relaxed text-slate-600">
              Revise a recompensa e o custo em pontos antes de confirmar.
            </p>
          </div>
          <button
            type="button"
            onClick={aoCancelar}
            aria-label="Fechar confirmação de resgate"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold">{recompensa.titulo}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{recompensa.descricao}</p>
          <dl className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <dt>Custo do resgate</dt>
              <dd className="font-semibold text-blue-700">
                {recompensa.custoPontos.toLocaleString("pt-BR")} pontos
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <dt>Seu saldo</dt>
              <dd className="font-semibold">{saldoPontos.toLocaleString("pt-BR")} pontos</dd>
            </div>
          </dl>
        </div>

        <p
          id={saldoId}
          role="status"
          className={`mt-4 rounded-lg p-3 text-sm leading-relaxed ${
            pontosFaltantes > 0
              ? "bg-amber-50 text-amber-900"
              : "bg-blue-50 text-blue-900"
          }`}
        >
          {pontosFaltantes > 0
            ? `Saldo insuficiente. Faltam ${pontosFaltantes.toLocaleString("pt-BR")} ${pontosFaltantes === 1 ? "ponto" : "pontos"} para resgatar esta recompensa.`
            : `Após confirmar o resgate, seu saldo será de ${saldoAposResgate.toLocaleString("pt-BR")} ${saldoAposResgate === 1 ? "ponto" : "pontos"}.`}
        </p>

        <footer className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            ref={cancelarRef}
            onClick={aoCancelar}
            className="min-h-11 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Cancelar
          </button>
          {/* Habilitar após integrar o endpoint real; abrir o modal não desconta pontos. */}
          <button
            type="button"
            disabled
            className="min-h-11 cursor-not-allowed rounded-lg bg-[#2545ed] px-4 py-3 text-sm font-semibold text-white opacity-60"
          >
            Confirmar resgate
          </button>
        </footer>
      </div>
    </dialog>
  );
}