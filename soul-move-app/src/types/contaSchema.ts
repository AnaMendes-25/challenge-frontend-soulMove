import { z } from 'zod';

export const contaSchema = z
  .object({
    nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().optional(),
    confirmarSenha: z.string().optional(),
  })
  .refine(
    (data) => {
      // Se preencheu nova senha, exige que a confirmação seja idêntica
      if (data.senha && data.senha.trim().length > 0) {
        return data.senha === data.confirmarSenha;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmarSenha'],
    }
  )
  .refine(
    (data) => {
      // Se preencheu nova senha, exige que tenha pelo menos 8 caracteres
      if (data.senha && data.senha.trim().length > 0) {
        return data.senha.length >= 8;
      }
      return true;
    },
    {
      message: 'A nova senha deve ter no mínimo 8 caracteres',
      path: ['senha'],
    }
  );

export type ContaFormData = z.infer<typeof contaSchema>;