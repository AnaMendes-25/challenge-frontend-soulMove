const BASE_URL = "http://localhost:8080";

//classe de erro com tipagem estrita
export class ApiError extends Error {
  status: number;
  campos: Record<string, string> | null;

  constructor(mensagem: string, status: number, campos: Record<string, string> | null = null) {
    super(mensagem);
    this.name = "ApiError";
    this.status = status;
    this.campos = campos;
  }
}

// 2. Na sua função tratarResposta, substituímos aquele 'any' feio:
async function tratarResposta(resposta: Response) {
  if (resposta.status === 204) {
    return { data: null };
  }

  const body = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    // Agora instanciamos a nossa classe ApiError! Zero any.
    throw new ApiError(
      body?.mensagem || `Erro na requisição: ${resposta.status}`,
      resposta.status,
      body?.campos || null
    );
  }

  return { data: body };
}

// (get, post, put, delete) 

export const api = {
  // GET: Buscar dados
  get: async (endpoint: string) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return tratarResposta(resposta);
  },

  // POST: Criar/Enviar dados. Usamos o <T> genérico para o body.
  post: async <T>(endpoint: string, body: T) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return tratarResposta(resposta);
  },

  // PUT: Editar dados. Mesma estrutura do POST.
  put: async <T>(endpoint: string, body: T) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return tratarResposta(resposta);
  },

  // DELETE: Apagar dados. Não tem body.
  delete: async (endpoint: string) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return tratarResposta(resposta);
  }
};