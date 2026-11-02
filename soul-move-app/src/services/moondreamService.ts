
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
Você é um auditor automatizado de evidências para um aplicativo de sustentabilidade.

Sua tarefa é analisar a imagem enviada pelo usuário e determinar se ela cumpre rigorosamente o requisito de comprovação da atividade realizada.

DADOS DA ATIVIDADE:
- Nome da Atividade: ${atividade.nome}
- Descrição: ${atividade.descricao}
- Critério de Validação Exigido: ${atividade.validacao}

ETAPAS DE ANÁLISE INTERNA:
1. **Tipo de Evidência:** A imagem corresponde ao formato esperado pelo critério (${atividade.validacao})? (Ex: se exige print de GPS, a imagem deve ser uma interface de mapa/aplicativo de rota; se exige foto, deve ser uma foto real do mundo físico).
2. **Coerência com a Ação:** Os elementos visuais presentes na imagem provam de forma lógica e direta que o usuário executou a ação "${atividade.nome}" descrita no sistema?
3. **Falsificações ou Fraudes:** Verifique se há indícios óbvios de imagens aleatórias da internet, fotos de telas tiradas por outra câmera (se aplicável) ou imagens que não guardam relação com o tema.

DIRETRIZ DE DECISÃO:
- **APROVE** se a imagem comprovar de maneira satisfatória e coerente o "Critério de Validação Exigido" em conjunto com a descrição da atividade. Seja flexível com pequenas variações visuais ou de interface, desde que o objetivo central esteja evidente.
- **REPROVE** se a imagem for totalmente desconexa, se mostrar algo genérico que não prova a atividade ou se violar o formato de comprovação esperado.

SAÍDA OBRIGATÓRIA:
Responda estritamente com apenas uma palavra, sem markdown, sem pontuação extra e sem explicações:
APROVADA
ou
REPROVADA
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
