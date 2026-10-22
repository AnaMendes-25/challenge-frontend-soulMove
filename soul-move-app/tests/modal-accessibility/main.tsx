import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import ModalSucesso from "../../src/components/ModalSucesso/ModalSucesso";
import "./styles.css";

export default function CenarioModal() {
  const [aberto, setAberto] = useState(false);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Teste isolado de acessibilidade — SoulMove</h1>
      <p>Usa o componente real, sem registrar atividades nem alterar pontos.</p>
      <button
        className="my-6 rounded bg-blue-700 p-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4"
        onClick={() => setAberto(true)}
      >
        Abrir modal de teste
      </button>
      <p><a href="#fora">Link fora do diálogo</a></p>
      <ModalSucesso
        aberto={aberto}
        titulo="Atividade enviada"
        texto="Mensagem de exemplo para testar foco, teclado e fechamento."
        fecharModal={() => setAberto(false)}
      />
    </main>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Elemento de montagem não encontrado.");
createRoot(root).render(<StrictMode><CenarioModal /></StrictMode>);
