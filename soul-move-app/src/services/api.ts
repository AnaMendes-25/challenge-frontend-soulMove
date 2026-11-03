const BASE_URL = (import.meta.env.VITE_API_SOULMOVE_URL ?? "").replace(/\/+$/, "");

function validarBaseUrl(): void { 
  if (!BASE_URL) { throw new ApiError("A URL da API não está configurada. Verifique a variável VITE_API_SOULMOVE_URL.", null,) };
}

type ApiErrorFields = Record<string, string | string[]>;

interface ApiErrorBody {
  mensagem?: unknown;
  message?: unknown;
  campos?: unknown;
  errors?: unknown;
}

export class ApiError extends Error {
  readonly status: number | null;
  readonly campos: ApiErrorFields | null;
  readonly code: "HTTP_ERROR" | "NETWORK_ERROR" | "ABORTED";

  constructor(
    message: string,
    status: number | null,
    campos: ApiErrorFields | null = null,
    code: ApiError["code"] = "HTTP_ERROR",
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.campos = campos;
    this.code = code;
  }
}

export interface ApiResponse<T> {
  data: T | null;
  status: number;
}

export interface RequestOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
}

function normalizarCampos(value: unknown): ApiErrorFields | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const entries = Object.entries(value).filter(
    ([, message]) => typeof message === "string" ||
      (Array.isArray(message) && message.every((item) => typeof item === "string")),
  );
  return entries.length ? Object.fromEntries(entries) as ApiErrorFields : null;
}

async function lerCorpo(resposta: Response): Promise<unknown> {
  if (resposta.status === 204 || resposta.status === 205) return null;

  const texto = await resposta.text();
  if (!texto.trim()) return null;

  const contentType = resposta.headers.get("content-type") ?? "";
  if (contentType.includes("application/json") || contentType.includes("+json")) {
    try {
      return JSON.parse(texto) as unknown;
    } catch {
      throw new ApiError("A API retornou um JSON inválido.", resposta.status);
    }
  }

  return texto;
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  validarBaseUrl();
  const headers = new Headers(options.headers);
  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (body instanceof FormData || body instanceof Blob || typeof body === "string") {
      requestBody = body;
    } else {
      headers.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }
  }

  // Não tem token Bearer no contrato atual do Java (cadastro/login retorna Usuario).
  // Tem que centralizar a inclusão de credenciais aqui quando o contrato de autenticação mudar.
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: requestBody,
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Requisição cancelada.", null, null, "ABORTED");
    }
    throw new ApiError(
      "Não foi possível conectar à API. Verifique sua conexão e tente novamente.",
      null,
      null,
      "NETWORK_ERROR",
    );
  }

  const data = await lerCorpo(response);
  if (!response.ok) {
    const errorBody = data && typeof data === "object" ? data as ApiErrorBody : null;
    const message = typeof errorBody?.mensagem === "string"
      ? errorBody.mensagem
      : typeof errorBody?.message === "string"
        ? errorBody.message
        : response.status === 401
          ? "Sessão inválida ou expirada. Entre novamente."
          : `A requisição falhou (HTTP ${response.status}).`;

    throw new ApiError(
      message,
      response.status,
      normalizarCampos(errorBody?.campos ?? errorBody?.errors),
    );
  }

  return { data: data as T | null, status: response.status };
}

export function exigirObjeto<T>(data: unknown, recurso: string): T {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new ApiError(`A API retornou uma resposta inválida para ${recurso}.`, null);
  }
  return data as T;
}

export function exigirArray<T>(data: unknown, recurso: string): T[] {
  if (!Array.isArray(data)) {
    throw new ApiError(`A API retornou uma lista inválida para ${recurso}.`, null);
  }
  return data as T[];
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("GET", endpoint, undefined, options),
  post: <TResponse>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<TResponse>("POST", endpoint, body, options),
  put: <TResponse>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<TResponse>("PUT", endpoint, body, options),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("DELETE", endpoint, undefined, options),
};
