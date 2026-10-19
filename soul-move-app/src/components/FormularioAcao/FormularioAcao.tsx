import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acaoSchema, type FormularioValidacao } from "../../types/acaoSchema";
import type { AcaoSustentavel } from "../../types/ValidacaoTypes";

import {
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

interface FormularioAcaoProps {
  acao: AcaoSustentavel;
  aoEnviar: () => void;
}

export default function FormularioAcao({
  acao,
  aoEnviar,
}: FormularioAcaoProps) {
  const [preview, setPreview] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(false);
  const [erroIA, setErroIA] = useState("");

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

  function processarArquivo(arquivoSelecionado?: File) {
    if (!arquivoSelecionado) return;

    const formatosPermitidos = ["image/png", "image/jpeg"];

    if (!formatosPermitidos.includes(arquivoSelecionado.type)) {
      setValue("arquivo", null, { shouldValidate: true });
      setError("arquivo", {
        type: "validate",
        message: "Por favor, envie uma imagem PNG ou JPG.",
      });
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

  // Função auxiliar para converter o ficheiro em Base64 para a Moondream
  const converterParaBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // função de apoio para gerar perguntas personalizadas com campo selecionado
  function gerarPergunta(tipoAcaoId: string): string {
    switch (tipoAcaoId) {
      case "reciclagem":
        return "Esta imagem mostra claramente materiais recicláveis separados, lixeiras de coleta seletiva ou o processo ativo de reciclagem? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";

      case "energia":
        return "Esta imagem evidencia uma medida clara de economia de energia, como luzes apagadas aproveitando luz natural, painéis solares ou um medidor/aparelho focado em eficiência energética? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";

      case "transporte":
        return "Esta imagem comprova o uso ou presença em transporte público (como o interior de um ônibus, trem, metrô, bilhete de passagem válido ou estação de embarque)? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";

      case "bike":
        return "Esta imagem mostra uma bicicleta em uso, estacionada em contexto de trajeto ou um ciclista em deslocamento urbano? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";

      case "pe":
        return "Esta imagem comprova um deslocamento a pé (como calçados em movimento em calçada urbana, trilha ou caminhada utilitária)? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";

      default:
        return "Esta imagem comprova de forma inquestionável uma ação sustentável válida? Responda obrigatoriamente com 'Sim' ou 'Não' no início, seguido de uma breve justificativa.";
    }
  }

  // Função executada APÓS o Zod aprovar os campos do formulário
  async function enviarFormulario(dados: FormularioValidacao) {

    if (!dados.arquivo) return;

    try {
      setCarregandoIA(true);
      setErroIA("");

      // Converter a imagem para base64
      const imagemBase64 = await converterParaBase64(dados.arquivo);

      //Chamar a API da Moondream para validar a imagem
      const respostaIA = await fetch("https://api.moondream.ai/v1/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Moondream-Auth": import.meta.env.VITE_MOONDREAM_API_KEY || "",
        },
        body: JSON.stringify({
          model: "moondream3.1-9B-A2B",
          image_url: imagemBase64,
          question: gerarPergunta(acao.id),
        }),
      });

      if (!respostaIA.ok) throw new Error("Erro ao comunicar com o serviço de IA.");

      const resultadoIA = await respostaIA.json();
      console.log("Resposta completa da IA:", resultadoIA); // Vê o que aparece aqui na consola (F12)

      // Usa o encadeamento opcional para evitar crashes caso 'answer' venha indefinido
      const respostaTexto = resultadoIA?.answer || "";
      const textoResposta = respostaTexto.trim().toLowerCase();

      if (!textoResposta.includes("sim")) {
        setErroIA(`A IA rejeitou a imagem: ${resultadoIA?.answer || "Resposta inválida da IA"}`);
        setCarregandoIA(false);
        return;
      }

      //Se passou pela IA, prosseguimos para o envio normal (chama a API Java através do pai)
      aoEnviar();

      reset();
      setPreview("");
      setNomeArquivo("");
    } catch (erro) {
      console.error("Erro no processamento:", erro);
      setErroIA("Ocorreu um erro técnico ao validar a imagem com a IA.");
    } finally {
      setCarregandoIA(false);
    }
  }

  return (
    <div className="px-[14px] pb-[14px] min-[601px]:px-[22px] min-[601px]:pb-[22px]">
      <form onSubmit={handleSubmit(enviarFormulario)} noValidate>
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
            <small className="mt-[4px] block text-[12px] text-[#d93025]" role="alert">
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
            className={`h-[40px] w-full rounded-[7px] border px-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${errors.nome ? "border-[#d93025]" : "border-[#ccc]"
              }`}
          />
          <small className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
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
            className={`min-h-[140px] w-full resize-y rounded-[7px] border p-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${errors.comentario ? "border-[#d93025]" : "border-[#ccc]"
              }`}
          />
          <small className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]">
            {errors.comentario?.message}
          </small>
        </div>

        {/* Erro customizado da IA, caso ocorra */}
        {erroIA && (
          <div className="mb-[16px] rounded-[7px] bg-red-50 p-[12px] text-[13px] text-[#d93025]">
            {erroIA}
          </div>
        )}

        <button
          type="submit"
          disabled={carregandoIA}
          className="w-full cursor-pointer rounded-[7px] bg-[#2454de] p-[14px] text-[15px] font-bold text-white transition hover:-translate-y-[1px] hover:bg-[#1d43b4] disabled:bg-gray-400"
        >
          {carregandoIA ? "A analisar imagem com a IA..." : "Enviar para avaliação"}
        </button>
      </form>
    </div>
  );
}