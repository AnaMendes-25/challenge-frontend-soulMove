const BASE_URL = import.meta.env.VITE_API_SOULMOVE_URL || "http://localhost:8080";

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

async function tratarResposta(resposta: Response) {
  // Trata 204 No Content sem dar erro de parse no JSON
  if (resposta.status === 204) {
    return { data: null };
  }

  const body = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new ApiError(
      body?.mensagem || `Erro na requisição: ${resposta.status}`,
      resposta.status,
      body?.campos || null
    );
  }

  return { data: body };
}

interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export const api = {
  get: async (endpoint: string, options?: RequestOptions) => {
    // Removido 'Content-Type' de requisições GET para evitar falhas de CORS/preflight
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        ...options?.headers,
      },
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  },

  post: async <T>(endpoint: string, body?: T, options?: RequestOptions) => {
    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  },

  put: async <T>(endpoint: string, body?: T, options?: RequestOptions) => {
    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  },

  delete: async (endpoint: string, options?: RequestOptions) => {
    // Removido 'Content-Type' fixo do DELETE (só envia se não houver corpo)
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...options?.headers,
      },
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  },
};