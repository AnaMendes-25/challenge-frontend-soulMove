import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { acaoSchema, type FormularioValidacao } from "../../types/acaoSchema";
import type { AcaoSustentavel, AtividadeBackend } from "../../types/ValidacaoTypes";
import { validarImagemSustentavel } from "../../services/moondreamService";


export interface DadosEnvioAcao {
  nome: string;
  comentario: string;
  arquivo: File;
}

interface FormularioAcaoProps {
  acao: AcaoSustentavel;
  atividade: AtividadeBackend;
  aoEnviar: (dados: DadosEnvioAcao) => Promise<void>;
}

const LARGURA_MAXIMA = 3840;
const ALTURA_MAXIMA = 3840;

// Lê a imagem e confere se cabe no limite de dimensões; imagem ilegível é recusada.
async function dimensoesPermitidas(arquivo: File): Promise<boolean> {
  try {
    const imagem = await createImageBitmap(arquivo);
    const permitida = imagem.width <= LARGURA_MAXIMA && imagem.height <= ALTURA_MAXIMA;
    imagem.close();
    return permitida;
  } catch {
    return false;
  }
}

export default function FormularioAcao({
  acao,
  atividade,
  aoEnviar,
}: FormularioAcaoProps) {
  const [preview, setPreview] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroIA, setErroIA] = useState("");
  // Trava síncrona: o estado do React só atualiza depois, e um clique duplo passaria.
  const envioEmAndamento = useRef(false);

  // O useForm agora usa o Zod através do zodResolver
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormularioValidacao>({
    resolver: zodResolver(acaoSchema),
    defaultValues: {
      nome: "",
      comentario: "",
      arquivo: null,
    },
    mode: "onTouched",
  });

  async function processarArquivo(arquivoSelecionado?: File) {
    if (!arquivoSelecionado) return;

    const formatosPermitidos = ["image/png", "image/jpeg"];

    if (!formatosPermitidos.includes(arquivoSelecionado.type)) {
      setValue("arquivo", null, { shouldValidate: true });
      setError("arquivo", { type: "validate", message: "Por favor, envie uma imagem PNG ou JPG." });
      setPreview("");
      setNomeArquivo("");
      return;
    }

    if (!(await dimensoesPermitidas(arquivoSelecionado))) {
      setValue("arquivo", null, { shouldValidate: true });
      setError("arquivo", { type: "validate", message: `A imagem deve ter no máximo ${LARGURA_MAXIMA}x${ALTURA_MAXIMA}px.` });
      setPreview("");
      setNomeArquivo("");
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      setPreview(String(leitor.result));
      setNomeArquivo(arquivoSelecionado.name);
    };
    leitor.readAsDataURL(arquivoSelecionado);

    setValue("arquivo", arquivoSelecionado, { shouldValidate: true });
    clearErrors("arquivo");
  }

  function handleArquivo(event: ChangeEvent<HTMLInputElement>) {
    processarArquivo(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    processarArquivo(event.dataTransfer.files?.[0]);
  }

  function removerImagem() {
    setValue("arquivo", null, { shouldValidate: true });
    setPreview("");
    setNomeArquivo("");
  }

 

  // Função executada APÓS o Zod aprovar os campos do formulário
 async function enviarFormulario(dados: FormularioValidacao) {
    if (!dados.arquivo) return;

    if (!atividade) {
    setErroIA("Erro interno: Dados da atividade não encontrados.");
    return;
  }

    if (envioEmAndamento.current) return;
    envioEmAndamento.current = true;

    try {
      setCarregandoIA(true);
      setErroIA("");

      const resultadoIA = await validarImagemSustentavel(dados.arquivo, atividade);
      if (!resultadoIA.aprovada) {
        setErroIA(`A IA rejeitou a imagem: ${resultadoIA.mensagem}`);
        return;
      }
      setEnviando(true);

      await aoEnviar({
        nome: dados.nome,
        comentario: dados.comentario,
        arquivo: dados.arquivo,
      });
      reset();
      removerImagem();
      
    } catch (erro: unknown) {
      console.error("Erro no processamento:", erro);
      setErroIA(erro instanceof Error ? erro.message : "Ocorreu um erro técnico ao validar a imagem com a IA.");
    } finally {
      envioEmAndamento.current = false;
      setCarregandoIA(false);
      setEnviando(false);
    }
  }

  return (
    <div className="px-[14px] pb-[14px] min-[601px]:px-[22px] min-[601px]:pb-[22px]">
      <form onSubmit={(e) => void handleSubmit(enviarFormulario)(e)} noValidate>
        {/* Upload obrigatório */}
        <div
          className={`mb-[16px] rounded-[8px] border p-[16px] ${errors.arquivo ? "border-[#d93025]" : "border-[#ddd]"
            }`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {!preview ? (
            <>
              <input
                {...register("arquivo")}
                type="file"
                id={`upload-${acao.id}`}
                className="hidden"
                accept="image/png, image/jpeg"
                aria-invalid={!!errors.arquivo}
                aria-describedby={errors.arquivo ? `arquivo-erro-${acao.id}` : undefined}
                onChange={(event) => {
                  handleArquivo(event);
                }}
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
                  Arquivo selecionado: {nomeArquivo}
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

          {errors.arquivo && (
            <small id={`arquivo-erro-${acao.id}`} className="mt-[4px] block text-[12px] text-[#d93025]" role="alert">
              {errors.arquivo.message}
            </small>
          )}
        </div>

        {/* Explicação dos comprovantes */}
        <article className="mb-[18px] flex gap-[12px] rounded-[8px] border border-[#d5d5d5] p-[14px]">
          <div className="grid h-[30px] min-w-[30px] place-items-center rounded-full border border-[#bdbdbd] font-bold text-[#555]">
            !
          </div>
          <div>
            <h3 className="mb-[4px] text-[15px] font-bold">Comprovações</h3>
            <p className="text-[14px] leading-[1.4] text-[#616161]">
              {acao.comprovacao}
            </p>
          </div>
        </article>

        {/* Nome da atividade (Regras tratadas pelo Zod) */}
        <div className="mb-[16px]">
          <label
            htmlFor={`nome-${acao.id}`}
            className="mb-[8px] inline-flex items-center gap-[4px] text-[14px] font-medium text-[#333]"
          >
            Nome da atividade
            <span className="text-[#673bdc]">*</span>
          </label>
          <input
            {...register("nome")}
            type="text"
            id={`nome-${acao.id}`}
            placeholder={acao.exemplo}
            maxLength={100}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? `nome-erro-${acao.id}` : undefined}
            className={`h-[40px] w-full rounded-[7px] border px-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${errors.nome ? "border-[#d93025]" : "border-[#ccc]"
              }`}
          />
          <small id={`nome-erro-${acao.id}`} className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
            {errors.nome?.message}
          </small>
        </div>

        {/* Comentário (Regras tratadas pelo Zod) */}
        <div className="mb-[16px]">
          <label
            htmlFor={`comentario-${acao.id}`}
            className="mb-[8px] inline-flex items-center gap-[4px] text-[14px] font-medium text-[#333]"
          >
            Comentário sobre a atividade
            <span className="text-[#673bdc]">*</span>
          </label>
          <textarea
            {...register("comentario")}
            id={`comentario-${acao.id}`}
            placeholder="Insira uma descrição"
            maxLength={500}
            aria-invalid={!!errors.comentario}
            aria-describedby={errors.comentario ? `comentario-erro-${acao.id}` : undefined}
            className={`min-h-[140px] w-full resize-y rounded-[7px] border p-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${errors.comentario ? "border-[#d93025]" : "border-[#ccc]"
              }`}
          />
          <small id={`comentario-erro-${acao.id}`} className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
            {errors.comentario?.message}
          </small>
        </div>

        {/* Erro customizado da IA, caso ocorra */}
        {erroIA && (
          <div role="alert" className="mb-[16px] rounded-[7px] bg-red-50 p-[12px] text-[13px] text-[#d93025]">
            {erroIA}
          </div>
        )}

        <button
          type="submit"
          disabled={carregandoIA || enviando}
          className="w-full cursor-pointer rounded-[7px] bg-[#2454de] p-[14px] text-[15px] font-bold text-white transition hover:-translate-y-[1px] hover:bg-[#1d43b4] disabled:bg-gray-400"
        >
          {enviando ? "Enviando..." : carregandoIA ? "Imagem sendo Avaliada..." : "Enviar para avaliação"}
        </button>
      </form>
    </div>
  );
}