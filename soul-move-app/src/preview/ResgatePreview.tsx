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
  const [saldoExemplo, setSaldoExemplo] = useState(1000);

  return (
    <main className="min-h-dvh bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Prévia visual</p>
        <h1 className="mt-3 text-3xl font-bold">Modal de resgate</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
          Os valores são exemplos. Esta prévia não realiza resgates nem altera pontos.
        </p>
        <label className="mt-6 block max-w-xs text-sm font-semibold">
          Saldo de exemplo
          <select
            value={saldoExemplo}
            onChange={(evento) => setSaldoExemplo(Number(evento.target.value))}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3"
          >
            <option value={1000}>1.000 pontos — suficiente</option>
            <option value={500}>500 pontos — valor exato</option>
            <option value={300}>300 pontos — insuficiente</option>
            <option value={0}>0 pontos — sem saldo</option>
          </select>
        </label>
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
        saldoPontos={saldoExemplo}
        aoCancelar={() => setAberto(false)}
      />
    </main>
  );
}