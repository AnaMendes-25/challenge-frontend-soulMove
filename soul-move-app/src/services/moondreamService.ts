
import type { AtividadeBackend } from "../types/ValidacaoTypes";

const MOONDREAM_API_URL = "https://api.moondream.ai/v1/query";

export interface ResultadoValidacaoIA {
    aprovada: boolean;
    mensagem: string;
}

interface MoondreamResponse {
    answer?: string;
}

function converterParaBase64(arquivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(arquivo);

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Não foi possível converter a imagem."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Erro ao ler o arquivo de imagem."));
        };
    });
}


function gerarPerguntaDinamica(
  atividade: AtividadeBackend
): string {
  return `
Você é um avaliador de evidências visuais.

Sua tarefa é verificar se a imagem comprova a realização de UMA
atividade específica. Não avalie apenas se a imagem é sustentável.

ATIVIDADE SOLICITADA:
Nome: ${atividade.nome}
Descrição: ${atividade.descricao}

Analise a imagem e responda mentalmente:

1. Qual ação está sendo realizada na imagem?
2. Essa ação corresponde diretamente à atividade solicitada?
3. Existem evidências visuais suficientes para sustentar essa relação?

REGRAS DE DECISÃO:

APROVADA:
Se a imagem mostrar claramente a ação solicitada, com evidências visuais suficientes.

REPROVADA:
Se a imagem mostrar uma ação diferente da atividade solicitada.

IMPORTANTE:
Avalie a ação visível, não a intenção presumida da pessoa.
Não aprove uma imagem apenas porque ela contém elementos
relacionados à sustentabilidade.

Responda com exatamente uma palavra:
APROVADA
ou
REPROVADA

Não repita as instruções, não apresente as duas opções e não explique.
`.trim();
}


export async function validarImagemSustentavel(
    arquivo: File,
    atividade: AtividadeBackend
): Promise<ResultadoValidacaoIA> {
    if (!arquivo.type.startsWith("image/")) {
        throw new Error("O arquivo selecionado não é uma imagem.");
    }

    const apiKey = import.meta.env.VITE_MOONDREAM_API_KEY;

    if (!apiKey) {
        throw new Error("A chave da API Moondream não foi configurada.");
    }

    const imagemBase64 = await converterParaBase64(arquivo);
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 30000);

    try {
        const respostaIA = await fetch(MOONDREAM_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Moondream-Auth": apiKey,
            },
            body: JSON.stringify({
                model: "moondream3.1-9B-A2B",
                image_url: imagemBase64,
                question: gerarPerguntaDinamica(atividade),
            }),
            signal: controller.signal,
        });

        if (!respostaIA.ok) {
            if (respostaIA.status === 401) {
                throw new Error("Falha na autenticação da API Moondream.");
            }

            if (respostaIA.status === 413) {
                throw new Error("A imagem é muito pesada.");
            }

            if (respostaIA.status === 429) {
                throw new Error("Limite de requisições atingido.");
            }

            throw new Error(
                `Erro na API Moondream: HTTP ${respostaIA.status}.`
            );
        }

        const resultadoIA: MoondreamResponse =
            await respostaIA.json();

        const texto = (resultadoIA.answer ?? "")
            .trim()
            .toUpperCase();

        console.log("Resposta original da IA:", resultadoIA.answer);

        // Extrai as decisões encontradas na resposta.
        const decisoes = texto.match(/\b(APROVADA|REPROVADA)\b/g) ?? [];

        // Aceita somente uma decisão inequívoca.
        const decisaoUnica =
            decisoes.length === 1 ? decisoes[0] : null;

        if (!decisaoUnica) {
            console.warn("Resposta inesperada da IA:", texto);

            return {
                aprovada: false,
                mensagem:
                    "Não foi possível determinar se a imagem comprova a atividade. Tente novamente.",
            };
        }

        const aprovada = decisaoUnica === "APROVADA";

        return {
            aprovada,
            mensagem: aprovada
                ? "Imagem aprovada com base nas evidências visuais."
                : "A imagem não apresentou evidências visuais suficientes para comprovar esta atividade.",
        };
    } catch (erro: unknown) {
        if (erro instanceof Error && erro.name === "AbortError") {
            throw new Error(
                "A IA demorou muito para responder. Tente novamente.",
                { cause: erro }
            );
        }

        throw erro;
    }
    finally {
        clearTimeout(timeoutId);
    }
}
