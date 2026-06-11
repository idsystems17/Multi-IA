import { GoogleGenAI, Type } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  // CORS configuration or method check
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método Não Permitido. Use o método POST." });
  }

  try {
    const { niche, productType, experience, workHours } = req.body;

    if (!niche || !productType) {
      return res.status(400).json({ error: "Por favor, indique o seu nicho e o tipo de produto." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Você é um especialista sênior em engenharia de prompts para monetização digital com IAs gratuitas combinadas (orquestração de IAs).
Sua missão é criar PACKS DE PROMPTS prontos para copiar e colar, 100% personalizados para o nicho e tipo de produto do usuário.
Cada megaPrompt deve ser longo (mínimo 150 palavras), extremamente detalhado e profissional, com contexto suficiente para que a IA destinatária entregue resultado de alta qualidade sem ajustes adicionais.
O usuário não deve precisar pensar — só copiar, colar e executar.
Responda rigorosamente em JSON, no idioma Português (Brasil).
Distribua os prompts cobrindo todo o pipeline de produção: pesquisa/planejamento → criação de conteúdo principal → criativos visuais/vídeo → textos de vendas/copy.`;

    const prompt = `Crie um Pack de Prompts Estratégico de Multi-IA para:
- Nicho de Mercado: ${niche}
- Tipo de Produto: ${productType}
- Experiência do Usuário: ${experience || "Iniciante"}
- Horas Disponíveis por Dia: ${workHours || 2} horas

Crie entre 4 e 6 prompts, cada um para uma IA gratuita diferente e complementar (Claude.ai, ChatGPT, Google Gemini, Leonardo.ai, ElevenLabs, DeepSeek — escolha as mais adequadas para este tipo de produto).
Cada megaPrompt deve mencionar explicitamente o nicho "${niche}" e ser adaptado ao tipo de produto "${productType}".
O campo "phase" deve descrever o objetivo do prompt (ex: "Pesquisa de Mercado", "Criação do Conteúdo Principal", "Criativo Visual", "Copy de Vendas").
O campo "aiTool" deve conter o nome exato da IA gratuita recomendada para aquele prompt.
O campo "proTip" deve conter uma dica prática de como otimizar o resultado naquela ferramenta específica.`;

    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest"];
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
      throw lastError || new Error("Falha ao gerar o Pack de Prompts após tentar múltiplos modelos.");
    }

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    return res.status(200).json(parsedData);

  } catch (error: any) {
    console.error("Erro no manipulador do Vercel:", error);
    return res.status(500).json({ error: error.message || "Erro inesperado ao gerar o Pack de Prompts." });
  }
}
