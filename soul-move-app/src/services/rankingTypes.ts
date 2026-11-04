/**
 * Objeto que representa uma linha na tabela de classificações.
 * Utilizado nas rotas: GET /ranking, GET /ranking/{usuarioId}
 */
export interface RankingItem {
  id: number;              // ID único da linha do ranking (NÃO é o ID do utilizador!)
  posicao: number;         // Colocação do utilizador (ex: 1, 2, 2, 4 em caso de empate)
  pontuacaoTotal: number;  // Pontuação vitalícia (`pontuacaoUsuario`) usada na classificação
  usuarioId: number;       // ID do utilizador dono desta posição no ranking
  nomeUsuario: string;     // Nome do utilizador exibido na tabela
  fotoUsuario: string;     // Foto do utilizador exibido na tabela
}