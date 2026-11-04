/**
 * Item do catálogo de recompensas.
 * Utilizado nas rotas: GET /recompensas, GET /recompensas/{id}
 */
export interface Recompensa {
  id: number;
  descricao: string;
  valor: number; // Custo em pontos Soul (sempre > 0)
}

/**
 * Payload enviado para resgatar uma recompensa.
 * Rota: POST /recompensas/resgatar
 */
export interface ResgatarRecompensaRequest {
  usuarioId: number;
  recompensaId: number;
}

/**
 * Resposta retornada ao resgatar uma recompensa ou consultar o histórico.
 * Utilizado nas rotas: POST /recompensas/resgatar, GET /recompensas/historico/{usuarioId}
 */
export interface UsuarioRecompensaResponse {
  id: number; // ID do resgate
  dataRecebimento: string; // Formato "yyyy-MM-dd"
  nomeUsuario: string;
  descricaoRecompensa: string;
  valor: number; // Preço atual da recompensa no catálogo
}

/**
 * Interface auxiliar para exibição em ecrã (calculada no front-end).
 */
export interface RecompensaComStatus extends Recompensa {
  resgatavel: boolean; // true se o utilizador possui saldo de pontosSoul suficiente
  faltam: number;      // Quantidade de pontos que faltam para conseguir resgatar
}