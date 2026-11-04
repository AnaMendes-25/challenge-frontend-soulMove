import { api, exigirArray, exigirObjeto } from "./api";
import type {
  Recompensa,
  RecompensaComStatus,
  ResgatarRecompensaRequest,
  UsuarioRecompensaResponse,
} from "./recompensasTypes";

export const recompensasService = {
  /**
   * Lista todas as recompensas do catálogo ordenadas da mais barata para a mais cara.
   * Rota: GET /recompensas
   */
  async listarRecompensas(): Promise<Recompensa[]> {
    const { data } = await api.get("/recompensas");
    return exigirArray<Recompensa>(data, "recompensas");
  },

  /**
   * Obtém os detalhes de uma recompensa específica pelo ID.
   * Rota: GET /recompensas/{id}
   */
  async buscarPorId(id: number): Promise<Recompensa> {
    const { data } = await api.get(`/recompensas/${id}`);
    return exigirObjeto<Recompensa>(data, "recompensa");
  },

  /**
   * Realiza o resgate de uma recompensa utilizando o saldo de `pontuacaoSoul`.
   * Rota: POST /recompensas/resgatar
   * 
   * ATENÇÃO PARA A INTEGRAÇÃO E REGRAS DE NEGÓCIO:
   * 1. Botão Duplo: DESABILITE o botão "Resgatar" durante a chamada HTTP!
   * 2. Saldo Insuficiente: Se `pontuacaoSoul < valor`, a API retorna HTTP 409
   *    com mensagem de erro detalhada pronta para ser exibida na interface.
   * 3. Saldo Vitalício: O resgate debita APENAS os `pontuacaoSoul` (a carteira).
   *    A `pontuacaoUsuario` (pontuação vitalícia do ranking) PERMANECE INTACTA.
   * 4. Atualização de Saldo: A resposta NÃO traz o saldo atualizado.
   *    Chame `usuariosService.buscarPorId(usuarioId)` após o resgate com sucesso.
   */
  async resgatar(payload: ResgatarRecompensaRequest): Promise<UsuarioRecompensaResponse> {
    const { data } = await api.post("/recompensas/resgatar", payload);
    return exigirObjeto<UsuarioRecompensaResponse>(data, "resgate de recompensa");
  },

  /**
   * Obtém o histórico de resgates efetuados pelo utilizador.
   * Rota: GET /recompensas/historico/{usuarioId}
   * 
   * NOTA:
   * - O campo `valor` retornado no histórico exibe o preço ATUAL da recompensa no catálogo,
   *   não necessariamente o valor pago na data do resgate.
   */
  async obterHistorico(usuarioId: number): Promise<UsuarioRecompensaResponse[]> {
    const { data } = await api.get(`/recompensas/historico/${usuarioId}`);
    return exigirArray<UsuarioRecompensaResponse>(data, "histórico de resgates");
  },

  /**
   * Helper utilitário para calcular na interface quais recompensas o utilizador pode resgatar
   * com base no seu saldo atual de `pontuacaoSoul`.
   */
  calcularStatusResgate(recompensa: Recompensa, pontuacaoSoulUsuario: number): RecompensaComStatus {
    const resgatavel = pontuacaoSoulUsuario >= recompensa.valor;
    const faltam = Math.max(0, recompensa.valor - pontuacaoSoulUsuario);

    return {
      ...recompensa,
      resgatavel,
      faltam,
    };
  },
};