import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Generate complete e-book
app.post("/api/generate-ebook", async (req, res) => {
  try {
    const { tema, nicho, tom, numCapitulos, tamanho } = req.body;

    if (!tema || !nicho) {
      return res.status(400).json({ error: "Por favor, informe o tema e o nicho do e-book." });
    }

    const ai = getGeminiClient();

    const tomsMap: Record<string, string> = {
      vendas: "persuasivo e focado em conversão, com gatilhos mentais e urgência",
      casual: "informal, direto e descontraído, como uma conversa entre amigos",
      educativo: "técnico, detalhado e didático, com exemplos práticos",
      motivacional: "inspirador, energético e empoderador"
    };

    // Tamanho define profundidade por capítulo
    const tamanhoMap: Record<string, { palavras: number; paginas: string }> = {
      rapido:    { palavras: 150, paginas: "12 a 18 páginas" },
      padrao:    { palavras: 280, paginas: "25 a 35 páginas" },
      detalhado: { palavras: 500, paginas: "45 a 60 páginas" },
    };

    const tamanhoConfig = tamanhoMap[tamanho] || tamanhoMap["padrao"];
    const tomDescricao = tomsMap[tom] || "informal e direto";
    const capitulos = numCapitulos || 7;

    const systemInstruction = `Você é um ghostwriter profissional especializado em e-books de infoprodutos digitais para o mercado brasileiro.
Escreva conteúdo fluído e profissional em parágrafos corridos. Seja direto — não use listas de tópicos como corpo do capítulo.
Use exemplos práticos do dia a dia do público-alvo informado.
Escreva sempre em Português (Brasil). O texto deve parecer escrito por um especialista humano.
IMPORTANTE: Gere JSON válido e completo. Não truncar nenhum campo.`;

    const prompt = `Crie um e-book completo sobre: "${tema}"
Público-alvo: ${nicho}
Tom: ${tomDescricao}
Número de capítulos: ${capitulos}
Profundidade por capítulo: aproximadamente ${tamanhoConfig.palavras} palavras de texto corrido por capítulo
Total estimado: ${tamanhoConfig.paginas}

Escreva parágrafos fluídos em cada capítulo, não listas de tópicos. Inclua exemplos do dia a dia de "${nicho}".`;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let response = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Tentando gerar e-book com o modelo: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.75,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title:    { type: Type.STRING, description: "Título chamativo para o e-book" },
                subtitle: { type: Type.STRING, description: "Subtítulo que detalha a proposta de valor" },
                intro:    { type: Type.STRING, description: "Introdução de 100 a 150 palavras apresentando o tema" },
                tableOfContents: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Títulos de todos os capítulos"
                },
                chapters: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      number:    { type: Type.INTEGER },
                      title:     { type: Type.STRING },
                      content:   { type: Type.STRING, description: `Conteúdo do capítulo em parágrafos corridos, aproximadamente ${tamanhoConfig.palavras} palavras` },
                      keyPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 pontos-chave do capítulo" }
                    },
                    required: ["number", "title", "content", "keyPoints"]
                  }
                },
                conclusion:     { type: Type.STRING, description: "Conclusão motivadora de 80 a 120 palavras" },
                cta:            { type: Type.STRING, description: "Chamada para ação final — o que o leitor deve fazer agora" },
                estimatedPages: { type: Type.STRING, description: `Estimativa de páginas — use "${tamanhoConfig.paginas}"` },
                wordCount:      { type: Type.STRING, description: "Estimativa de palavras totais" }
              },
              required: ["title", "subtitle", "intro", "tableOfContents", "chapters", "conclusion", "cta", "estimatedPages", "wordCount"]
            }
          }
        });

        if (response) {
          console.log(`E-book gerado com sucesso usando: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Erro com o modelo ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("Falha ao gerar o e-book após tentar múltiplos modelos.");
    }

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);

  } catch (error: any) {
    console.error("Erro na rota generate-ebook:", error);
    res.status(500).json({ error: error.message || "Erro inesperado ao gerar o e-book." });
  }
});

// Configure Vite or Static Files
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando Vite em modo desenvolvimento...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Servindo arquivos estáticos em produção...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error("Falha ao configurar Vite/Servidor:", err);
});
