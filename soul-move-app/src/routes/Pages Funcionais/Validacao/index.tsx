import {
  useEffect,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { Link } from "react-router";
import AsideBar from "../../../components/AsideBar/AsideBar";
import { ranking } from "../../../types/MetricasData";
import {
  acoesSustentaveis,
  missoesValidacao,
  type AcaoSustentavel,
} from "../../../types/ValidacaoData";
import ModalSucesso from "../../../components/ModalValidacao/ModalValidacao";

interface ErrosFormulario {
  nome?: string;
  comentario?: string;
  arquivo?: string;
}

export default function Validacao() {
  // O card de trajeto a pé começa aberto, como no layout original.
  const [acaoAberta, setAcaoAberta] = useState("pe");

  const [nome, setNome] = useState("");
  const [comentario, setComentario] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    document.title = "SoulMove | Registrar ações";
  }, []);

  function abrirOuFecharCard(id: string) {
    setAcaoAberta((cardAtual) => (cardAtual === id ? "" : id));
    limparFormulario();
  }

  function limparFormulario() {
    setNome("");
    setComentario("");
    setArquivo(null);
    setPreview("");
    setErros({});
  }

  function processarArquivo(arquivoSelecionado?: File) {
    if (!arquivoSelecionado) {
      return;
    }

    if (!arquivoSelecionado.type.startsWith("image/")) {
      setErros((errosAtuais) => ({
        ...errosAtuais,
        arquivo: "Por favor, envie uma imagem PNG ou JPG.",
      }));
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setArquivo(arquivoSelecionado);
      setPreview(String(leitor.result));
      setErros((errosAtuais) => ({
        ...errosAtuais,
        arquivo: undefined,
      }));
    };

    leitor.readAsDataURL(arquivoSelecionado);
  }

  function handleArquivo(event: ChangeEvent<HTMLInputElement>) {
    processarArquivo(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    processarArquivo(event.dataTransfer.files?.[0]);
  }

  function removerImagem() {
    setArquivo(null);
    setPreview("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const novosErros: ErrosFormulario = {};

  if (!arquivo) {
    novosErros.arquivo = "Envie uma imagem como comprovante.";
  }

  if (!nome.trim()) {
    novosErros.nome = "Digite o nome da atividade.";
  }

  if (!comentario.trim()) {
    novosErros.comentario =
      "Insira um comentário sobre a atividade.";
  }

  setErros(novosErros);

  if (Object.keys(novosErros).length > 0) {
    return;
  }

  setModalAberto(true);
  limparFormulario();
}

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111]">
      <AsideBar />

      <main className="pb-[88px] min-[601px]:ml-[90px] min-[601px]:pb-0 min-[993px]:ml-[160px]">
        <section className="mx-auto w-[calc(100%-16px)] max-w-[960px] py-[20px] min-[426px]:w-[calc(100%-20px)] min-[426px]:py-[24px] min-[601px]:w-[calc(100%-24px)] min-[601px]:max-w-[760px] min-[601px]:py-[40px] min-[993px]:w-[calc(100%-32px)] min-[993px]:max-w-[960px] min-[993px]:py-[60px]">
          <div className="grid grid-cols-1 items-start gap-[28px] min-[993px]:grid-cols-[minmax(0,600px)_minmax(280px,340px)]">
            {/* Área com os cards das ações */}
            <div className="flex flex-col gap-[12px] min-[426px]:gap-[16px]">
              {acoesSustentaveis.map((acao) => (
                <article
                  key={acao.id}
                  className="overflow-hidden rounded-[8px] border border-[#b7d4ff] bg-white"
                >
                  <button
                    type="button"
                    onClick={() => abrirOuFecharCard(acao.id)}
                    className="flex min-h-[90px] w-full cursor-pointer items-start gap-[12px] p-[14px] text-left min-[601px]:min-h-[115px] min-[601px]:items-center min-[601px]:gap-[16px] min-[601px]:p-[22px]"
                    aria-expanded={acaoAberta === acao.id}
                  >
                    <div className="grid h-[42px] min-w-[42px] place-items-center rounded-full bg-[#eaf2ff] text-[20px] text-[#2454de] min-[601px]:h-[56px] min-[601px]:min-w-[56px] min-[601px]:text-[24px]">
                      {acao.icone}
                    </div>

                    <div className="flex-1">
                      <h2 className="mb-[8px] text-[14px] font-bold text-[#111] min-[601px]:text-[16px]">
                        {acao.titulo}
                      </h2>

                      <strong className="text-[15px] font-bold text-[#2454de]">
                        +{acao.pontos}pts
                      </strong>
                    </div>

                    <span
                      className={`text-[32px] leading-none text-black transition-transform min-[601px]:text-[40px] ${
                        acaoAberta === acao.id ? "rotate-90" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>

                  {acaoAberta === acao.id && (
                    <FormularioAcao
                      acao={acao}
                      nome={nome}
                      comentario={comentario}
                      arquivo={arquivo}
                      preview={preview}
                      erros={erros}
                      setNome={setNome}
                      setComentario={setComentario}
                      handleArquivo={handleArquivo}
                      handleDrop={handleDrop}
                      removerImagem={removerImagem}
                      handleSubmit={handleSubmit}
                    />
                  )}
                </article>
              ))}
            </div>

            {/* Painel lateral */}
            <aside className="flex flex-col gap-[24px] min-[601px]:grid min-[601px]:grid-cols-2 min-[993px]:flex">
              <section className="col-span-full flex items-center justify-between rounded-[8px] bg-[#bdd8fb] p-[18px] min-[601px]:p-[24px]">
                <div>
                  <span className="mb-[12px] block text-[12px] uppercase text-[#1f2937]">
                    MOVE POINTS
                  </span>

                  <strong className="text-[24px] font-bold text-[#111] min-[601px]:text-[28px]">
                    1.000 pts
                  </strong>
                </div>

                <span className="text-[14px] font-bold text-[#111]">
                  <span className="text-[#13b95e]">↑</span> 6º
                </span>
              </section>

              <section>
                <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
                  Ranking Top 5
                </h2>

                <ol className="flex flex-col gap-[10px]">
                  {ranking.slice(0, 5).map((pessoa) => (
                    <li
                      key={pessoa.posicao}
                      className="grid grid-cols-[24px_32px_1fr] items-center gap-[12px] rounded-[8px] bg-white p-[12px] min-[601px]:grid-cols-[28px_36px_1fr_auto]"
                    >
                      <span className="text-[14px] font-bold text-[#2454de]">
                        {pessoa.posicao}º
                      </span>

                      <span className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#eaf2ff] text-[10px] font-bold text-[#2454de] min-[601px]:h-[36px] min-[601px]:w-[36px]">
                        {pessoa.iniciais}
                      </span>

                      <div>
                        <strong className="block text-[14px] font-bold">
                          {pessoa.nome}
                        </strong>

                        <span className="block text-[12px] text-[#9b9b9b]">
                          {pessoa.cidade}
                        </span>
                      </div>

                      <strong className="col-start-3 text-[14px] font-bold text-[#2454de] min-[601px]:col-start-auto">
                        {pessoa.pontos}pts
                      </strong>
                    </li>
                  ))}
                </ol>

                <Link
                  to="/metricas"
                  className="mt-[14px] inline-flex text-[14px] font-semibold text-[#4d4d4d] hover:text-[#2454de]"
                >
                  Ver ranking completo →
                </Link>
              </section>

              <section className="flex flex-col">
                <h2 className="mb-[12px] text-[14px] font-medium uppercase text-[#444]">
                  Missões ativas
                </h2>

                {missoesValidacao.map((missao) => {
                  const progresso =
                    (missao.progresso / missao.total) * 100;

                  return (
                    <article
                      key={missao.id}
                      className="mb-[10px] rounded-[8px] bg-white px-[16px] py-[12px]"
                    >
                      <div className="mb-[10px] flex items-center justify-between gap-2">
                        <strong className="text-[14px] font-bold">
                          {missao.titulo}
                        </strong>

                        <span className="text-[14px] font-bold text-[#ff7a00]">
                          +{missao.pontos}
                        </span>
                      </div>

                      <div className="mb-[8px] h-[7px] w-full overflow-hidden rounded-full bg-[#dedede]">
                        <span
                          className="block h-full rounded-full bg-[#2454de]"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[12px] text-[#777]">
                        <span>
                          {missao.progresso}/{missao.total}
                        </span>

                        <span>
                          termina em {missao.diasRestantes} dias
                        </span>
                      </div>
                    </article>
                  );
                })}

                <Link
                  to="/metricas"
                  className="mt-[4px] inline-flex text-[14px] font-semibold text-[#4d4d4d] hover:text-[#2454de]"
                >
                  Ver mais missões →
                </Link>
              </section>
            </aside>
          </div>
        </section>
      </main>

      <ModalSucesso
        aberto={modalAberto}
        fecharModal={() => setModalAberto(false)}
      />
    </div>
  );
}

interface FormularioAcaoProps {
  acao: AcaoSustentavel;
  nome: string;
  comentario: string;
  arquivo: File | null;
  preview: string;
  erros: ErrosFormulario;
  setNome: (valor: string) => void;
  setComentario: (valor: string) => void;
  handleArquivo: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  removerImagem: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function FormularioAcao({
  acao,
  nome,
  comentario,
  arquivo,
  preview,
  erros,
  setNome,
  setComentario,
  handleArquivo,
  handleDrop,
  removerImagem,
  handleSubmit,
}: FormularioAcaoProps) {
  return (
    <div className="px-[14px] pb-[14px] min-[601px]:px-[22px] min-[601px]:pb-[22px]">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className="mb-[16px] rounded-[8px] border border-[#ddd] p-[16px]"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {!preview ? (
            <>
              <input
                type="file"
                id={`upload-${acao.id}`}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleArquivo}
              />

              <label
                htmlFor={`upload-${acao.id}`}
                className="flex min-h-[105px] cursor-pointer flex-col items-center justify-center gap-[8px] text-center text-[#777]"
              >
                <span className="grid h-[40px] w-[40px] place-items-center rounded-[8px] border border-[#d0d0d0] text-[18px] text-[#111]">
                  ⇧
                </span>

                <span className="text-[14px]">
                  <strong className="font-bold text-[#673bdc]">
                    Clique para subir
                  </strong>{" "}
                  ou arraste e solte
                </span>

                <span className="text-[12px]">
                  PNG ou JPG (máx. 800x400px)
                </span>
              </label>
            </>
          ) : (
            <div className="flex flex-col gap-[12px]">
              <img
                src={preview}
                alt="Prévia do comprovante enviado"
                className="max-h-[220px] w-full rounded-[8px] border border-[#ddd] bg-[#f7f7f7] object-contain"
              />

              <div className="flex flex-col items-start justify-between gap-[12px] min-[601px]:flex-row min-[601px]:items-center">
                <p className="break-all text-[13px] font-semibold text-[#2454de]">
                  Arquivo selecionado: {arquivo?.name}
                </p>

                <button
                  type="button"
                  onClick={removerImagem}
                  className="min-w-max cursor-pointer rounded-[6px] bg-[#f1f4ff] px-[12px] py-[8px] text-[13px] font-bold text-[#2454de]"
                >
                  Remover imagem
                </button>
              </div>
            </div>
          )}

          {erros.arquivo && (
            <small className="mt-[4px] block text-[12px] text-[#d93025]">
              {erros.arquivo}
            </small>
          )}
        </div>

        <article className="mb-[18px] flex gap-[12px] rounded-[8px] border border-[#d5d5d5] p-[14px]">
          <div className="grid h-[30px] min-w-[30px] place-items-center rounded-full border border-[#bdbdbd] font-bold text-[#555]">
            !
          </div>

          <div>
            <h3 className="mb-[4px] text-[15px] font-bold">
              Comprovações
            </h3>

            <p className="text-[14px] leading-[1.4] text-[#616161]">
              {acao.comprovacao}
            </p>
          </div>
        </article>

        <div className="mb-[16px]">
          <label
            htmlFor={`nome-${acao.id}`}
            className="mb-[8px] inline-flex items-center gap-[4px] text-[14px] font-medium text-[#333]"
          >
            Nome da atividade
            <span className="text-[#673bdc]">*</span>
          </label>

          <input
            type="text"
            id={`nome-${acao.id}`}
            value={nome}
            onChange={(event) => {
              setNome(event.target.value);
            }}
            placeholder={acao.exemplo}
            className={`h-[40px] w-full rounded-[7px] border px-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${
              erros.nome ? "border-[#d93025]" : "border-[#ccc]"
            }`}
          />

          <small className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
            {erros.nome}
          </small>
        </div>

        <div className="mb-[16px]">
          <label
            htmlFor={`comentario-${acao.id}`}
            className="mb-[8px] inline-flex items-center gap-[4px] text-[14px] font-medium text-[#333]"
          >
            Comentário sobre a atividade
            <span className="text-[#673bdc]">*</span>

            <span
              className="grid h-[16px] w-[16px] place-items-center rounded-full border border-[#a9a9a9] text-[10px] text-[#777]"
              title="Descreva como a atividade foi realizada."
            >
              ?
            </span>
          </label>

          <textarea
            id={`comentario-${acao.id}`}
            value={comentario}
            onChange={(event) => {
              setComentario(event.target.value);
            }}
            placeholder="Insira uma descrição"
            className={`min-h-[140px] w-full resize-y rounded-[7px] border p-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${
              erros.comentario
                ? "border-[#d93025]"
                : "border-[#ccc]"
            }`}
          />

          <small className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
            {erros.comentario}
          </small>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-[7px] bg-[#2454de] p-[14px] text-[15px] font-bold text-white transition hover:-translate-y-[1px] hover:bg-[#1d43b4]"
        >
          Enviar para avaliação
        </button>
      </form>
    </div>
  );
}