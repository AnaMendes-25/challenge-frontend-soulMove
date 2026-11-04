import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Recompensa, UsuarioRecompensaResponse } from "../../services/recompensasTypes";
import "../ModalSucesso/ModalSucesso.css";

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

export default function ModalResgate({
  recompensa,
  saldo,
  confirmando,
  erro,
  resultado,
  incerto,
  aoConfirmar,
  aoFechar,
  aoAtualizarSaldo,
}: ModalResgateProps) {
  const codigoDemonstrativo = "SOULMOVE-DEMO";
  const [mensagemCopia, setMensagemCopia] = useState("");
  const [fogosVisiveis, setFogosVisiveis] = useState(false);
  const codigoId = useId();
  const avisoCodigoId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelarRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const descricaoId = useId();
  const faltam = saldo === null ? 0 : Math.max(0, recompensa.valor - saldo);

  useEffect(() => {
    if (!resultado) return;

    const timerInicio = setTimeout(() => setFogosVisiveis(true), 0);
    const timerFim = setTimeout(() => setFogosVisiveis(false), 2500);

    return () => {
      clearTimeout(timerInicio);
      clearTimeout(timerFim);
    };
  }, [resultado]);

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
      const destino =
        focoAnterior instanceof HTMLButtonElement && focoAnterior.disabled
          ? focoAnterior.closest("section")?.querySelector<HTMLElement>("h2")
          : focoAnterior;
      if (destino instanceof HTMLElement && destino.isConnected) destino.focus();
    };
  }, []);

  useEffect(() => {
    if (resultado && !confirmando) cancelarRef.current?.focus();
  }, [resultado, confirmando]);

  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(codigoDemonstrativo);
      setMensagemCopia("Código demonstrativo copiado. Ele não tem validade comercial.");
    } catch {
      setMensagemCopia("Não foi possível copiar automaticamente. Selecione o código e copie manualmente.");
    }
  }

  // Focos espalhados de forma a lançar partículas para fora dos limites do card
  const focos = [
    { x: 10, y: 15, escala: 1.3 }, // Canto superior esquerdo
    { x: 90, y: 15, escala: 1.3 }, // Canto superior direito
    { x: 50, y: 50, escala: 1.5 }, // Centro
    { x: 10, y: 85, escala: 1.3 }, // Canto inferior esquerdo
    { x: 90, y: 85, escala: 1.3 }, // Canto inferior direito
  ];

  const particulas = focos.flatMap((foco, focoIndice) =>
    Array.from({ length: 35 }, (_, indice) => {
      const angulo = (indice / 35) * Math.PI * 2;
      const distancia = (indice % 2 === 0 ? 55 : 38) * foco.escala;

      return {
        id: `${focoIndice}-${indice}`,
        origemX: foco.x,
        origemY: foco.y,
        distanciaX: Math.cos(angulo) * distancia,
        distanciaY: Math.sin(angulo) * distancia,
        atraso: focoIndice * 0.08 + (indice % 5) * 0.02,
        cor: indice % 3 === 0 ? "#4f46e5" : indice % 3 === 1 ? "#2563eb" : "#38bdf8",
      };
    }),
  );

  const estiloBotao =
    "min-h-11 rounded-lg px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      aria-describedby={descricaoId}
      aria-busy={confirmando}
      onCancel={(evento) => {
        evento.preventDefault();
        if (!confirmando) aoFechar();
      }}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget && !confirmando) aoFechar();
      }}
      onKeyDown={(evento) => {
        if (evento.key !== "Tab") return;
        const botoes = evento.currentTarget.querySelectorAll<HTMLElement>(
          "button:not(:disabled), input:not(:disabled)",
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
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-visible rounded-xl border-0 bg-white p-5 text-slate-900 shadow-2xl backdrop:bg-slate-950/45 sm:p-6"
    >
      {fogosVisiveis && (
        <div className="modal-sucesso-fogos pointer-events-none absolute inset-0 z-50 overflow-visible" aria-hidden="true">
          {particulas.map((particula) => (
            <span
              key={particula.id}
              className="modal-sucesso-particula"
              style={
                {
                  "--distancia-x": `${particula.distanciaX}vw`,
                  "--distancia-y": `${particula.distanciaY}vh`,
                  "--origem-x": `${particula.origemX}%`,
                  "--origem-y": `${particula.origemY}%`,
                  "--atraso": `${particula.atraso}s`,
                  "--cor-particula": particula.cor,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {resultado && (
        <div className="mx-auto mb-4 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#e9f7ef] text-[28px] font-bold text-[#13b95e]">
          ✓
        </div>
      )}

      <h2 id={tituloId} className="text-lg font-bold text-center">
        {resultado ? "Resgate realizado!" : "Confirmar resgate"}
      </h2>
      <p id={descricaoId} className="mt-2 text-sm text-slate-600 text-center">
        {resultado
          ? "Seu resgate foi registrado. Guarde os dados abaixo."
          : "Revise a recompensa e o custo antes de confirmar. Abrir este modal não utiliza seus pontos."}
      </p>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/30 p-4">
        <h3 className="break-words text-sm font-bold">
          {resultado?.descricaoRecompensa ?? recompensa.descricao}
        </h3>
        <p className="mt-2 text-sm font-semibold text-blue-700">
          {recompensa.valor.toLocaleString("pt-BR")} MOVE Points
        </p>
        {resultado && (
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Número do resgate</dt>
              <dd className="select-text font-semibold">{resultado.id}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Data</dt>
              <dd>{resultado.dataRecebimento.split("-").reverse().join("/")}</dd>
            </div>
          </dl>
        )}
      </div>

      {saldo !== null && (
        <p className="mt-4 text-sm">
          {resultado ? "Saldo atualizado" : "Seu saldo"}:{" "}
          <strong>{saldo.toLocaleString("pt-BR")} pts</strong>
        </p>
      )}

      {!resultado && saldo !== null && (
        <p className="mt-2 text-sm text-slate-600">
          {faltam > 0
            ? `Saldo insuficiente. Faltam ${faltam.toLocaleString("pt-BR")} pontos.`
            : `Saldo após o resgate: ${(saldo - recompensa.valor).toLocaleString("pt-BR")} pts.`}
        </p>
      )}

      <p id={avisoCodigoId} className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        Este benefício é demonstrativo e não tem validade comercial. O resgate utiliza seus MOVE Points.
      </p>

      {resultado && (
        <div className="mt-4 space-y-2">
          <label htmlFor={codigoId} className="block text-sm font-semibold">
            Código demonstrativo — sem validade
          </label>
          <input
            id={codigoId}
            type="text"
            readOnly
            value={codigoDemonstrativo}
            aria-describedby={avisoCodigoId}
            onFocus={(evento) => evento.currentTarget.select()}
            className="min-h-11 w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-mono text-sm font-semibold text-blue-900 outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={() => void copiarCodigo()}
            className={`${estiloBotao} w-full bg-blue-600 text-white`}
          >
            Copiar código demonstrativo
          </button>
          <p role="status" className="text-sm text-slate-600">
            {mensagemCopia}
          </p>
        </div>
      )}

      {saldo === null && !incerto && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900" role="status">
          <p>
            {resultado
              ? "O resgate foi realizado, mas não foi possível atualizar seu saldo. Não confirme o mesmo resgate novamente."
              : "Atualize seu saldo antes de confirmar um resgate."}
          </p>
          <button
            type="button"
            disabled={confirmando}
            onClick={aoAtualizarSaldo}
            className="mt-2 min-h-11 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            Atualizar saldo
          </button>
        </div>
      )}

      {erro && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{erro}</p>}
      {confirmando && <p role="status" className="mt-4 text-sm text-blue-700">Aguarde, estamos processando sua solicitação.</p>}

      <footer className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          ref={cancelarRef}
          type="button"
          aria-disabled={confirmando}
          onClick={() => {
            if (!confirmando) aoFechar();
          }}
          className={`${estiloBotao} border border-slate-200`}
        >
          {resultado ? "Fechar" : "Cancelar"}
        </button>
        {!resultado && (
          <button
            type="button"
            disabled={saldo === null || faltam > 0 || incerto}
            aria-disabled={confirmando}
            onClick={() => {
              if (!confirmando) aoConfirmar();
            }}
            className={`${estiloBotao} bg-blue-600 text-white`}
          >
            {confirmando ? "Resgatando..." : "Confirmar resgate"}
          </button>
        )}
      </footer>
    </dialog>
  );
}