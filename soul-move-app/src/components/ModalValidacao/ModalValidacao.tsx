interface ModalSucessoProps {
  aberto: boolean;
  fecharModal: () => void;
}

export default function ModalSucesso({
  aberto,
  fecharModal,
}: ModalSucessoProps) {
  if (!aberto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-[20px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
      onClick={fecharModal}
    >
      <div
        className="w-full max-w-[380px] rounded-[12px] bg-white px-[24px] py-[30px] text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-[16px] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#e9f7ef] text-[28px] font-bold text-[#13b95e]">
          ✓
        </div>

        <h2
          id="titulo-modal"
          className="mb-[10px] text-[20px] font-bold text-[#111]"
        >
          Atividade enviada!
        </h2>

        <p className="mb-[20px] text-[14px] leading-[1.5] text-[#666]">
          Sua atividade foi enviada para avaliação com sucesso.
        </p>

        <button
          type="button"
          onClick={fecharModal}
          className="w-full cursor-pointer rounded-[8px] bg-[#2454de] p-[12px] text-[14px] font-bold text-white transition hover:bg-[#1d43b4]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}