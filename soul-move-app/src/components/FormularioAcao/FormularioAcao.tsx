import {
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useForm } from "react-hook-form";

import type { AcaoSustentavel } from "../../types/ValidacaoDataTypes";

interface FormularioValidacao {
  nome: string;
  comentario: string;
  arquivo: File | null;
}

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

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormularioValidacao>({
    defaultValues: {
      nome: "",
      comentario: "",
      arquivo: null,
    },
    mode: "onTouched",
  });

  // Registra o campo de arquivo no React Hook Form.
  const registroArquivo = register("arquivo", {
    validate: (arquivo) =>
      arquivo instanceof File ||
      "Envie uma imagem como comprovante.",
  });

  function processarArquivo(arquivoSelecionado?: File) {
    if (!arquivoSelecionado) {
      return;
    }

    const formatosPermitidos = ["image/png", "image/jpeg"];

    if (!formatosPermitidos.includes(arquivoSelecionado.type)) {
      setValue("arquivo", null);

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

    setValue("arquivo", arquivoSelecionado, {
      shouldValidate: true,
    });

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
    setValue("arquivo", null, {
      shouldValidate: true,
    });

    setPreview("");
    setNomeArquivo("");
  }

  function enviarFormulario() {
    aoEnviar();

    reset({
      nome: "",
      comentario: "",
      arquivo: null,
    });

    setPreview("");
    setNomeArquivo("");
  }

  return (
    <div className="px-[14px] pb-[14px] min-[601px]:px-[22px] min-[601px]:pb-[22px]">
      <form
        onSubmit={handleSubmit(enviarFormulario)}
        noValidate
      >
        {/* Upload obrigatório */}
        <div
          className={`mb-[16px] rounded-[8px] border p-[16px] ${
            errors.arquivo
              ? "border-[#d93025]"
              : "border-[#ddd]"
          }`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {!preview ? (
            <>
              <input
                {...registroArquivo}
                type="file"
                id={`upload-${acao.id}`}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                  registroArquivo.onChange(event);
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
            <small
              className="mt-[4px] block text-[12px] text-[#d93025]"
              role="alert"
            >
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
            <h3 className="mb-[4px] text-[15px] font-bold">
              Comprovações
            </h3>

            <p className="text-[14px] leading-[1.4] text-[#616161]">
              {acao.comprovacao}
            </p>
          </div>
        </article>

        {/* Nome da atividade */}
        <div className="mb-[16px]">
          <label
            htmlFor={`nome-${acao.id}`}
            className="mb-[8px] inline-flex items-center gap-[4px] text-[14px] font-medium text-[#333]"
          >
            Nome da atividade
            <span className="text-[#673bdc]">*</span>
          </label>

          <input
            {...register("nome", {
              required: "Digite o nome da atividade.",
              validate: (valor) =>
                valor.trim().length >= 3 ||
                "O nome deve ter pelo menos 3 caracteres.",
              maxLength: {
                value: 100,
                message: "O nome deve ter no máximo 100 caracteres.",
              },
            })}
            type="text"
            id={`nome-${acao.id}`}
            placeholder={acao.exemplo}
            maxLength={100}
            className={`h-[40px] w-full rounded-[7px] border px-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${
              errors.nome
                ? "border-[#d93025]"
                : "border-[#ccc]"
            }`}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={
              errors.nome ? `erro-nome-${acao.id}` : undefined
            }
          />

          <small
            id={`erro-nome-${acao.id}`}
            className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]"
            role={errors.nome ? "alert" : undefined}
          >
            {errors.nome?.message}
          </small>
        </div>

        {/* Comentário */}
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
            {...register("comentario", {
              required:
                "Insira um comentário sobre a atividade.",
              validate: (valor) =>
                valor.trim().length >= 10 ||
                "O comentário deve ter pelo menos 10 caracteres.",
              maxLength: {
                value: 500,
                message:
                  "O comentário deve ter no máximo 500 caracteres.",
              },
            })}
            id={`comentario-${acao.id}`}
            placeholder="Insira uma descrição"
            maxLength={500}
            className={`min-h-[140px] w-full resize-y rounded-[7px] border p-[12px] text-[14px] text-[#333] outline-none transition focus:border-[#2454de] focus:ring-[3px] focus:ring-[#2454de]/10 ${
              errors.comentario
                ? "border-[#d93025]"
                : "border-[#ccc]"
            }`}
            aria-invalid={Boolean(errors.comentario)}
            aria-describedby={
              errors.comentario
                ? `erro-comentario-${acao.id}`
                : undefined
            }
          />

          <small
            id={`erro-comentario-${acao.id}`}
            className="mt-[4px] block min-h-[16px] text-[12px] text-[#d93025]"
            role={errors.comentario ? "alert" : undefined}
          >
            {errors.comentario?.message}
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