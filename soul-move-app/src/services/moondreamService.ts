
import type { AtividadeBackend } from "../types/ValidacaoTypes";

const MOONDREAM_API_URL = "https://api.moondream.ai/v1/chat/completions";

export interface ResultadoValidacaoIA {
    aprovada: boolean;
    mensagem: string;
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


function gerarPerguntaDinamica(atividade: AtividadeBackend): string {
    const validacaoLower = atividade.validacao.toLowerCase();
    
    // Mapeia os critérios do banco para perguntas visuais nativas em inglês (VQA)
    let perguntaVisual = `the required evidence: ${atividade.validacao}`;

    if (validacaoLower.includes("gps") || validacaoLower.includes("trajeto")) {
        perguntaVisual = "a GPS navigation map or route track screenshot";
    } else if (validacaoLower.includes("conta") || validacaoLower.includes("energia") || validacaoLower.includes("luz")) {
        perguntaVisual = "an electricity utility bill or document";
    } else if (validacaoLower.includes("recicla") || validacaoLower.includes("coleta")) {
        perguntaVisual = "recyclable materials like plastic, glass, or paper in a recycling bin";
    } else if (validacaoLower.includes("bilhete") || validacaoLower.includes("transporte")) {
        perguntaVisual = "a public transit ticket or bus/subway receipt";
    }

    return `Does this image clearly show ${perguntaVisual}? Answer strictly with YES or NO.`;
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
                "Authorization": `Bearer ${apiKey}`, // Atualizado para Bearer token
            },
            body: JSON.stringify({
                model: "moondream3.1-9B-A2B",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image_url",
                                image_url: { url: imagemBase64 }
                            },
                            {
                                type: "text",
                                text: gerarPerguntaDinamica(atividade)
                            }
                        ]
                    }
                ],
                reasoning: true, // Obriga a IA a pensar antes de decidir
                temperature: 0.1  // Mantém a resposta rígida e determinística
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
            throw new Error(`Erro na API Moondream: HTTP ${respostaIA.status}.`);
        }

        const data = await respostaIA.json();
        const message = data.choices?.[0]?.message;

        const raciocinio = message?.reasoning || "";
        const textoResposta = (message?.content || "").trim().toUpperCase();

        console.log("=== RACIOCÍNIO DA IA ===");
        console.log(raciocinio);
        console.log("=== VEREDITO DA IA ===");
        console.log(textoResposta);
        console.log("============================");

        // A IA agora vai responder YES ou NO. 
        const aprovada = textoResposta.startsWith("YES") || textoResposta.startsWith("SIM");

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
    } finally {
        clearTimeout(timeoutId);
    }
}
