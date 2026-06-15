import React, { useState } from "react";
import {
  BookOpen,
  Layers,
  Sparkles,
  Copy,
  Check,
  Search,
  ChevronRight,
  FileText,
  Users,
  Youtube,
  Briefcase,
  Zap,
  GraduationCap,
  TrendingUp,
  Target,
  AlignLeft,
  Hash,
  Download,
  RefreshCw,
  AlertCircle,
  Rocket,
  Palette,
  DollarSign,
  ShoppingBag,
  Megaphone,
  ExternalLink,
  Star,
} from "lucide-react";
import { GeneratedEbook } from "./types";

type Tab = "ebook" | "arsenal" | "monetize";
type Tom = "vendas" | "casual" | "educativo" | "motivacional";
type Tamanho = "rapido" | "padrao" | "detalhado";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("ebook");

  // E-book generator form state
  const [tema, setTema] = useState("");
  const [nicho, setNicho] = useState("");
  const [tom, setTom] = useState<Tom>("casual");
  const [numCapitulos, setNumCapitulos] = useState(7);
  const [tamanho, setTamanho] = useState<Tamanho>("padrao");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedEbook, setGeneratedEbook] = useState<GeneratedEbook | null>(null);

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Arsenal search/filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const buildFullEbookText = (ebook: GeneratedEbook): string => {
    const lines: string[] = [];
    lines.push(ebook.title.toUpperCase());
    lines.push(ebook.subtitle);
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("SUMÁRIO");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    ebook.tableOfContents.forEach((t, i) => lines.push(`${i + 1}. ${t}`));
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("INTRODUÇÃO");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(ebook.intro);
    lines.push("");
    ebook.chapters.forEach((ch) => {
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push(`CAPÍTULO ${ch.number}: ${ch.title.toUpperCase()}`);
      lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      lines.push(ch.content);
      lines.push("");
      lines.push("Pontos-chave:");
      ch.keyPoints.forEach((kp) => lines.push(`• ${kp}`));
      lines.push("");
    });
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("CONCLUSÃO");
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(ebook.conclusion);
    lines.push("");
    lines.push(ebook.cta);
    return lines.join("\n");
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema.trim() || !nicho.trim()) {
      setErrorMsg("Preencha o tema e o nicho do e-book para continuar.");
      return;
    }
    setErrorMsg("");
    setIsGenerating(true);
    setGeneratedEbook(null);

    try {
      const res = await fetch("/api/generate-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, nicho, tom, numCapitulos, tamanho }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao gerar o e-book.");
      }

      const data: GeneratedEbook = await res.json();
      setGeneratedEbook(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Não foi possível conectar com a IA. Verifique a GEMINI_API_KEY.");
    } finally {
      setIsGenerating(false);
    }
  };

  const freeAIs = [
    {
      name: "Claude.ai",
      description: "A IA com escrita mais humanizada do mundo.",
      specialty: "Artigos, roteiros profundos, e-books e copywriting magnético.",
      category: "text",
      badge: "Redação de Elite",
      strength: "Não deixa rastro de IA; vocabulário empático e refinado.",
      weakness: "Limite de mensagens no plano gratuito.",
      boilerplatePrompt: "Você é um Copywriter Sênior de lançamentos de 7 dígitos. Escreva um script de vendas de 3 minutos no estilo Storytelling para o produto de nicho [INSIRA O SEU NICHO]. Evite clichês vazios, use frustrações cotidianas do cliente ideal e termine com uma ancoragem de valor imperdível.",
    },
    {
      name: "ChatGPT (GPT-4o mini)",
      description: "A ferramenta mais rápida e versátil de inteligência geral.",
      specialty: "SEO, estruturação de e-books, brainstorms, ideias e programação.",
      category: "text",
      badge: "Rapidez & SEO",
      strength: "Executa pautas complexas rapidamente, excelente para organizar dados.",
      weakness: "Escrita de textos longos tende a parecer robótica sem bons prompts.",
      boilerplatePrompt: "Aja como um especialista em SEO sênior. Crie 10 títulos altamente clicáveis de blog posts baseados nas melhores palavras-chave de baixa competição para o nicho de [NICHO]. Retorne também os respectivos metatags de descrição focados em conversão orgânica.",
    },
    {
      name: "Google Gemini",
      description: "Incrível para pesquisas atuais com acesso real à Internet.",
      specialty: "Tendências de mercado, dados de concorrentes e referências científicas.",
      category: "research",
      badge: "Dados e Web",
      strength: "Integrado ao motor de busca do Google; traz as notícias mais recentes.",
      weakness: "Geração de textos longos pode ser resumida demais.",
      boilerplatePrompt: "Busque na internet de hoje: Quais os sub-nichos que mais cresceram em termos de infoprodutos e buscas no Brasil nos últimos 3 meses? Traga dados, percentuais de mercado estimados e as 3 maiores dores urgentes desses novos públicos.",
    },
    {
      name: "Leonardo.ai",
      description: "Geração de imagens de cinema com créditos gratuitos diários.",
      specialty: "Capas de e-books, ilustrações realistas e avatares para canais dark.",
      category: "image",
      badge: "Design Ultra Real",
      strength: "Modelos ajustados para fotorrealismo e arte 3D impecável.",
      weakness: "Menu de opções pode parecer complexo no início.",
      boilerplatePrompt: "Stunning cinematic dramatic photo of [SUA DESCRIÇÃO], unreal engine 5 render, depth of field, sharp focus, volumetric lighting, epic colors, 16:9 ratio.",
    },
    {
      name: "Microsoft Copilot / Bing",
      description: "Acesso gratuito ao gerador de imagens premium DALL-E 3 da OpenAI.",
      specialty: "Geração instantânea de criativos publicitários sob demanda.",
      category: "image",
      badge: "DALL-E 3 Grátis",
      strength: "Excelente renderização de textos escritos dentro das imagens.",
      weakness: "Pode demorar para renderizar em picos de tráfego.",
      boilerplatePrompt: "A flat aesthetic product photography vector illustration of a digital glowing laptop mockup, on top of clean wood desk, cozy ambient office workspace with green plants, modern high contrast vector graphic.",
    },
    {
      name: "ElevenLabs",
      description: "A melhor locução por inteligência artificial do mercado.",
      specialty: "Vozes humanas perfeitas para vídeos sem aparecer (canal dark) e podcasts.",
      category: "audio",
      badge: "Voz Realista",
      strength: "Vozes contam com respiração, entonação emocional e ritmo dinâmico.",
      weakness: "Cota de 10.000 caracteres mensais gratuitos (renova todo mês).",
      boilerplatePrompt: "[Instrução interna da plataforma: Use tons maduros e confiáveis para narrar o roteiro abaixo com pausas teatrais curtas após revelações marcantes].",
    },
    {
      name: "CapCut Desktop",
      description: "Edição automatizada de vídeos curtos orientada por IA.",
      specialty: "Edição automática com legendas dinâmicas, cortes e transições prontas.",
      category: "video",
      badge: "Editor Viral",
      strength: "Criação ultra rápida de vídeos de alta retenção para TikTok e Instagram.",
      weakness: "Necessário download do app gratuito para computador ou celular.",
      boilerplatePrompt: "[Use o recurso de Redimensionamento Automático e Legendas Inteligentes por IA com animação de Pop-in colorido em amarelo e branco para maximizar a retenção].",
    },
    {
      name: "DeepSeek-V3",
      description: "Uma IA gratuita extremamente eficiente em raciocínio analítico.",
      specialty: "Pesquisas profundas de lógica corporativa e otimização financeira.",
      category: "research",
      badge: "Lógica Pura",
      strength: "Pensamento estruturado, econômico no uso de tokens e muito precisa.",
      weakness: "Disponibilidade oscila conforme demanda global elevada.",
      boilerplatePrompt: "Analise a estrutura de precificação descrita a seguir e proponha 3 estratégias de Upsell para infoprodutos de R$ 29,90 de forma que a margem média de compra passe a ser superior a R$ 60.",
    },
  ];

  const tomsConfig = [
    { id: "vendas" as Tom, label: "Vendas", desc: "Persuasivo & direto", icon: Target, color: "rose" },
    { id: "casual" as Tom, label: "Casual", desc: "Informal & amigável", icon: Users, color: "blue" },
    { id: "educativo" as Tom, label: "Educativo", desc: "Técnico & didático", icon: GraduationCap, color: "violet" },
    { id: "motivacional" as Tom, label: "Motivacional", desc: "Inspirador & energético", icon: Zap, color: "amber" },
  ];

  const filteredAIs = freeAIs
    .filter((ai) => {
      if (activeCategory === "all") return true;
      if (activeCategory === "text") return ai.category === "text";
      if (activeCategory === "image") return ai.category === "image";
      if (activeCategory === "research") return ai.category === "research";
      if (activeCategory === "multimedia") return ai.category === "audio" || ai.category === "video";
      return false;
    })
    .filter((ai) => {
      const t = (ai.name + " " + ai.description + " " + ai.specialty).toLowerCase();
      return t.includes(searchQuery.toLowerCase());
    });

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F2937] font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 fixed h-full z-10">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-sm shadow-blue-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-[#1F2937] leading-none">E-book Pronto</div>
              <div className="text-[11px] text-gray-400 mt-0.5 font-medium">Gerador com IA</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("ebook")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "ebook"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 hover:text-[#1F2937]"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Gerar E-book</span>
          </button>

          <button
            onClick={() => setActiveTab("arsenal")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "arsenal"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 hover:text-[#1F2937]"
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Arsenal de IAs</span>
            <span className="ml-auto text-[9px] bg-blue-50 text-[#2563EB] px-1.5 py-0.5 rounded font-bold uppercase">
              BÔNUS 1
            </span>
          </button>

          <button
            onClick={() => setActiveTab("monetize")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "monetize"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 hover:text-[#1F2937]"
            }`}
          >
            <Rocket className="w-4 h-4 shrink-0" />
            <span>Monetize seu E-book</span>
            <span className="ml-auto text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase">
              BÔNUS 2
            </span>
          </button>
        </nav>

        {/* Footer badge */}
        <div className="p-4 m-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-[#2563EB] font-semibold leading-relaxed">
            🔒 E-book Pronto · Acesso por 1 ano.
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col ml-64">

        {/* Header */}
        <header className="h-16 px-8 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">E-book Pronto</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[#2563EB] font-semibold">
              {activeTab === "ebook" ? "Gerador de E-book" : activeTab === "arsenal" ? "Arsenal de IAs" : "Monetize seu E-book"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            IA Ativa
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full flex-1">

          {/* ─── TAB: GERADOR DE E-BOOK ─── */}
          {activeTab === "ebook" && (
            <div className="space-y-6">

              {/* Page header */}
              <div>
                <h1 className="text-2xl font-display font-bold text-[#1F2937]">Gerador de E-book com IA</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Informe o tema e o público. A IA escreve o e-book completo — capítulo por capítulo — pronto para vender na Kiwify, Hotmart ou qualquer outra plataforma.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* FORM */}
                <div className="lg:col-span-4">
                  <form onSubmit={handleGenerate} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm">

                    <h3 className="font-semibold text-sm text-[#1F2937] flex items-center gap-2">
                      <AlignLeft className="w-4 h-4 text-[#2563EB]" />
                      Sobre o seu e-book
                    </h3>

                    {/* Tema */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 block">
                        Tema do E-book <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Como Emagrecer Sem Academia, Renda Extra com Celular..."
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Nicho */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 block">
                        Nicho / Público-alvo <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Mães de 25 a 40 anos, Iniciantes em TI, Empreendedores..."
                        value={nicho}
                        onChange={(e) => setNicho(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Tom */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 block">Tom da Escrita</label>
                      <div className="grid grid-cols-2 gap-2">
                        {tomsConfig.map(({ id, label, desc, icon: Icon }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setTom(id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              tom === id
                                ? "bg-[#2563EB] border-[#2563EB] text-white"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#3B82F6] hover:bg-blue-50"
                            }`}
                          >
                            <Icon className={`w-4 h-4 mb-1.5 ${tom === id ? "text-white" : "text-gray-400"}`} />
                            <span className="text-xs font-semibold block leading-tight">{label}</span>
                            <span className={`text-[10px] block mt-0.5 ${tom === id ? "text-blue-100" : "text-gray-400"}`}>{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Capítulos */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-gray-400" />
                        Número de Capítulos
                      </label>
                      <div className="flex gap-2">
                        {[5, 7, 10].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setNumCapitulos(n)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                              numCapitulos === n
                                ? "bg-[#2563EB] text-white border-[#2563EB]"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#3B82F6]"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tamanho */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        Tamanho do E-book
                      </label>
                      <div className="flex gap-2">
                        {([
                          { id: "rapido",    label: "Rápido",    desc: "~15 pág." },
                          { id: "padrao",    label: "Padrão",    desc: "~30 pág." },
                          { id: "detalhado", label: "Detalhado", desc: "~50 pág." },
                        ] as { id: Tamanho; label: string; desc: string }[]).map(({ id, label, desc }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setTamanho(id)}
                            className={`flex-1 py-2 px-1 rounded-lg border transition-all flex flex-col items-center gap-0.5 ${
                              tamanho === id
                                ? "bg-[#2563EB] text-white border-[#2563EB]"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#3B82F6]"
                            }`}
                          >
                            <span className="text-xs font-bold">{label}</span>
                            <span className={`text-[10px] ${tamanho === id ? "text-blue-100" : "text-gray-400"}`}>{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Gerando E-book...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Gerar Meu E-book com IA
                        </>
                      )}
                    </button>

                    {errorMsg && (
                      <div className="p-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* OUTPUT */}
                <div className="lg:col-span-8 space-y-4">

                  {/* Empty state */}
                  {!generatedEbook && !isGenerating && (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center gap-4 min-h-[500px] p-12">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                        <FileText className="w-8 h-8 text-[#2563EB]" />
                      </div>
                      <div className="max-w-sm">
                        <h3 className="text-base font-semibold text-[#1F2937]">Seu e-book aparecerá aqui</h3>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                          Preencha o tema, o nicho e clique em gerar. A IA escreve o conteúdo completo em segundos.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Loading state */}
                  {isGenerating && (
                    <div className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center gap-5 min-h-[500px] p-12">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-[#2563EB] animate-spin" />
                        <div className="w-8 h-8 rounded-full bg-white absolute top-4 left-4 flex items-center justify-center shadow-sm">
                          <Sparkles className="w-4 h-4 text-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#1F2937] animate-pulse">Escrevendo seu e-book...</h3>
                        <p className="text-gray-400 text-sm mt-1">A IA está criando cada capítulo com conteúdo completo. Aguarde alguns segundos.</p>
                      </div>
                    </div>
                  )}

                  {/* Generated e-book */}
                  {generatedEbook && !isGenerating && (
                    <div className="space-y-4 animate-fade-in">

                      {/* Action bar */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                          <Check className="w-4 h-4" />
                          E-book gerado com sucesso!
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCopy(buildFullEbookText(generatedEbook), "full-ebook")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                              copiedId === "full-ebook"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8]"
                            }`}
                          >
                            {copiedId === "full-ebook" ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                            {copiedId === "full-ebook" ? "Copiado!" : "Copiar E-book Completo"}
                          </button>
                          <button
                            onClick={() => setGeneratedEbook(null)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Novo E-book
                          </button>
                        </div>
                      </div>

                      {/* E-book header */}
                      <div className="bg-[#2563EB] text-white rounded-2xl p-6 space-y-2 shadow-sm shadow-blue-200">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex gap-2 text-[10px] font-bold text-blue-200">
                            <span className="bg-white/10 px-2 py-1 rounded">{generatedEbook.estimatedPages}</span>
                            <span className="bg-white/10 px-2 py-1 rounded">{generatedEbook.wordCount}</span>
                            <span className="bg-white/10 px-2 py-1 rounded">{generatedEbook.chapters.length} capítulos</span>
                          </div>
                        </div>
                        <h2 className="text-xl font-display font-bold leading-snug">{generatedEbook.title}</h2>
                        <p className="text-blue-100 text-sm">{generatedEbook.subtitle}</p>
                      </div>

                      {/* Table of contents */}
                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Sumário
                        </h4>
                        <ol className="space-y-1.5">
                          {generatedEbook.tableOfContents.map((title, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-[#1F2937]">
                              <span className="text-[#2563EB] font-bold font-mono text-xs mt-0.5 w-5 shrink-0">{i + 1}.</span>
                              <span>{title}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Intro */}
                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Introdução</h4>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{generatedEbook.intro}</p>
                        <button
                          onClick={() => handleCopy(generatedEbook.intro, "intro")}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            copiedId === "intro"
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                              : "border-gray-200 text-gray-500 hover:border-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
                          }`}
                        >
                          {copiedId === "intro" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedId === "intro" ? "Copiado!" : "Copiar introdução"}
                        </button>
                      </div>

                      {/* Chapters */}
                      {generatedEbook.chapters.map((ch) => (
                        <div key={ch.number} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
                              {ch.number}
                            </span>
                            <h4 className="font-semibold text-[#1F2937]">{ch.title}</h4>
                          </div>

                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{ch.content}</p>

                          {/* Key points */}
                          <div className="pt-3 border-t border-gray-100 space-y-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Pontos-chave</span>
                            {ch.keyPoints.map((kp, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="w-4 h-4 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0 mt-0.5 text-[9px]">✓</span>
                                <span>{kp}</span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleCopy(ch.content, `ch-${ch.number}`)}
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                              copiedId === `ch-${ch.number}`
                                ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                                : "border-gray-200 text-gray-500 hover:border-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
                            }`}
                          >
                            {copiedId === `ch-${ch.number}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedId === `ch-${ch.number}` ? "Copiado!" : `Copiar Capítulo ${ch.number}`}
                          </button>
                        </div>
                      ))}

                      {/* Conclusion */}
                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Conclusão</h4>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{generatedEbook.conclusion}</p>
                        <button
                          onClick={() => handleCopy(generatedEbook.conclusion, "conclusion")}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            copiedId === "conclusion"
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                              : "border-gray-200 text-gray-500 hover:border-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
                          }`}
                        >
                          {copiedId === "conclusion" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedId === "conclusion" ? "Copiado!" : "Copiar conclusão"}
                        </button>
                      </div>

                      {/* CTA */}
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2">
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest block">Chamada para Ação Final</span>
                        <p className="text-sm text-[#1F2937] font-medium leading-relaxed">{generatedEbook.cta}</p>
                        <button
                          onClick={() => handleCopy(generatedEbook.cta, "cta")}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                            copiedId === "cta"
                              ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                              : "border-blue-200 text-[#2563EB] hover:bg-blue-100"
                          }`}
                        >
                          {copiedId === "cta" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedId === "cta" ? "Copiado!" : "Copiar CTA"}
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: ARSENAL DE IAS ─── */}
          {activeTab === "arsenal" && (
            <div className="space-y-6">

              <div>
                <h1 className="text-2xl font-display font-bold text-[#1F2937]">Arsenal de IAs Gratuitas</h1>
                <p className="text-gray-500 text-sm mt-1">
                  As melhores ferramentas gratuitas para turbinar o seu e-book — desde a capa até o marketing de vendas.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: `Todas (${freeAIs.length})` },
                    { id: "text", label: "Escrita & Textos" },
                    { id: "image", label: "Imagens" },
                    { id: "research", label: "Pesquisa" },
                    { id: "multimedia", label: "Áudio & Vídeo" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveCategory(id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                        activeCategory === id
                          ? "bg-[#2563EB] text-white border-[#2563EB]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-[#3B82F6] hover:text-[#2563EB]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute top-2.5 left-3.5" />
                  <input
                    type="text"
                    placeholder="Buscar IA..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm placeholder-gray-400 text-[#1F2937] focus:outline-none focus:border-[#2563EB] w-52 transition-all"
                  />
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAIs.map((ai, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4">

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#1F2937]">{ai.name}</h3>
                        <span className="text-[10px] bg-blue-50 text-[#2563EB] border border-blue-100 px-2.5 py-0.5 rounded-full font-bold uppercase">
                          {ai.badge}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">{ai.description}</p>

                      <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase block mb-0.5">✓ Superpoder</span>
                          <span className="text-xs text-gray-600">{ai.strength}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-rose-500 font-bold uppercase block mb-0.5">✗ Limitação</span>
                          <span className="text-xs text-gray-600">{ai.weakness}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600">
                        <strong className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Ideal para:</strong>
                        {ai.specialty}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Prompt inicial pronto para copiar:
                      </span>
                      <div className="p-3 bg-gray-50 border border-gray-200 border-l-2 border-l-[#3B82F6] rounded-xl font-mono text-[10px] text-gray-700 max-h-[80px] overflow-y-auto select-all leading-relaxed">
                        {ai.boilerplatePrompt}
                      </div>
                      <button
                        onClick={() => handleCopy(ai.boilerplatePrompt, `ai-${i}`)}
                        className={`w-full py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                          copiedId === `ai-${i}`
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-white text-[#2563EB] border-[#2563EB] hover:bg-blue-50"
                        }`}
                      >
                        {copiedId === `ai-${i}` ? (
                          <><Check className="w-3.5 h-3.5" /> Prompt Copiado!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copiar Prompt</>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ─── TAB: MONETIZE ─── */}
          {activeTab === "monetize" && (
            <div className="space-y-8">

              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <Star className="w-3 h-3" /> BÔNUS 2 EXCLUSIVO
                </div>
                <h1 className="text-2xl font-display font-bold text-[#1F2937]">O que fazer depois de gerar seu e-book?</h1>
                <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                  Você acabou de criar algo que pode gerar renda passiva. Aqui estão os 5 passos para transformar esse e-book num produto digital que vende enquanto você dorme.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-5">

                {/* PASSO 1 — FORMATAR */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">PASSO 1</span>
                          <h2 className="font-bold text-[#1F2937]">Formate o seu e-book</h2>
                        </div>
                        <p className="text-sm text-gray-500">Copie o conteúdo gerado e cole em uma das ferramentas abaixo para criar um PDF profissional.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-[#1F2937]">Google Docs</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">GRÁTIS</span>
                          </div>
                          <p className="text-xs text-gray-500">Cole o conteúdo, ajuste a fonte (Merriweather ou Georgia, 11pt), adicione margens de 2,5cm e exporte em <strong>Arquivo → Baixar → PDF</strong>.</p>
                          <p className="text-xs text-[#2563EB] font-medium">Dica: use a função "Sumário Automático" para o índice ficar navegável.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-[#1F2937]">Canva (template e-book)</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">GRÁTIS</span>
                          </div>
                          <p className="text-xs text-gray-500">No Canva, pesquise <strong>"ebook"</strong> nos templates. Escolha um modelo, cole o conteúdo nas caixas de texto e publique em PDF de alta qualidade.</p>
                          <p className="text-xs text-[#2563EB] font-medium">Dica: templates com fundo branco vendem mais — parecem mais profissionais.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PASSO 2 — CAPA */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <Palette className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">PASSO 2</span>
                          <h2 className="font-bold text-[#1F2937]">Crie uma capa que vende</h2>
                        </div>
                        <p className="text-sm text-gray-500">A capa é o primeiro contato do comprador com o produto. Precisa parecer profissional — e isso não precisa custar nada.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-[#1F2937]">Canva — Capa de E-book</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">GRÁTIS</span>
                          </div>
                          <p className="text-xs text-gray-500">Pesquise <strong>"capa de ebook"</strong> no Canva. Tamanho ideal: <strong>1600 × 2400 px</strong>. Coloque o título, subtítulo e seu nome. Exporte em PNG.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-[#1F2937]">Leonardo.ai — Capa com IA</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">GRÁTIS</span>
                          </div>
                          <p className="text-xs text-gray-500">Use esse prompt no Leonardo.ai para gerar um background impactante para sua capa:</p>
                          <div className="p-2 bg-white border border-gray-200 rounded-lg font-mono text-[10px] text-gray-600 leading-relaxed select-all">
                            Minimalist professional ebook cover background, [COR] gradient, geometric abstract shapes, clean modern design, high resolution, no text, 1600x2400px
                          </div>
                          <button
                            onClick={() => handleCopy("Minimalist professional ebook cover background, [COR] gradient, geometric abstract shapes, clean modern design, high resolution, no text, 1600x2400px", "capa-prompt")}
                            className={`w-full py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${copiedId === "capa-prompt" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-[#2563EB] border-[#2563EB] hover:bg-blue-50"}`}
                          >
                            {copiedId === "capa-prompt" ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar prompt</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PASSO 3 — PRECIFICAR */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">PASSO 3</span>
                          <h2 className="font-bold text-[#1F2937]">Precifique de forma estratégica</h2>
                        </div>
                        <p className="text-sm text-gray-500">Preço muito baixo desvaloriza. Preço muito alto trava as vendas. Veja o que funciona no mercado brasileiro.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-1">
                          <span className="text-2xl font-bold text-[#2563EB]">R$27</span>
                          <p className="text-xs font-semibold text-gray-600">Entrada / Validação</p>
                          <p className="text-xs text-gray-500">Ideal para o primeiro produto. Vende fácil e gera provas sociais rápido.</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center space-y-1 ring-2 ring-[#2563EB]">
                          <span className="text-2xl font-bold text-[#2563EB]">R$47–R$67</span>
                          <p className="text-xs font-semibold text-[#2563EB]">Recomendado</p>
                          <p className="text-xs text-gray-600">Ponto ideal: alta conversão + margem boa. Funciona para a maioria dos nichos.</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center space-y-1">
                          <span className="text-2xl font-bold text-gray-700">R$97+</span>
                          <p className="text-xs font-semibold text-gray-600">Premium / Autoridade</p>
                          <p className="text-xs text-gray-500">Para nichos como saúde, finanças e negócios, com bons depoimentos.</p>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
                        <strong>Dica de order bump:</strong> Adicione um complemento por R$17 a R$27 na página de pagamento (ex: "Pack de prompts bônus", "Checklist de aplicação", "Planilha de controle"). Isso pode aumentar o ticket médio em 30–40% sem esforço extra de divulgação.
                      </div>
                    </div>
                  </div>
                </div>

                {/* PASSO 4 — PUBLICAR */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">PASSO 4</span>
                          <h2 className="font-bold text-[#1F2937]">Publique e comece a vender</h2>
                        </div>
                        <p className="text-sm text-gray-500">Plataformas de infoprodutos entregam o PDF automaticamente ao comprador — você não precisa fazer nada manualmente.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { name: "Kiwify", badge: "Recomendada", color: "emerald", taxa: "Taxa: ~5,49% + R$1,00 por venda", desc: "A melhor para iniciantes no Brasil. Interface simples, pagamento em D+15, suporte em português.", url: "kiwify.com.br" },
                          { name: "Hotmart", badge: "Mais popular", color: "orange", taxa: "Taxa: ~9,9% por venda", desc: "Maior marketplace de infoprodutos da América Latina. Ótimo para alcançar afiliados que vendem por você.", url: "hotmart.com" },
                          { name: "Eduzz", badge: "Boa opção", color: "blue", taxa: "Taxa: ~8,9% por venda", desc: "Boa plataforma com sistema de afiliados forte e checkout customizável.", url: "eduzz.com" },
                          { name: "Gumroad", badge: "Internacional", color: "violet", taxa: "Taxa: ~10% por venda", desc: "Ideal para vender em dólar ou euro para audiência fora do Brasil. Ótimo para nichos em inglês.", url: "gumroad.com" },
                        ].map((p) => (
                          <div key={p.name} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm text-[#1F2937]">{p.name}</span>
                              <span className={`text-[10px] bg-${p.color}-50 text-${p.color}-600 border border-${p.color}-100 px-2 py-0.5 rounded-full font-bold`}>{p.badge}</span>
                            </div>
                            <p className="text-[10px] font-semibold text-gray-400">{p.taxa}</p>
                            <p className="text-xs text-gray-500">{p.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Como configurar na Kiwify (passo a passo):</p>
                        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                          <li>Crie sua conta grátis em <span className="text-[#2563EB] font-medium">kiwify.com.br</span></li>
                          <li>Clique em <strong>Novo Produto → Ebook/Material digital</strong></li>
                          <li>Faça upload do PDF da capa e do arquivo do e-book</li>
                          <li>Configure preço, nome e descrição do produto</li>
                          <li>Ative o checkout e copie o link de vendas</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PASSO 5 — DIVULGAR */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                      <Megaphone className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded">PASSO 5</span>
                          <h2 className="font-bold text-[#1F2937]">Divulgue sem gastar nada</h2>
                        </div>
                        <p className="text-sm text-gray-500">Você não precisa de anúncios pagos para começar. Canais orgânicos geram as primeiras vendas — e são gratuitos.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          {
                            canal: "Instagram — Carrossel",
                            cor: "pink",
                            prompt: `Crie um carrossel de 5 slides para Instagram sobre o tema "[TEMA DO SEU EBOOK]". Slide 1: título polêmico ou pergunta que gera curiosidade. Slides 2-4: uma dica prática por slide do conteúdo do e-book. Slide 5: CTA com o link de compra. Tom: informal e direto. Nicho: [NICHO].`,
                            dica: "Poste 3x por semana. O slide 1 define o alcance — teste títulos diferentes."
                          },
                          {
                            canal: "Pinterest — Pins Virais",
                            cor: "red",
                            prompt: `Crie 5 descrições de pins para Pinterest sobre "[TEMA DO SEU EBOOK]" otimizadas para buscas. Cada pin deve ter: título (max 100 chars com palavra-chave), descrição (max 500 chars com 3 palavras-chave) e chamada para ação clara. Nicho: [NICHO].`,
                            dica: "Pinterest tem vida longa — um pin pode gerar tráfego por meses ou anos."
                          },
                          {
                            canal: "WhatsApp — Grupos do Nicho",
                            cor: "green",
                            prompt: `Escreva uma mensagem curta e natural (máx 3 linhas) para compartilhar em grupos de WhatsApp do nicho [NICHO], apresentando o e-book sobre "[TEMA]". Não pode parecer spam — deve parecer uma recomendação sincera de quem está ajudando o grupo.`,
                            dica: "Entre nos grupos como membro ativo antes de divulgar. Entregue valor primeiro."
                          },
                          {
                            canal: "Comunidades — Reddit / Fóruns",
                            cor: "orange",
                            prompt: `Escreva um post longo e genuíno para um fórum sobre [NICHO], compartilhando um aprendizado real sobre "[TEMA DO EBOOK]". No final, mencione que compilou tudo isso num e-book gratuito/pago no link [LINK]. Tom: humano, sem exagero de vendas.`,
                            dica: "Posts que ensinam algo real antes de vender convertem 3-5x mais que puro anúncio."
                          },
                        ].map((c, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-[#1F2937]">{c.canal}</span>
                            </div>
                            <div className="p-2.5 bg-white border border-gray-200 rounded-lg font-mono text-[10px] text-gray-600 leading-relaxed max-h-24 overflow-y-auto select-all">
                              {c.prompt}
                            </div>
                            <button
                              onClick={() => handleCopy(c.prompt, `divulg-${i}`)}
                              className={`w-full py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${copiedId === `divulg-${i}` ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-[#2563EB] border-[#2563EB] hover:bg-blue-50"}`}
                            >
                              {copiedId === `divulg-${i}` ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar prompt</>}
                            </button>
                            <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 leading-relaxed">
                              💡 {c.dica}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* CTA Final */}
              <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-2xl p-6 text-white text-center space-y-3">
                <Rocket className="w-8 h-8 mx-auto opacity-80" />
                <h3 className="font-bold text-lg">Você tem tudo para começar agora.</h3>
                <p className="text-sm text-blue-100 max-w-md mx-auto">
                  E-book gerado ✓ &nbsp;·&nbsp; Formatação ✓ &nbsp;·&nbsp; Capa ✓ &nbsp;·&nbsp; Preço ✓ &nbsp;·&nbsp; Plataforma ✓ &nbsp;·&nbsp; Divulgação ✓
                </p>
                <p className="text-xs text-blue-200">
                  O único passo que falta é você clicar em publicar.
                </p>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
