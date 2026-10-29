import { api, exigirArray, exigirObjeto } from "./api";
import type { RankingItem } from "./rankingTypes";

export const rankingService = {
  /**
   * Obtém o ranking geral dos utilizadores ordenado da maior para a menor pontuação.
   * Rota: GET /ranking ou /ranking?limite=N
   * 
   * ATENÇÃO PARA A INTEGRAÇÃO E REGRAS DE NEGÓCIO:
   * 1. Limite de Registos: Se informado `limite` (ex: 10), retorna apenas os N primeiros colocados.
   *    Se omitido ou menor/igual a 0, retorna o ranking completo.
   * 2. Empates: Empates repetem o número da posição (ex: 1º, 2º, 2º, 4º).
   *    Exiba sempre a propriedade `posicao` do objeto na ecrã, e não o índice do array (`index`).
   * 3. ID do Utilizador Logado: Para identificar qual linha pertence ao utilizador logado,
   *    compare `item.usuarioId === usuarioIdGuardado`, e NÃO o `item.id`.
   * 4. Privacidade: Esta rota não expõe o e-mail nem a foto dos utilizadores, sendo a rota oficial
   *    para o placar do aplicativo (evite chamar `GET /usuarios/top10`).
   */
  async obterRankingGeral(limite?: number): Promise<RankingItem[]> {
    const query = limite && limite > 0 ? `?limite=${limite}` : "";
    const { data } = await api.get(`/ranking${query}`);
    return exigirArray<RankingItem>(data, "ranking");
  },

  /**
   * Obtém a posição e pontuação atual de um utilizador específico no ranking.
   * Rota: GET /ranking/{usuarioId}
   * 
   * NOTA:
   * - Utilize para alimentar o card de destaque "Sua Posição" na Home.
   * - O parâmetro deve ser o `usuarioId` (o ID retornado no cadastro/login), e não o ID da linha do ranking.
   */
  async obterPosicaoUsuario(usuarioId: number): Promise<RankingItem> {
    const { data } = await api.get(`/ranking/${usuarioId}`);
    return exigirObjeto<RankingItem>(data, "posição no ranking");
  },
};