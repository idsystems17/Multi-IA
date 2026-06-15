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
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
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
    const { tema, nicho, tom, numCapitulos } = req.body;

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

    const tomDescricao = tomsMap[tom] || "informal e direto";

    const systemInstruction = `Você é um ghostwriter profissional especializado em e-books de infoprodutos digitais para o mercado brasileiro.
Escreva conteúdo rico, fluído e profissional. Cada capítulo deve ter no mínimo 350 palavras de texto real em parágrafos (não listas de tópicos simples).
Use exemplos práticos, metáforas e situações do dia a dia do público-alvo para tornar o conteúdo concreto e aplicável.
Escreva sempre em Português (Brasil). O texto deve parecer escrito por um especialista humano, não por IA.`;

    const prompt = `Crie um e-book completo sobre: "${tema}"
Público-alvo / Nicho: ${nicho}
Tom da escrita: ${tomDescricao}
Número de capítulos: ${numCapitulos || 7}

O e-book deve ser completo, com conteúdo real e aprofundado em cada capítulo. Cada capítulo precisa ter no mínimo 350 palavras de texto corrido, não apenas tópicos. Inclua exemplos práticos do dia a dia do público "${nicho}".`;

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
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Título chamativo e irresistível para o e-book" },
                subtitle: { type: Type.STRING, description: "Subtítulo complementar que detalha a proposta de valor" },
                intro: { type: Type.STRING, description: "Introdução envolvente com no mínimo 200 palavras, apresentando o problema e a proposta do e-book" },
                tableOfContents: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Lista com os títulos de todos os capítulos"
                },
                chapters: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      number: { type: Type.INTEGER, description: "Número do capítulo" },
                      title: { type: Type.STRING, description: "Título do capítulo" },
                      content: { type: Type.STRING, description: "Conteúdo completo do capítulo, mínimo 350 palavras em parágrafos fluídos" },
                      keyPoints: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "3 pontos-chave do capítulo (resumo prático)"
                      }
                    },
                    required: ["number", "title", "content", "keyPoints"]
                  }
                },
                conclusion: { type: Type.STRING, description: "Conclusão motivadora com no mínimo 150 palavras" },
                cta: { type: Type.STRING, description: "Chamada para ação final — o que o leitor deve fazer agora" },
                estimatedPages: { type: Type.STRING, description: "Estimativa de páginas (ex: 28 páginas)" },
                wordCount: { type: Type.STRING, description: "Estimativa de palavras (ex: 7.200 palavras)" }
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
