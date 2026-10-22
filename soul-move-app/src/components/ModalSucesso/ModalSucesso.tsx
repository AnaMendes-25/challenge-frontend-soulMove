import { useEffect, useId, useRef } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const descricaoId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!aberto || !dialog) return;

    const disparador = document.activeElement;
    const overflowAnterior = document.body.style.overflow;

    dialog.showModal();
    fecharRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = overflowAnterior;
      if (disparador instanceof HTMLElement && disparador.isConnected) {
        disparador.focus();
      }
    };
  }, [aberto]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-black/45 p-5 open:flex backdrop:bg-transparent"
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
      <div className="w-full max-w-[380px] rounded-xl bg-white px-6 py-8 text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#e9f7ef] text-[28px] font-bold text-[#13b95e]"
        >
          ✓
        </div>

        <h2 id={tituloId} className="mb-2 text-xl font-bold text-[#111]">
          {titulo}
        </h2>
        <p id={descricaoId} className="mb-5 text-sm leading-relaxed text-[#666]">
          {texto}
        </p>
        <button
          ref={fecharRef}
          type="button"
          onClick={fecharModal}
          className="w-full cursor-pointer rounded-lg bg-[#2454de] p-3 text-sm font-bold text-white hover:bg-[#1d43b4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d43b4] motion-safe:transition-colors motion-reduce:transition-none"
        >
          Fechar
        </button>
      </div>
    </dialog>
  );
}
