import { useState } from "react";
import ModalResgate from "../components/ModalResgate/ModalResgate";

const recompensaExemplo = {
  id: "preview",
  titulo: "Recompensa de exemplo",
  descricao: "Dados ilustrativos para conferir o layout do modal.",
  custoPontos: 500,
};

export default function ResgatePreview() {
  const [aberto, setAberto] = useState(true);

  return (
    <main className="min-h-dvh bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Prévia visual</p>
        <h1 className="mt-3 text-3xl font-bold">Modal de resgate</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
          Os valores são exemplos. Esta prévia não realiza resgates nem altera pontos.
        </p>
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="mt-6 cursor-pointer rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          Abrir prévia do modal
        </button>
      </div>
      <ModalResgate
        aberto={aberto}
        recompensa={recompensaExemplo}
        saldoPontos={1000}
        aoCancelar={() => setAberto(false)}
      />
    </main>
  );
}