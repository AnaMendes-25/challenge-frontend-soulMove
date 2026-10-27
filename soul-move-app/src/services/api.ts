
const BASE_URL = import.meta.env.VITE_API_URL;

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
  // Trata 204 No Content sem dar erro de JSON
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

// Opções adicionais para requisições (como headers extras ou AbortSignal para cancelar)
interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export const api = {
  get: async (endpoint: string, options?: RequestOptions) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  },

  post: async <T>(endpoint: string, body?: T, options?: RequestOptions) => {
    // Se o body for FormData, o navegador DEVE definir o Content-Type automaticamente
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
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      signal: options?.signal,
    });
    return tratarResposta(resposta);
  }
};