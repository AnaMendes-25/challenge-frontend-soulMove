import { api, exigirArray, exigirObjeto } from "./api";
import type { RequestOptions } from "./api";
import type { AtividadeBackend, EnviarComprovanteRequest, RegistrarAtividadeRequest, TipoAtividade, UsuarioAtividadeResponse } from "./atividadesTypes";

const registrosEmAndamento = new Map<string, Promise<UsuarioAtividadeResponse>>();
const ultimoRegistro = new Map<string, number>();
const JANELA_ANTI_DUPLICACAO_MS = 2000;

export const atividadesService = {
  /**
   * Lista todas as atividades do catálogo (ou filtradas por tipo se informado).
   * Rota: GET /atividades ou /atividades?tipo=TIPO
   * 
   * NOTA:
   * - A API não garante uma ordem específica de retorno; ordene no front-end se necessário.
   * - O catálogo é global e não traz dados específicos do utilizador (ex.: se já atingiu o limite hoje).
   */
  async listarAtividades(tipo?: TipoAtividade, options?: RequestOptions): Promise<AtividadeBackend[]> {
    const query = tipo ? `?tipo=${tipo}` : "";
    const { data } = await api.get(`/atividades${query}`, options);
    return exigirArray<AtividadeBackend>(data, "atividades");
  },

  /**
   * Lista os 5 tipos válidos de enum de atividade aceitos pelo servidor.
   * Rota: GET /atividades/tipos
   * 
   * NOTA: Utilize esta rota para montar abas/filtros na interface de forma dinâmica.
   */
  async listarTipos(): Promise<TipoAtividade[]> {
    const { data } = await api.get("/atividades/tipos");
    return exigirArray<TipoAtividade>(data, "tipos de atividade");
  },

  /**
   * Obtém os detalhes de uma atividade específica pelo ID.
   * Rota: GET /atividades/{id}
   */
  async buscarPorId(id: number): Promise<AtividadeBackend> {
    const { data } = await api.get(`/atividades/${id}`);
    return exigirObjeto<AtividadeBackend>(data, "atividade");
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
     const chave = `${payload.usuarioId}:${payload.atividadeId}`;
     const agora = Date.now();
     const registradoEm = ultimoRegistro.get(chave);

     if (registradoEm !== undefined && agora - registradoEm < JANELA_ANTI_DUPLICACAO_MS) {
       throw new Error("Este envio já foi processado. Aguarde antes de enviar novamente.");
     }

     const registroExistente = registrosEmAndamento.get(chave);

     if (registroExistente) return registroExistente;

     const requisicao = (async () => {
       const { data } = await api.post("/atividades/registrar", payload);
       return exigirObjeto<UsuarioAtividadeResponse>(data, "registro de atividade");
     })();

     registrosEmAndamento.set(chave, requisicao);

     try {
       const resposta = await requisicao;
       ultimoRegistro.set(chave, Date.now());
       return resposta;
     } finally {
       if (registrosEmAndamento.get(chave) === requisicao) {
         registrosEmAndamento.delete(chave);
       }
     }
   },

  /**
   * Envia o comprovante (imagem, nome e comentário) da atividade.
   * Rota: POST /validacao (multipart/form-data)
   *
   * ATENÇÃO: os nomes dos campos do FormData devem ser conferidos com o backend.
   */
  async enviarComprovante(payload: EnviarComprovanteRequest): Promise<void> {
     const formData = new FormData();
     formData.append("usuarioId", String(payload.usuarioId));
     formData.append("atividadeId", String(payload.atividadeId));
     formData.append("nome", payload.nome);
     formData.append("comentario", payload.comentario);
     formData.append("arquivo", payload.arquivo);

     await api.post("/validacao", formData);
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
    return exigirArray<UsuarioAtividadeResponse>(data, "histórico de atividades");
  },

  /*
   * ROTA ADMINISTRATIVA - NÃO CHAMAR NO APP DO UTILIZADOR FINAL:
   * - POST /atividades (Cria nova atividade no catálogo com qualquer pontuação).
   * 
   * O catálogo de atividades é fixo e gerido pelo backend.
   */
};