import { api } from "./api";
import type {
  Usuario,
  UsuarioCadastroRequest,
  UsuarioLoginRequest,
  UsuarioUpdateRequest,
} from "./usuariosTypes";

export const usuariosService = {
  /**
   * Registra um novo usuário e armazena o ID no localStorage.
   * Rota: POST /usuarios
   * 
   * NOTA: O e-mail é limpo e convertido para minúsculo na API.
   * Em caso de e-mail já existente, lança erro HTTP 409.
   * O usuário é criado com 0 pontos e entra automaticamente no ranking.
   */
  async cadastrar(payload: UsuarioCadastroRequest): Promise<Usuario> {
    const { data } = await api.post("/usuarios", payload);
    const usuario = data as Usuario;
    if (usuario?.id) {
      localStorage.setItem("usuarioId", String(usuario.id));
    }
    return usuario;
  },

  /**
   * Realiza o login do usuário e armazena o ID no localStorage.
   * Rota: POST /usuarios/login
   * 
   * ATENÇÃO PARA A INTEGRAÇÃO:
   * 1. Sem Token/JWT: A API não gera Bearer token. Ela retorna o objeto Usuario completo.
   * 2. Persistência: Guardamos o `id` em localStorage e o enviamos nas rotas de registro, resgate e histórico.
   * 3. Erro 401: Emite mensagem genérica ("E-mail ou senha inválidos") sem indicar qual campo errou.
   */
  async login(payload: UsuarioLoginRequest): Promise<Usuario> {
    const { data } = await api.post("/usuarios/login", payload);
    const usuario = data as Usuario;
    if (usuario?.id) {
      localStorage.setItem("usuarioId", String(usuario.id));
    }
    return usuario;
  },

  /**
   * Busca os dados e saldos atualizados do usuário pelo ID.
   * Rota: GET /usuarios/{id}
   * 
   * IMPORTANTE: Chame esta função sempre após:
   * - Concluir/registrar uma atividade (`POST /atividades/registrar`)
   * - Resgatar uma recompensa (`POST /recompensas/resgatar`)
   * Motivo: As rotas de registro/resgate NÃO retornam os saldos novos no payload de resposta.
   */
  async buscarPorId(id: number): Promise<Usuario> {
    const { data } = await api.get(`/usuarios/${id}`);
    return data as Usuario;
  },

  /**
   * Atualiza o nome e/ou foto do perfil do usuário.
   * Rota: PUT /usuarios/{id}
   * 
   * NOTA: O PUT é substitutivo completo para esses dois campos. E-mail, senha e pontos
   * não são alterados nesta rota.
   */
  async atualizarPerfil(id: number, payload: UsuarioUpdateRequest): Promise<Usuario> {
    const { data } = await api.put(`/usuarios/${id}`, payload);
    return data as Usuario;
  },

  /**
   * Exclui permanentemente a conta do usuário do banco de dados e remove os dados locais.
   * Rota: DELETE /usuarios/{id}
   */
  async excluirConta(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}`);
    this.logout();
  },

  /**
   * Obtém o ID do usuário atualmente autenticado (guardado em localStorage).
   */
  getUsuarioIdGuardado(): number | null {
    const id = localStorage.getItem("usuarioId");
    return id ? Number(id) : null;
  },

  /**
   * Limpa os dados de sessão do front-end (Logout).
   */
  logout(): void {
    localStorage.removeItem("usuarioId");
  },

  /*
   * ROTAS ADMINISTRATIVAS - NÃO CHAMAR NO APP DO USUÁRIO FINAL:
   * - GET /usuarios (Lista todos os usuários com e-mail e pontos)
   * - GET /usuarios/email?email= (Busca usuário por e-mail)
   * - GET /usuarios/pesquisar?nome= (Pesquisa usuários por nome)
   * - GET /usuarios/top10 (Top 10 usuários expondo e-mails)
   * 
   * Para exibir o placar no app, utilize exclusivamente o `rankingService` (GET /ranking?limite=10).
   */
};