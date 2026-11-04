/**
 * Objeto do utilizador retornado pela API.
 * Utilizado nas rotas: POST /usuarios, POST /usuarios/login, GET /usuarios/{id}, PUT /usuarios/{id}
 */
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  fotoUsuario: string | null;
  pontuacaoUsuario: number; // Pontuação vitalícia (ranking)
  pontuacaoSoul: number;    // Saldo para resgate de recompensas
}

/**
 * Payload para criação de nova conta.
 * Rota: POST /usuarios
 */
export interface UsuarioCadastroRequest {
  nome: string;
  email: string;
  senha: string;
  fotoUsuario?: string | null;
}

/**
 * Payload para autenticação.
 * Rota: POST /usuarios/login
 */
export interface UsuarioLoginRequest {
  email: string;
  senha: string;
}

/**
 * Payload para atualização do perfil.
 * Rota: PUT /usuarios/{id}
 */
export interface UsuarioUpdateRequest {
  nome: string;
  email: string;
  fotoUsuario?: string | null;
  senha?: string;
}