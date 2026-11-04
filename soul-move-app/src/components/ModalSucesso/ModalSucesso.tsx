import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./ModalSucesso.css";

interface ModalSucessoProps {
  aberto: boolean;
  titulo: string;
  texto: string;
  fecharModal: () => void;
}

export default function ModalSucesso({ aberto, titulo, texto, fecharModal }: ModalSucessoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const descricaoId = useId();
  const [visivel, setVisivel] = useState(aberto);
  const [animando, setAnimando] = useState(false);
  const [fogosVisiveis, setFogosVisiveis] = useState(false);
  const foiAberto = useRef(aberto);

  useEffect(() => {
    let segundoFrame: number | undefined;
    let timerFogos: ReturnType<typeof setTimeout> | undefined;

    if (aberto) {
      foiAberto.current = true;
      const frame = requestAnimationFrame(() => {
        setVisivel(true);
        setFogosVisiveis(false);
        segundoFrame = requestAnimationFrame(() => setAnimando(true));
      });
      return () => {
        cancelAnimationFrame(frame);
        if (segundoFrame !== undefined) cancelAnimationFrame(segundoFrame);
      };
    }

    const frame = requestAnimationFrame(() => setAnimando(false));
    const timer = setTimeout(() => {
      setVisivel(false);
      if (foiAberto.current) {
        foiAberto.current = false;
        setFogosVisiveis(true);
        timerFogos = setTimeout(() => setFogosVisiveis(false), 1400);
      }
    }, 200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      if (timerFogos !== undefined) clearTimeout(timerFogos);
    };
  }, [aberto]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!visivel || !dialog) return;
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
  }, [visivel]);

  const focos = [
    { x: 18, y: 30, escala: 1.1 },
    { x: 50, y: 54, escala: 1.35 },
    { x: 82, y: 32, escala: 1.05 },
  ];
  const particulas = focos.flatMap((foco, focoIndice) =>
    Array.from({ length: 42 }, (_, indice) => {
      const angulo = (indice / 42) * Math.PI * 2;
      const distancia = (indice % 2 === 0 ? 48 : 36) * foco.escala;
      return {
        id: `${focoIndice}-${indice}`,
        origemX: foco.x,
        origemY: foco.y,
        distanciaX: Math.cos(angulo) * distancia,
        distanciaY: Math.sin(angulo) * distancia,
        atraso: focoIndice * 0.1 + (indice % 7) * 0.018,
        cor: indice % 3 === 0 ? "#4f46e5" : indice % 3 === 1 ? "#2563eb" : "#818cf8",
      };
    }),
  );

  return (
    <>
      {visivel && (
        <dialog
          ref={dialogRef}
          className={`fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-hidden border-0 bg-black/45 p-5 transition-opacity duration-200 open:flex backdrop:bg-transparent motion-reduce:transition-none motion-reduce:opacity-100 ${animando ? "opacity-100" : "opacity-0"}`}
          aria-modal="true"
          aria-labelledby={tituloId}
          aria-describedby={descricaoId}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focaveis = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]',
              ),
            ).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
            const primeiro = focaveis[0];
            const ultimo = focaveis[focaveis.length - 1];
            if (!primeiro) {
              event.preventDefault();
            } else if (event.shiftKey && document.activeElement === primeiro) {
              event.preventDefault();
              ultimo.focus();
            } else if (!event.shiftKey && document.activeElement === ultimo) {
              event.preventDefault();
              primeiro.focus();
            }
          }}
          onCancel={(event) => {
            event.preventDefault();
            fecharModal();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) fecharModal();
          }}
        >
          <div className={`w-full max-w-[380px] rounded-xl bg-white px-6 py-8 text-center transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${animando ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"}`}>
            <div aria-hidden="true" className="mx-auto mb-4 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#e9f7ef] text-[28px] font-bold text-[#13b95e]">✓</div>
            <h2 id={tituloId} className="mb-2 text-xl font-bold text-[#111]">{titulo}</h2>
            <p id={descricaoId} className="mb-5 text-sm leading-relaxed text-[#666]">{texto}</p>
            <button ref={fecharRef} type="button" onClick={fecharModal} className="w-full cursor-pointer rounded-lg bg-[#2454de] p-3 text-sm font-bold text-white hover:bg-[#1d43b4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d43b4] motion-safe:transition-colors motion-reduce:transition-none">Fechar</button>
          </div>
        </dialog>
      )}
      {fogosVisiveis && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          <div className="modal-sucesso-fogos">
            {particulas.map((particula) => (
              <span key={particula.id} className="modal-sucesso-particula" style={{
                "--distancia-x": `${particula.distanciaX}vw`,
                "--distancia-y": `${particula.distanciaY}vh`,
                "--origem-x": `${particula.origemX}%`,
                "--origem-y": `${particula.origemY}%`,
                "--atraso": `${particula.atraso}s`,
                "--cor-particula": particula.cor,
              } as CSSProperties} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
