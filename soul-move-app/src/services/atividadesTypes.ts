/**
 * Enum com os 5 tipos fixos de atividade aceitos pelo backend.
 * O valor enviado à API é sensível a maiúsculas/minúsculas.
 */
export type TipoAtividade =
  | "RECICLAGEM"
  | "TRANSPORTE_PUBLICO"
  | "TRAJETO_CAMINHADA"
  | "TRAJETO_BIKE"
  | "REDUCAO_ENERGIA";

/**
 * Interface da Atividade (item do catálogo retornado pelo Spring Boot).
 * Utilizada nas rotas: GET /atividades, GET /atividades/{id}
 */
export interface EntidadeIdentificavel { id: number; }

export interface DadosAtividadeCatalogo {
  nome: string;
  descricao: string;
  validacao: string;
  pontuacao: number;
  tipoAtividade: TipoAtividade;
}

export type AtividadeBackend = EntidadeIdentificavel & DadosAtividadeCatalogo;

/**
 * Payload enviado para registrar uma atividade realizada.
 * Utilizado na rota: POST /atividades/registrar
 */
export interface RegistrarAtividadeRequest {
  usuarioId: number;
  atividadeId: number;
}


/**
 * Resposta retornada ao registrar uma atividade ou ao listar o histórico.
 * Utilizada nas rotas: POST /atividades/registrar, GET /atividades/historico/{usuarioId}
 */
export interface UsuarioAtividadeResponse {
  id: number; // ID do registro no banco
  dataAtividade: string; // Formato "yyyy-MM-dd" (horário de Brasília)
  pontosRecebida: number; // Pontos creditados no momento do registro
  nomeUsuario: string;
  nomeAtividade: string;
}