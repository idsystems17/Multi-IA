import { GoogleGenAI } from "@google/genai";

export const maxDuration = 60;

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is missing.");
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
  }
  return aiClient;
}

const tomsMap: Record<string, string> = {
  vendas:       "persuasivo, com gatilhos mentais e foco em conversão",
  casual:       "descontraído e direto, como conversa entre amigos",
  educativo:    "didático e técnico, com exemplos práticos",
  motivacional: "inspirador e empoderador",
};

const tamanhoMap: Record<string, { palavras: number; paginas: string }> = {
  rapido:    { palavras: 350, paginas: "12 a 18 páginas" },
  padrao:    { palavras: 550, paginas: "25 a 35 páginas" },
  detalhado: { palavras: 800, paginas: "40 a 55 páginas" },
};

const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
    const { tema, nicho, tom, numCapitulos, tamanho } = req.body || {};

    if (!tema || !nicho) {
      return res.status(400).json({ error: "Informe o tema e o nicho do e-book." });
    }

    const ai       = getGeminiClient();
    const cfg      = tamanhoMap[tamanho] || tamanhoMap["padrao"];
    const tomDesc  = tomsMap[tom] || "informal e direto";
    const caps     = Math.max(1, Math.min(Number(numCapitulos) || 7, 10));

    // Monta o schema do TOC para o modelo saber quantos itens gerar
    const tocItems = Array.from({ length: caps }, (_, i) => `"Título do Capítulo ${i + 1}"`).join(", ");

    const prompt = `Você é um ghostwriter especializado em e-books de infoprodutos para o mercado brasileiro.
Escreva SEMPRE em Português (Brasil). Tom: ${tomDesc}.

Crie um e-book sobre: "${tema}"
Público-alvo: ${nicho}
Número de capítulos: ${caps}
Tamanho de cada capítulo: aproximadamente ${cfg.palavras} palavras em parágrafos (sem listas com bullet).

IMPORTANTE: Retorne SOMENTE o JSON abaixo, completo e válido, sem texto extra, sem blocos de código:

{
  "title": "Título chamativo em português",
  "subtitle": "Subtítulo com proposta de valor clara",
  "intro": "Introdução de 2 parágrafos apresentando o tema e o benefício principal",
  "tableOfContents": [${tocItems}],
  "chapters": [
    ${Array.from({ length: caps }, (_, i) => `{
      "number": ${i + 1},
      "title": "Título do Capítulo ${i + 1}",
      "content": "Conteúdo do capítulo em parágrafos corridos (${cfg.palavras} palavras)",
      "keyPoints": ["ponto principal 1", "ponto principal 2", "ponto principal 3"]
    }`).join(",\n    ")}
  ],
  "conclusion": "Conclusão motivadora de 1 parágrafo",
  "cta": "Chamada para ação final de 1 frase",
  "estimatedPages": "${cfg.paginas}",
  "wordCount": "Estimativa total de palavras"
}`;

    let jsonText  = "";
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`[generate-ebook] tentando modelo: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.75,
            maxOutputTokens: 16384,
          },
        });

        const text = (response.text || "").trim();
        if (text) {
          jsonText = text;
          console.log(`[generate-ebook] sucesso com: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[generate-ebook] erro com ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!jsonText) {
      throw lastError || new Error("Nenhum modelo retornou resposta.");
    }

    // Remove possíveis wrappers ```json ... ```
    jsonText = jsonText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsedData: any;
    try {
      parsedData = JSON.parse(jsonText);
    } catch {
      // Tenta extrair o maior bloco JSON da resposta
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error("A IA retornou um formato inválido. Tente novamente.");
      }
    }

    return res.status(200).json(parsedData);

  } catch (error: any) {
    console.error("[generate-ebook] erro:", error);
    return res.status(500).json({ error: error.message || "Erro inesperado ao gerar o e-book." });
  }
}
