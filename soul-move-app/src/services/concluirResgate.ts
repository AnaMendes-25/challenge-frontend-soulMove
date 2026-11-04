import type { UsuarioRecompensaResponse } from "./recompensasTypes";

export interface ResgateConcluido {
  resgate: UsuarioRecompensaResponse;
  saldo: number | null;
}

// Depois de uma escrita bem-sucedida, falhar ao consultar o saldo não desfaz o resgate.
export async function concluirResgate(
  enviar: () => Promise<UsuarioRecompensaResponse>,
  consultarSaldo: () => Promise<number>,
): Promise<ResgateConcluido> {
  const resgate = await enviar();
  try {
    const saldo = await consultarSaldo();
    if (!Number.isFinite(saldo) || saldo < 0) {
      return { resgate, saldo: null };
    }
    return { resgate, saldo };
  } catch {
    return { resgate, saldo: null };
  }
}
