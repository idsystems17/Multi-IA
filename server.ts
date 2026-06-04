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

// API: Generate customized multi-AI monetization roadmap
app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const { niche, goal, experience, workHours } = req.body;

    if (!niche || !goal) {
      return res.status(400).json({ error: "Por favor, indique o seu nicho e seu objetivo principal." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Você é um mentor especialista em monetização extrema na internet utilizando Inteligências Artificiais GRATUITAS combinadas (orquestração de IAs).
O seu objetivo é desmistificar que as pessoas precisam usar apenas uma IA paga (como ChatGPT Plus). Ensine-as a tirar o máximo de proveito combinando várias IAs gratuitas (ex: ChatGPT, Claude, Gemini, Leonardo.ai, Copilot, DeepSeek, etc).
Crie um Roadmap com passo a passo para o usuário com base no nicho, objetivo, experiência dele e horas disponíveis.
A resposta deve ser rigorosamente estruturada em JSON, no idioma Português (Brasil). Cada etapa/fase do roadmap DEVE incluir um "megaPrompt" real, extremamente otimizado e detalhado que o usuário possa copiar e colar imediatamente para obter o melhor resultado absoluto na ferramenta sugerida.`;

    const prompt = `Crie um Roadmap Estratégico de Multi-IA para:
- Nicho de Mercado: ${niche}
- Objetivo de Renda/Formato: ${goal}
- Experiência do Usuário: ${experience || "Iniciante"}
- Horas Disponíveis por Dia: ${workHours || 2} horas

Explique detalhadamente como orquestrar no mínimo de 2 a 3 IAs gratuitas diferentes de forma complementar (uma para planejar, outra para criar textos profundos, outra para criar imagens/vídeos ou postagens, etc.). Forneça prompts enormes e robustos de nível profissional na propriedade "megaPrompt" de cada fase.`;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let response = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Tentando gerar conteúdo com o modelo: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                estimatedDailyIncome: { type: Type.STRING, description: "Estimativa realista de renda em reais (R$)" },
                complexity: { type: Type.STRING, description: "Iniciante, Intermediário ou Hardcore" },
                toolsUsed: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "IAs gratuitas sugeridas para este plano"
                },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phase: { type: Type.STRING, description: "Fase do projeto (ex: Planejamento, Geração do Conteúdo, Criativos)" },
                      aiTool: { type: Type.STRING, description: "Qual IA gratuita usar e por quê (ex: Claude para escrita natural, ChatGPT para SEO)" },
                      description: { type: Type.STRING, description: "Descrição prática do que ele deve fazer nessa fase" },
                      megaPrompt: { type: Type.STRING, description: "Um mega-prompt incrível, extremamente detalhado e pronto para copiar e colar" },
                      proTip: { type: Type.STRING, description: "A dica mestre para essa fase" }
                    },
                    required: ["phase", "aiTool", "description", "megaPrompt", "proTip"]
                  }
                },
                monetizationStrategy: {
                  type: Type.OBJECT,
                  properties: {
                    platform: { type: Type.STRING, description: "Onde cadastrar e vender (Kiwify, Hotmart, Fiverr, Workana, etc.)" },
                    pricingStrategy: { type: Type.STRING, description: "Como cobrar no início e após ganhar tração" },
                    scalingPlan: { type: Type.STRING, description: "Plano prático de escala" }
                  },
                  required: ["platform", "pricingStrategy", "scalingPlan"]
                }
              },
              required: ["title", "summary", "estimatedDailyIncome", "complexity", "toolsUsed", "steps", "monetizationStrategy"]
            }
          }
        });

        if (response) {
          console.log(`Geração bem-sucedida usando o modelo: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Erro com o modelo ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("Falha ao gerar o Roadmap após tentar múltiplos modelos.");
    }

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);

  } catch (error: any) {
    console.error("Erro na rota generate-roadmap:", error);
    res.status(500).json({ error: error.message || "Erro inesperado ao gerar o Roadmap." });
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
