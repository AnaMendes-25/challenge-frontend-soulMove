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
  if (!aberto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
      onClick={fecharModal}
    >
      <div
        className="w-full max-w-[380px] rounded-xl bg-white px-6 py-8 text-center"
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