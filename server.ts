import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is missing.");
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/api/generate-ebook", async (req, res) => {
  try {
    const { tema, nicho, tom, numCapitulos, tamanho } = req.body;

    if (!tema || !nicho) {
      return res.status(400).json({ error: "Por favor, informe o tema e o nicho do e-book." });
    }

    const ai = getGeminiClient();

    const tomsMap: Record<string, string> = {
      vendas:      "persuasivo e focado em conversão, com gatilhos mentais",
      casual:      "informal e descontraído, como uma conversa entre amigos",
      educativo:   "técnico e didático, com exemplos práticos",
      motivacional:"inspirador e empoderador",
    };

    const tamanhoMap: Record<string, { palavras: number; paginas: string }> = {
      rapido:    { palavras: 120, paginas: "12 a 18 páginas" },
      padrao:    { palavras: 220, paginas: "25 a 35 páginas" },
      detalhado: { palavras: 380, paginas: "40 a 55 páginas" },
    };

    const cfg     = tamanhoMap[tamanho] || tamanhoMap["padrao"];
    const tomDesc = tomsMap[tom] || "informal e direto";
    const caps    = Number(numCapitulos) || 7;

    const prompt = `Você é um ghostwriter especializado em e-books de infoprodutos para o mercado brasileiro.
Escreva em Português (Brasil). Tom: ${tomDesc}.

Crie um e-book sobre: "${tema}"
Público-alvo: ${nicho}
Capítulos: ${caps}
Tamanho por capítulo: aproximadamente ${cfg.palavras} palavras em parágrafos corridos (não listas).

Retorne APENAS um JSON válido, sem texto antes ou depois, sem blocos de código, sem markdown. Use este formato exato:

{
  "title": "título chamativo",
  "subtitle": "subtítulo com proposta de valor",
  "intro": "introdução de 2 a 3 parágrafos",
  "tableOfContents": ["Título do Capítulo 1", "Título do Capítulo 2"],
  "chapters": [
    {
      "number": 1,
      "title": "Título do Capítulo",
      "content": "conteúdo em parágrafos corridos",
      "keyPoints": ["ponto 1", "ponto 2", "ponto 3"]
    }
  ],
  "conclusion": "conclusão motivadora",
  "cta": "chamada para ação final",
  "estimatedPages": "${cfg.paginas}",
  "wordCount": "estimativa de palavras"
}`;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let jsonText = "";
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Tentando gerar e-book com: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });

        jsonText = (response.text || "").trim();
        if (jsonText) {
          console.log(`Sucesso com: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Erro com ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!jsonText) {
      throw lastError || new Error("Nenhum modelo retornou resposta.");
    }

    // Remove possível wrapper de bloco de código caso o modelo ignore a instrução
    jsonText = jsonText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch {
      // Tenta extrair o JSON mesmo que haja texto ao redor
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error("A IA retornou um formato inválido. Tente novamente.");
      }
    }

    res.json(parsedData);

  } catch (error: any) {
    console.error("Erro na rota generate-ebook:", error);
    res.status(500).json({ error: error.message || "Erro inesperado ao gerar o e-book." });
  }
});

async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`Servidor rodando na porta ${PORT}`));
}

setupViteOrStatic().catch(console.error);
