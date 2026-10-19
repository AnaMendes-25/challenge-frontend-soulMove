import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const acaoSchema = z.object({
  nome: z
    .string()
    .min(1, "Digite o nome da atividade.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  comentario: z
    .string()
    .min(1, "Insira um comentário sobre a atividade.")
    .min(10, "O comentário deve ter pelo menos 10 caracteres.")
    .max(500, "O comentário deve ter no máximo 500 caracteres."),
  arquivo: z
    .custom<File>((val) => val instanceof File, {
      message: "Envie uma imagem como comprovante.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Por favor, envie uma imagem PNG ou JPG.",
    }),
});

export type FormularioValidacao = z.infer<typeof acaoSchema>;