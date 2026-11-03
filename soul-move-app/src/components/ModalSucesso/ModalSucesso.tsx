import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./ModalSucesso.css";

interface ModalSucessoProps {
  aberto: boolean;
  titulo: string;
  texto: string;
  fecharModal: () => void;
}

export default function ModalSucesso({
  aberto,
  titulo,
  texto,
  fecharModal,
}: ModalSucessoProps) {
  const [visivel, setVisivel] = useState(aberto);
  const [animando, setAnimando] = useState(false);
  const [fogosVisiveis, setFogosVisiveis] = useState(false);
  const foiAberto = useRef(aberto);

  useEffect(() => {
    let timerFogos: ReturnType<typeof setTimeout> | undefined;

    if (aberto) {
      foiAberto.current = true;
      const frameInicial = requestAnimationFrame(() => {
        setVisivel(true);
        setFogosVisiveis(false);

        requestAnimationFrame(() => {
          setAnimando(true);
        });
      });

      return () => cancelAnimationFrame(frameInicial);
    } else {
      const frameFechamento = requestAnimationFrame(() => {
        setAnimando(false);
      });

      const timer = setTimeout(() => {
        setVisivel(false);

        if (foiAberto.current) {
          setFogosVisiveis(true);
          timerFogos = setTimeout(() => setFogosVisiveis(false), 1400);
        }
      }, 200);

      return () => {
        cancelAnimationFrame(frameFechamento);
        clearTimeout(timer);
        if (timerFogos) {
          clearTimeout(timerFogos);
        }
      };
    }
  }, [aberto]);

  if (!visivel && !fogosVisiveis) {
    return null;
  }

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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        visivel
          ? `bg-black/45 p-5 transition-opacity duration-200 ${
              animando ? "opacity-100" : "opacity-0"
            }`
          : ""
      }`}
      role={visivel ? "dialog" : undefined}
      aria-modal={visivel ? "true" : undefined}
      aria-labelledby={visivel ? "titulo-modal" : undefined}
      onClick={visivel ? fecharModal : undefined}
    >
      <div className="modal-sucesso-fogos" aria-hidden="true">
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

      {visivel && (
        <div
          className={`relative z-10 w-full max-w-[380px] rounded-xl bg-white px-6 py-8 text-center transition-all duration-200 ${
            animando
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-95 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
        <div className="mx-auto mb-4 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#e9f7ef] text-[28px] font-bold text-[#13b95e]">
          ✓
        </div>

        <h2
          id="titulo-modal"
          className="mb-2 text-xl font-bold text-[#111]"
        >
          {titulo}
        </h2>

        <p className="mb-5 text-sm leading-relaxed text-[#666]">
          {texto}
        </p>

        <button
          type="button"
          onClick={fecharModal}
          className="w-full cursor-pointer rounded-lg bg-[#2454de] p-3 text-sm font-bold text-white transition hover:bg-[#1d43b4]"
        >
          Fechar
        </button>
        </div>
      )}
    </div>
  );
}
