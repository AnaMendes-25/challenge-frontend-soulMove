import { useEffect, useId, useRef } from "react";
import type { Recompensa, UsuarioRecompensaResponse } from "../../services/recompensasTypes";

interface ModalResgateProps {
  recompensa: Recompensa;
  saldo: number | null;
  confirmando: boolean;
  erro: string;
  resultado: UsuarioRecompensaResponse | null;
  incerto: boolean;
  aoConfirmar: () => void;
  aoFechar: () => void;
  aoAtualizarSaldo: () => void;
}

export default function ModalResgate({ recompensa, saldo, confirmando, erro, resultado, incerto, aoConfirmar, aoFechar, aoAtualizarSaldo }: ModalResgateProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelarRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const descricaoId = useId();
  const faltam = saldo === null ? 0 : Math.max(0, recompensa.valor - saldo);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focoAnterior = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    cancelarRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflowAnterior;
      const destino = focoAnterior instanceof HTMLButtonElement && focoAnterior.disabled
        ? focoAnterior.closest("section")?.querySelector<HTMLElement>("h2")
        : focoAnterior;
      if (destino instanceof HTMLElement && destino.isConnected) destino.focus();
    };
  }, []);

  useEffect(() => {
    if (resultado && !confirmando) cancelarRef.current?.focus();
  }, [resultado, confirmando]);

  const estiloBotao = "min-h-11 rounded-lg px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      aria-describedby={descricaoId}
      aria-busy={confirmando}
      onCancel={(evento) => { evento.preventDefault(); if (!confirmando) aoFechar(); }}
      onClick={(evento) => { if (evento.target === evento.currentTarget && !confirmando) aoFechar(); }}
      onKeyDown={(evento) => {
        if (evento.key !== "Tab") return;
        const botoes = evento.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        const primeiro = botoes[0];
        const ultimo = botoes[botoes.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo?.focus(); }
        else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro?.focus(); }
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border-0 bg-white p-5 text-slate-900 shadow-2xl backdrop:bg-slate-950/45 sm:p-6"
    >
      <h2 id={tituloId} className="text-lg font-bold">{resultado ? "Resgate realizado!" : "Confirmar resgate"}</h2>
      <p id={descricaoId} className="mt-2 text-sm text-slate-600">
        {resultado ? "Seu resgate foi registrado. Guarde os dados abaixo." : "Revise a recompensa e o custo antes de confirmar. Abrir este modal não utiliza seus pontos."}
      </p>
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/30 p-4">
        <h3 className="break-words text-sm font-bold">{resultado?.descricaoRecompensa ?? recompensa.descricao}</h3>
        <p className="mt-2 text-sm font-semibold text-blue-700">{recompensa.valor.toLocaleString("pt-BR")} MOVE Points</p>
        {resultado && <dl className="mt-3 space-y-2 text-sm">
          <div><dt className="text-slate-500">Número do resgate</dt><dd className="select-text font-semibold">{resultado.id}</dd></div>
          <div><dt className="text-slate-500">Data</dt><dd>{resultado.dataRecebimento.split("-").reverse().join("/")}</dd></div>
        </dl>}
      </div>
      {saldo !== null && <p className="mt-4 text-sm">{resultado ? "Saldo atualizado" : "Seu saldo"}: <strong>{saldo.toLocaleString("pt-BR")} pts</strong></p>}
      {!resultado && saldo !== null && <p className="mt-2 text-sm text-slate-600">{faltam > 0 ? `Saldo insuficiente. Faltam ${faltam.toLocaleString("pt-BR")} pontos.` : `Saldo após o resgate: ${(saldo - recompensa.valor).toLocaleString("pt-BR")} pts.`}</p>}
      {resultado && <p className="mt-4 text-sm text-slate-600">O código do benefício ainda não está disponível. O número acima identifica o registro do resgate.</p>}
      {saldo === null && !incerto && <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900" role="status">
        <p>{resultado ? "O resgate foi realizado, mas não foi possível atualizar seu saldo. Não confirme o mesmo resgate novamente." : "Atualize seu saldo antes de confirmar um resgate."}</p>
        <button type="button" disabled={confirmando} onClick={aoAtualizarSaldo} className="mt-2 min-h-11 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-600">Atualizar saldo</button>
      </div>}
      {erro && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{erro}</p>}
      {confirmando && <p role="status" className="mt-4 text-sm text-blue-700">Aguarde, estamos processando sua solicitação.</p>}
      <footer className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button ref={cancelarRef} type="button" aria-disabled={confirmando} onClick={() => { if (!confirmando) aoFechar(); }} className={`${estiloBotao} border border-slate-200`}>{resultado ? "Fechar" : "Cancelar"}</button>
        {!resultado && <button type="button" disabled={saldo === null || faltam > 0 || incerto} aria-disabled={confirmando} onClick={() => { if (!confirmando) aoConfirmar(); }} className={`${estiloBotao} bg-blue-600 text-white`}>{confirmando ? "Resgatando..." : "Confirmar resgate"}</button>}
      </footer>
    </dialog>
  );
}