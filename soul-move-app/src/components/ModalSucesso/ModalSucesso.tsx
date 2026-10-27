import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (aberto) {
      const frameInicial = requestAnimationFrame(() => {
        setVisivel(true);

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
      }, 200);

      return () => {
        cancelAnimationFrame(frameFechamento);
        clearTimeout(timer);
      };
    }
  }, [aberto]);

  if (!visivel) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5 transition-opacity duration-200 ${animando ? "opacity-100" : "opacity-0"
        }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
      onClick={fecharModal}
    >
      <div
        className={`w-full max-w-[380px] rounded-xl bg-white px-6 py-8 text-center transition-all duration-200 ${animando
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
    </div>
  );
}
