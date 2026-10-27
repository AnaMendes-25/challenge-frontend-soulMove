import { api } from "./api";
import type {
  AtividadeBackend,
  RegistrarAtividadeRequest,
  TipoAtividade,
  UsuarioAtividadeResponse,
} from "./atividadesTypes";

export const atividadesService = {
  /**
   * Lista todas as atividades do catálogo (ou filtradas por tipo se informado).
   * Rota: GET /atividades ou /atividades?tipo=TIPO
   * 
   * NOTA:
   * - A API não garante uma ordem específica de retorno; ordene no front-end se necessário.
   * - O catálogo é global e não traz dados específicos do utilizador (ex.: se já atingiu o limite hoje).
   */
  async listarAtividades(tipo?: TipoAtividade): Promise<AtividadeBackend[]> {
    const query = tipo ? `?tipo=${tipo}` : "";
    const { data } = await api.get(`/atividades${query}`);
    return (data as AtividadeBackend[]) || [];
  },

  /**
   * Lista os 5 tipos válidos de enum de atividade aceitos pelo servidor.
   * Rota: GET /atividades/tipos
   * 
   * NOTA: Utilize esta rota para montar abas/filtros na interface de forma dinâmica.
   */
  async listarTipos(): Promise<TipoAtividade[]> {
    const { data } = await api.get("/atividades/tipos");
    return (data as TipoAtividade[]) || [];
  },

  /**
   * Obtém os detalhes de uma atividade específica pelo ID.
   * Rota: GET /atividades/{id}
   */
  async buscarPorId(id: number): Promise<AtividadeBackend> {
    const { data } = await api.get(`/atividades/${id}`);
    return data as AtividadeBackend;
  },

  /**
   * Registra a realização de uma atividade para o utilizador e credita os pontos.
   * Rota: POST /atividades/registrar
   * 
   * ATENÇÃO PARA A INTEGRAÇÃO E REGRAS DE NEGÓCIO:
   * 1. Botão Duplo: DESABILITE o botão "Concluir atividade" durante a chamada HTTP!
   *    Cada clique válido processado gera um registro e pontua novamente.
   * 2. Limite Diário: Cada utilizador pode registrar a mesma atividade até 99 vezes por dia
   *    (no fuso horário de Brasília). Ultrapassado o limite, a API responde HTTP 409 com mensagem pronta.
   * 3. Atualização de Pontos: A resposta NÃO traz os novos saldos. Logo após esta chamada,
   *    invoque `usuariosService.buscarPorId(usuarioId)` para atualizar os pontos na ecrã/UI.
   */
  async registrarAtividade(payload: RegistrarAtividadeRequest): Promise<UsuarioAtividadeResponse> {
    const { data } = await api.post("/atividades/registrar", payload);
    return data as UsuarioAtividadeResponse;
  },

  /**
   * Obtém o histórico de atividades realizadas pelo utilizador.
   * Rota: GET /atividades/historico/{usuarioId}
   * 
   * NOTA:
   * - Retorna os registros ordenados do mais recente para o mais antigo.
   * - A propriedade `dataAtividade` vem no formato "yyyy-MM-dd" (sem horário).
   */
  async obterHistorico(usuarioId: number): Promise<UsuarioAtividadeResponse[]> {
    const { data } = await api.get(`/atividades/historico/${usuarioId}`);
    return (data as UsuarioAtividadeResponse[]) || [];
  },

  /*
   * ROTA ADMINISTRATIVA - NÃO CHAMAR NO APP DO UTILIZADOR FINAL:
   * - POST /atividades (Cria nova atividade no catálogo com qualquer pontuação).
   * 
   * O catálogo de atividades é fixo e gerido pelo backend.
   */
};