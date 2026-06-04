import React, { useState } from "react";
import {
  Compass,
  Youtube,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  Terminal,
  Sliders,
  Sparkles,
  Calculator,
  Play,
  ArrowRight,
  Check,
  Copy,
  Plus,
  ChevronRight,
  Coins,
  Users,
  Search,
  Lock,
  ExternalLink,
  X,
  FileText,
  CheckCircle,
  TrendingUp,
  Flame,
  MousePointerClick,
  Layers3,
  HelpCircle
} from "lucide-react";
import { academyLessons } from "./lessonsData";
import { GeneratedRoadmap, Lesson, RoadmapStep } from "./types";

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    "masterclass" | "roadmap" | "arsenal" | "simulator" | "community"
  >("masterclass");

  // Lessons selection state
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(academyLessons[0]);
  const [activeLessonStep, setActiveLessonStep] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Form states for API Roadmap generator
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("infoproduto");
  const [experience, setExperience] = useState("Iniciante");
  const [workHours, setWorkHours] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);

  // Active custom prompt copy indicator
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Income Calculator States
  const [productPrice, setProductPrice] = useState(29.90);
  const [dailyTraffic, setDailyTraffic] = useState(500);
  const [conversionRate, setConversionRate] = useState(1.5); // in %

  // Desafio 24 Horas Checklist checklist state
  const [challengeTasks, setChallengeTasks] = useState([
    { id: "task-1", label: "Definir um nicho vencedor que combine paixão e demanda alta", completed: false },
    { id: "task-2", label: "Escolher e configurar 2 IAs gratuitas complementares", completed: false },
    { id: "task-3", label: "Gerar um Roadmap Personalizado usando o gerador abaixo", completed: false },
    { id: "task-4", label: "Criar uma conta gratuita na Kiwify ou Hotmart", completed: false },
    { id: "task-5", label: "Gerar um mega-prompt de vendas da aula de E-books e rodar no Claude.ai", completed: false },
    { id: "task-6", label: "Criar criativo estético no Canva em menos de 10 minutos", completed: false },
    { id: "task-7", label: "Publicar seu link de afiliado ou infoproduto nas redes e acompanhar métricas", completed: false },
  ]);

  // Certificação quiz state
  const [certName, setCertName] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [certUnlocked, setCertUnlocked] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  // Directory filter for IAs
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Static list of Free AIs with ready-to-use custom templates
  const freeAIs = [
    {
      name: "Claude.ai",
      description: "A IA com escrita mais humanizada do mundo.",
      specialty: "Artigos, roteiros profundos, e-books e copywriting magnético.",
      category: "text",
      badge: "Redação de Elite",
      strength: "Não deixa rastro de IA; vocabulário empático e refinado.",
      weakness: "Limite de mensagens no plano gratuito.",
      boilerplatePrompt: "Você é um Copywriter Sênior de lançamentos de 7 dígitos. Escreva um script de vendas de 3 minutos no estilo Storytelling para o produto de nicho [INSIRA O SEU NICHO]. Evite clichês vazios, use frustrações cotidianas do cliente ideal e termine com uma ancoragem de valor imperdível."
    },
    {
      name: "ChatGPT (GPT-4o mini)",
      description: "A ferramenta mais rápida e versátil de inteligência geral.",
      specialty: "SEO, estruturação de e-books, brainstorms, ideias e programação.",
      category: "text",
      badge: "Rapidez & SEO",
      strength: "Executa pautas complexas rapidamente, excelente para organizar dados.",
      weakness: "Escrita de textos longos tende a parecer robótica sem bons prompts.",
      boilerplatePrompt: "Aja como um especialista em SEO sênior. Crie 10 títulos altamente clicáveis de blog posts baseados nas melhores palavras-chave de baixa competição para o nicho de [NICHO]. Retorne também os respectivos metatags de descrição focados em conversão orgânica."
    },
    {
      name: "Google Gemini",
      description: "Incrível para pesquisas atuais com acesso real à Internet.",
      specialty: "Tendências de mercado, dados de concorrentes e referências científicas.",
      category: "research",
      badge: "Dados e Web",
      strength: "Integrado ao motor de busca do Google; traz as notícias mais recentes.",
      weakness: "Geração de textos longos pode ser resumida demais.",
      boilerplatePrompt: "Busque na internet de hoje: Quais os sub-nichos que mais cresceram em termos de infoprodutos e buscas no Brasil nos últimos 3 meses? Traga dados, percentuais de mercado estimados e as 3 maiores dores urgentes desses novos públicos."
    },
    {
      name: "Leonardo.ai",
      description: "Geração de imagens de cinema com créditos gratuitos diários.",
      specialty: "Capas de e-books, ilustrações realistas e avatares para canais dark.",
      category: "image",
      badge: "Design Ultra Real",
      strength: "Modelos ajustados para fotorrealismo e arte 3D impecável.",
      weakness: "Menu de opções pode parecer complexo no início.",
      boilerplatePrompt: "Stunning cinematic dramatic photo of [SUA DESCRIÇÃO], unreal engine 5 render, depth of field, sharp focus, volumetric lighting, epic colors, 16:9 ratio."
    },
    {
      name: "Microsoft Copilot / Bing",
      description: "Acesso gratuito ao gerador de imagens premium DALL-E 3 da OpenAI.",
      specialty: "Geração instantânea de criativos publicitários sob demanda.",
      category: "image",
      badge: "DALL-E 3 Grátis",
      strength: "Excelente renderização de textos escritos dentro das imagens.",
      weakness: "Pode demorar para renderizar em picos de tráfego.",
      boilerplatePrompt: "A flat aesthetic product photography vector illustration of a digital glowing laptop mockup, on top of clean wood desk, cozy dark ambient office workspace with green plants, modern high contrast vector graphic."
    },
    {
      name: "ElevenLabs",
      description: "A melhor locução por inteligência artificial do mercado.",
      specialty: "Vozes humanas perfeitas para vídeos sem aparecer (canal dark) e podcasts.",
      category: "audio",
      badge: "Voz Realista",
      strength: "Vozes contam com respiração, entonação emocional e ritmo dinâmico.",
      weakness: "Cota de 10.000 caracteres mensais gratuitos (renova todo mês).",
      boilerplatePrompt: "[Instrução interna da plataforma: Use tons maduros e confiáveis para narrar o roteiro abaixo com pausas teatrais curtas após revelações marcantes]."
    },
    {
      name: "CapCut Desktop",
      description: "Edição automatizada de vídeos curtos orientada por IA.",
      specialty: "Edição automática com legendas dinâmicas, cortes e transições prontas.",
      category: "video",
      badge: "Editor Viral",
      strength: "Criação ultra rápida de vídeos de alta retenção para TikTok e Instagram.",
      weakness: "Necessário download do app gratuito para computador ou celular.",
      boilerplatePrompt: "[Use o recurso de Redimensionamento Automático e Legendas Inteligentes por IA com animação animada de Pop-in colorido em amarelo e branco para maximizar a retenção]."
    },
    {
      name: "DeepSeek-V3",
      description: "Uma IA gratuita extremamente eficiente em raciocínio analítico.",
      specialty: "Pesquisas profundas de lógica corporativa e otimização financeira.",
      category: "research",
      badge: "Lógica Pura",
      strength: "Pensamento estruturado, econômico no uso de tokens e muito precisa.",
      weakness: "Disponibilidade oscila conforme demanda global elevada.",
      boilerplatePrompt: "Analise a estrutura de precificação descrita a seguir e proponha 3 estratégias de Upsell para infoprodutos de R$ 29,90 de forma que a margem média de compra passe a ser superior a R$ 60."
    }
  ];

  // Copy with animation state feedback
  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  // call local roadmap API server route using real code proxying
  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) {
      setErrorMsg("Por favor, preencha o seu nicho para continuarmos.");
      return;
    }
    setErrorMsg("");
    setIsGenerating(true);
    setGeneratedRoadmap(null);

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, goal, experience, workHours })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Houve uma falha na geração do seu plano de renda.");
      }

      const data = await response.json();
      setGeneratedRoadmap(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Não foi possível conectar com a IA. Certifique-se de que a GEMINI_API_KEY está configurada no painel de segredos do Studio AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Complete a Task checklist dynamically
  const toggleChallengeTask = (id: string) => {
    setChallengeTasks(
      challengeTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = challengeTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / challengeTasks.length) * 100);

  // Certificação validation logic
  const handleValidateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) {
      alert("Escreva o seu nome para o certificado!");
      return;
    }
    if (
      quizAnswers.q1 === "orquestracao" &&
      quizAnswers.q2 === "claude" &&
      quizAnswers.q3 === "baixo"
    ) {
      setCertUnlocked(true);
      setShowCertModal(true);
    } else {
      alert("Alguma resposta está errada! Estude as lições para responder corretamente.");
    }
  };

  // Slider conversions calculations
  const calculateEarnings = () => {
    const totalViews = dailyTraffic * 30; // 30 days
    const acquisitions = totalViews * (conversionRate / 100);
    const monthlyGross = acquisitions * productPrice;
    return {
      monthlyGross: monthlyGross.toFixed(2),
      acquisitions: Math.round(acquisitions),
      totalViews
    };
  };

  const simulatedEarnings = calculateEarnings();

  return (
    <div id="app-container" className="flex min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background glow overlay */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-950/10 bg-radial-gradient blur-[140px] pointer-events-none bg-ambient-glow" />

      {/* SIDEBAR CONTAINER */}
      <aside id="app-sidebar" className="sidebar w-[280px] bg-[#020617] border-r border-white/5 flex flex-col shrink-0 z-10 transition-all">
        {/* Brand & Concept */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="font-display font-extrabold text-xl tracking-tight text-white leading-none">
                Multi-IA
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1 tracking-wider uppercase font-semibold">
                AI Expert
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button
            id="nav-masterclass"
            onClick={() => setActiveTab("masterclass")}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "masterclass"
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Masterclass Multi-IA</span>
          </button>

          <button
            id="nav-roadmap"
            onClick={() => setActiveTab("roadmap")}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "roadmap"
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Terminal className="w-4 h-4 text-pink-400" />
            <span>Gerador de Roadmap</span>
            <span className="ml-auto text-[9px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
              AI Live
            </span>
          </button>

          <button
            id="nav-arsenal"
            onClick={() => setActiveTab("arsenal")}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "arsenal"
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Arsenal de IAs</span>
          </button>

          <button
            id="nav-simulator"
            onClick={() => setActiveTab("simulator")}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "simulator"
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Calculadora & Desafio</span>
          </button>

          <button
            id="nav-community"
            onClick={() => setActiveTab("community")}
            className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
              activeTab === "community"
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Certificado</span>
          </button>
        </nav>
      </aside>

      {/* CORE FRAME CONTAINER */}
      <main id="app-main-content" className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        {/* Navigation Breadcrumb & Premium User Badge */}
        <header className="header h-[80px] px-8 bg-[#090d1f]/40 backdrop-blur-lg border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-medium">Módulos</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-indigo-300 text-sm font-semibold capitalize font-mono">
              {activeTab === "masterclass" && "Masterclass Prática"}
              {activeTab === "roadmap" && "Gerador Estratégico AI"}
              {activeTab === "arsenal" && "Catálogo de Inteligências"}
              {activeTab === "simulator" && "Economia e Desafio 24h"}
              {activeTab === "community" && "Certificado de Conclusão"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="chip chip-green bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              ACESSO POR 1 ANO
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-500/30 flex items-center justify-center font-mono text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                IA
              </div>
            </div>
          </div>
        </header>

        {/* SUB CONTENT WRAPPERS */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          
          {/* TAB 1: MASTERCLASS MULTI-IA */}
          {activeTab === "masterclass" && (
            <div className="space-y-8">
              
              {/* Cover Banner */}
              <div className="p-8 bg-gradient-to-r from-slate-900 via-[#131730] to-slate-950 border border-indigo-500/10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 md:items-center shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px]" />
                
                <div className="flex-1 space-y-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#6366f1] font-bold uppercase bg-[#6366f1]/10 px-2.5 py-1 rounded inline-block">
                    A ESCOLA DE ORQUESTRADORES DE IA
                  </span>
                  <h1 className="text-3xl font-display font-extrabold text-white leading-tight">
                    Desmistificando a Monocultura de IAs
                  </h1>
                  <p className="text-slate-400 text-sm max-w-2xl">
                    Cada Inteligência tem um potencial único e gratuito. Nesta masterclass, você aprenderá a empilhar seus pontos mais fortes para gerar conteúdos profissionais em tempo recorde que se transformam em faturamentos astronômicos.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 shrink-0">
                  <div className="px-5 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-center min-w-[120px]">
                    <div className="text-[10px] text-indigo-300 uppercase font-mono font-bold tracking-wider">Status Módulos</div>
                    <div className="text-lg font-bold text-white mt-1">04 Aulas Ativas</div>
                  </div>
                </div>
              </div>

              {/* Grid: Lessons Index & Selected Lesson View */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Index Col */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-300 font-mono flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    ÍNDICE DA ACADEMIA
                  </h3>

                  <div className="space-y-3">
                    {academyLessons.map((lesson) => {
                      const isSelected = selectedLesson.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setActiveLessonStep(0);
                          }}
                          className={`group cursor-pointer p-5 rounded-2xl transition-all border duration-200 ${
                            isSelected
                              ? "bg-slate-900 border-[#6366f1] shadow-lg shadow-indigo-950/30"
                              : "bg-[#0b0f19] border-white/5 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded">
                              {lesson.categoryLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-auto font-mono">
                              {lesson.duration}
                            </span>
                          </div>
                          
                          <h4 className={`text-sm font-semibold transition-colors leading-snug ${
                            isSelected ? "text-[#6366f1]" : "text-white group-hover:text-slate-200"
                          }`}>
                            {lesson.title}
                          </h4>
                          
                          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                            {lesson.summary}
                          </p>
                          
                          <div className="mt-3 pt-3 border-t border-slate-800/50 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-mono">
                              Dificuldade: <span className={
                                lesson.difficulty === "Fácil" ? "text-emerald-400" :
                                lesson.difficulty === "Médio" ? "text-amber-400" : "text-rose-400"
                              }>{lesson.difficulty}</span>
                            </span>
                            <span className="text-xs text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                              Estudar <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Lesson Content View */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass p-6 md:p-8 bg-[#1e293b]/20 backdrop-blur-md rounded-3xl border border-white/10 space-y-6 shadow-2xl relative">
                    
                    {/* Header Details */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-[#6366f1] uppercase">
                          MÓDULO EXCLUSIVO DE ENGENHARia DE PROMPTS
                        </span>
                        <h2 className="text-2xl font-display font-extrabold text-white">
                          {selectedLesson.title}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-black/45 rounded-full text-xs font-mono text-slate-300">
                          ⏱️ {selectedLesson.duration}
                        </span>
                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-mono font-semibold">
                          {selectedLesson.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Lesson Core Text */}
                    <article className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
                      {selectedLesson.content}
                    </article>

                    {/* Visual Connection Diagram of Orchestration (Renders the "Sleek Layout Spec" chain of AI Nodes) */}
                    <div className="mt-8 p-6 bg-slate-950/80 rounded-2xl border border-white/5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">
                        Pipeline de Orquestração Recomendada para Esta Lição
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedLesson.stepByStep.map((step, idx) => (
                          <div key={idx} className="glass p-4 rounded-xl border border-white/5 bg-[#0f172a]/80 relative flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[11px] font-bold flex items-center justify-center font-mono">
                                  {idx + 1}
                                </span>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono font-semibold">
                                  {step.targetAI}
                                </span>
                              </div>
                              <h5 className="text-xs font-semibold text-white mb-2 leading-tight">
                                {step.instruction}
                              </h5>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedLesson(selectedLesson);
                                setActiveLessonStep(idx);
                                setTimeout(() => {
                                  document.getElementById("prompt-copier-container")?.scrollIntoView({ behavior: "smooth" });
                                }, 50);
                              }}
                              className="w-full mt-3 py-1.5 bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] cursor-pointer"
                            >
                              Ver Prompt Abaixo ⬇️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Copiar Prompt Card */}
                    <div id="prompt-copier-container" className="mt-8 p-6 rounded-2xl bg-gradient-to-b from-[#131730] to-[#0d1024] border border-[#6366f1]/20 space-y-4 scroll-mt-24">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-sm font-bold text-slate-100 font-mono uppercase">
                            Mega-Prompt Copiável: Passo {activeLessonStep + 1}
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono text-right">
                          Destino: <strong className="text-indigo-400">{selectedLesson.stepByStep[activeLessonStep]?.targetAI}</strong>
                        </span>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-xs text-emerald-300 min-h-[100px] overflow-x-auto select-all leading-relaxed whitespace-pre-wrap relative group">
                        {selectedLesson.stepByStep[activeLessonStep]?.practicalPrompt}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-slate-400 leading-normal max-w-sm">
                          💡 <strong>Como usar:</strong> Clique no botão ao lado para copiar, abra a respectiva ferramenta gratuita e forneça como seu comando inicial.
                        </p>
                        <button
                          onClick={() => handleCopyToClipboard(
                              selectedLesson.stepByStep[activeLessonStep]?.practicalPrompt || "",
                              `lesson-prompt-${activeLessonStep}`
                            )}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/10 transition-all shrink-0 active:scale-95 cursor-pointer"
                        >
                          {copiedPromptId === `lesson-prompt-${activeLessonStep}` ? (
                            <>
                              <Check className="w-4.5 h-4.5 text-emerald-300" />
                              Copiado Prático!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4.5 h-4.5" />
                              Copiar Prompt
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: GERADOR DE ROADMAP AI */}
          {activeTab === "roadmap" && (
            <div className="space-y-8">
              
              <div className="p-8 bg-gradient-to-r from-[#020617] via-[#0b0f19] to-[#020617] border border-white/5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-[90px] pointer-events-none" />
                <div className="max-w-3xl space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-pink-400 font-bold uppercase bg-pink-500/10 px-2 py-0.5 rounded">
                    INTELIGÊNCIA EM TEMPO REAL
                  </span>
                  <h1 className="text-3xl font-display font-extrabold text-white leading-tight">
                    Gerador de Roadmap Multi-IA
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Preencha os dados do seu plano para orquestrar Inteligências Artificiais Gratuitas do seu jeito. Nossa IA gerará uma estratégia detalhada e prontamente escalável no Kiwify / Hotmart, contendo mega-prompts específicos adaptados para o seu projeto.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inputs Pane */}
                <div className="lg:col-span-4 glass p-6 bg-[#111827]/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col justify-between">
                  
                  <form onSubmit={handleGenerateRoadmap} className="space-y-5">
                    <h3 className="font-mono text-sm font-semibold text-slate-200 tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-pink-400" />
                      DADOS DO PROJETO
                    </h3>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Seu Nicho de Mercado
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Emagrecimento para Mães, SQL para Iniciantes, Dropshipping..."
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full bg-[#030611] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Objetivo de Faturamento / Formato
                      </label>
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full bg-[#030611] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-all font-sans"
                      >
                        <option value="e-book em Plataforma">Venda de E-book Premium (R$ 19 - R$ 97)</option>
                        <option value="Curso Rápido Multi-Módulos Hotmart">Mini-Curso Rápido na Hotmart (R$ 47 - R$ 97)</option>
                        <option value="Vídeo Reels/TikTok Dark Sem Aparecer">Coprodução de Canal Dark Viral (Reels/TikTok/Shorts)</option>
                        <option value="Freelancer Sênior de Artigos/SEO">Agência de Freelancer Multi-IA de Rápida Resolução</option>
                        <option value="Agência de Copywriting sob Demanda">Prestação de Copywriting e Postagens no Instagram</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Nível de Experiência Prática
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Iniciante", "Intermediário", "Hardcore"].map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setExperience(lvl)}
                            className={`py-2 text-xs font-semibold rounded-lg transition-all border ${
                              experience === lvl
                                ? "bg-indigo-600/20 text-white border-indigo-500"
                                : "bg-[#030611]/80 text-slate-400 border-white/5 hover:border-slate-800"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-300">
                        <span>Horas de dedicação por Dia</span>
                        <strong className="text-indigo-400 font-mono">{workHours} horas</strong>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={workHours}
                        onChange={(e) => setWorkHours(Number(e.target.value))}
                        className="w-full accent-indigo-500 bg-slate-800 h-1 rounded"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-xl shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Orquestrando IAs...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Gerar Plano de Renda</span>
                        </>
                      )}
                    </button>
                    
                    {errorMsg && (
                      <div className="p-3.5 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-xl text-xs flex flex-col gap-1 inline-block">
                        <span className="font-bold">⚠️ Erro na Geração:</span>
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </form>

                  <div className="mt-8 pt-5 border-t border-white/5 space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">
                      REQUISITO DE PRODUÇÃO
                    </span>
                    <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 flex gap-3 text-xs leading-relaxed text-slate-400">
                      <HelpCircle className="w-8 h-8 text-[#6366f1] shrink-0" />
                      <div>
                        A API utiliza o modelo <strong>Gemini 3.5 Flash</strong> em modo estruturado para retornar dados de processos de escala prontos para copiar.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Output Roadmap Pane / Placholder / Loading spinner (8 columns width) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {!generatedRoadmap ? (
                    !isGenerating ? (
                      <div id="roadmap-placeholder" className="p-12 bg-slate-950/40 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 min-h-[450px]">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600/15 flex items-center justify-center text-indigo-400 shadow-xl border border-indigo-500/20">
                          <Terminal className="w-8 h-8" />
                        </div>
                        <div className="space-y-1 max-w-md">
                          <h3 className="text-lg font-bold text-white">Seu Plano customizado aparecerá aqui</h3>
                          <p className="text-slate-400 text-xs">
                            Configure o nicho de seu projeto e as suas preferências ao lado para fazer com que as Inteligências Artificiais modelem seu infoproduto de forma complementar.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div id="roadmap-generating" className="p-12 bg-slate-950/40 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center gap-6 min-h-[450px]">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                          <div className="w-10 h-10 rounded-full bg-slate-900 absolute top-5 left-5 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-2 max-w-sm">
                          <h3 className="text-lg font-bold text-white animate-pulse">Sintetizando Conhecimento...</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            Nossos servidores estão consultando o modelo de orquestração gratuita para desenhar os mega-prompts adaptados ao seu nicho de mercado.
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    /* ROADMAP RENDERING once generated */
                    <div id="roadmap-generated-results" className="space-y-8 animate-fade-in">
                  
                  {/* Action banner to recreate / adjust */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#111827]/60 border border-[#6366f1]/20 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-[#6366f1] border border-indigo-500/20">
                        <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-semibold">Parabéns! Seu Plano Especializado está pronto.</p>
                        <p className="text-[10px] text-slate-400 font-mono">Totalmente personalizado para o seu objetivo e nível de experiência.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setGeneratedRoadmap(null)}
                      className="px-4 py-2 bg-pink-500/10 hover:bg-pink-500/25 text-pink-300 border border-pink-500/20 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Gerar Novo / Ajustar Dados</span>
                    </button>
                  </div>

                  {/* Blueprint Header info (Full Screen Width) */}
                  <div className="glass p-6 md:p-8 bg-gradient-to-tr from-[#131730] to-slate-950 rounded-2xl border border-indigo-500/20 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#6366f1]">
                          ESTEIRA DE INTELIGÊNCIA ESPECIALIZADA
                        </span>
                        <h2 className="text-2xl font-display font-extrabold text-white">
                          {generatedRoadmap.title}
                        </h2>
                      </div>
                      
                      <div className="flex gap-2.5">
                        <span className="px-3.5 py-1.5 bg-black/45 rounded-xl text-xs font-mono text-emerald-400 font-bold border border-emerald-500/15">
                          POTENCIAL ESTIMADO: {generatedRoadmap.estimatedDailyIncome}
                        </span>
                        <span className="px-3.5 py-1.5 bg-black/45 rounded-xl text-xs font-mono text-slate-300 font-semibold border border-white/5">
                          Complexidade: <strong className="text-indigo-300">{generatedRoadmap.complexity}</strong>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedRoadmap.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 self-center mr-1">IAs gratuitas orquestradas neste plano:</span>
                      {generatedRoadmap.toolsUsed.map((tool, idx) => (
                        <span key={idx} className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Steps with MegaPrompts (Full width detailed 2-column grid!) */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">
                      PASSOS DA ESTEIRA DIGITAL PREVISTA
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {generatedRoadmap.steps.map((step, idx) => (
                        <div key={idx} className="p-6 bg-slate-900 border border-white/5 rounded-2xl space-y-4 flex flex-col justify-between">
                          
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-mono text-sm font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <h4 className="text-sm font-bold text-white font-display">
                                {step.phase}
                              </h4>
                              <span className="ml-auto text-[10px] bg-[#030611] px-2.5 py-0.5 text-pink-300 border border-pink-500/10 rounded-full font-mono">
                                Ferramenta: <strong className="text-white">{step.aiTool}</strong>
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {step.description}
                            </p>

                            {/* Ready Prompts with copying capability */}
                            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                                  Mega-Prompt Adaptado (Passo {idx + 1})
                                </span>
                                <span className="text-[10px] text-pink-300 font-mono">{step.aiTool}</span>
                              </div>
                              
                              <p className="font-mono text-[10px] text-emerald-300 whitespace-pre-wrap select-all bg-black/40 p-3 rounded-lg border border-white/5 leading-relaxed overflow-y-auto max-h-[140px]">
                                {step.megaPrompt}
                              </p>

                              <div className="mt-3 flex justify-between items-center pr-1 h-8">
                                <span className="text-[9px] text-slate-500 italic max-w-xs leading-normal">
                                  *Cole diretamente nesta IA para colher resultados impecáveis.
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyToClipboard(step.megaPrompt, `api-prompt-${idx}`)}
                                  className="px-3 py-1.5 bg-[#6366f1]/20 hover:bg-[#6366f1] text-[#6366f1] hover:text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all outline-none cursor-pointer active:scale-95"
                                >
                                  {copiedPromptId === `api-prompt-${idx}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      Copiado!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      Copiar prompt adaptado
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-indigo-500/5 rounded-xl border border-white/5 flex gap-2 text-xs text-indigo-400 mt-4 self-stretch">
                            <span className="font-bold text-indigo-400 font-mono shrink-0">💡 SUPER DICA:</span>
                            <span className="italic">{step.proTip}</span>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* monetization and platform Strategy detail (Full width) */}
                  <div className="p-6 bg-gradient-to-r from-indigo-950/20 to-slate-950 border border-indigo-500/10 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-indigo-400" />
                      <h4 className="text-md font-bold text-white font-display">Estratégia de Escala & Precificação</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">Criação & Cadastro</span>
                        <p className="text-xs text-white font-semibold leading-relaxed">
                          {generatedRoadmap.monetizationStrategy.platform}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">Como Cobrar / Preço</span>
                        <p className="text-xs text-white font-semibold leading-relaxed">
                          {generatedRoadmap.monetizationStrategy.pricingStrategy}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">Escala Automática</span>
                        <p className="text-xs text-white font-semibold leading-relaxed">
                          {generatedRoadmap.monetizationStrategy.scalingPlan}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

            </div>
          )}

          {/* TAB 3: ARSENAL DE IAS GRATUITAS */}
          {activeTab === "arsenal" && (
            <div className="space-y-8">
              
              <div className="p-8 bg-gradient-to-r from-slate-900 to-slate-950 border border-white/5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-[80px]" />
                <div className="max-w-2xl space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase bg-cyan-500/10 px-2 py-0.5 rounded">
                    CONHECIMENTO DE ARSENAL
                  </span>
                  <h1 className="text-3xl font-display font-extrabold text-white leading-tight">
                    Catálogo de Inteligências Livres
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Descubra os pontos fortes e limitações de cada inteligência gratuita atual. Nunca mais pague por uma assinatura mensal se você pode obter resultados impecavelmente equivalentes sabendo orquestrar os recursos gratuitos.
                  </p>
                </div>
              </div>

              {/* Filters Area */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      activeCategory === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    Todas ({freeAIs.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory("text")}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      activeCategory === "text"
                        ? "bg-[#6366f1] text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    Escrita & Textos
                  </button>
                  <button
                    onClick={() => setActiveCategory("image")}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      activeCategory === "image"
                        ? "bg-[#6366f1] text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    Geração de Imagem
                  </button>
                  <button
                    onClick={() => setActiveCategory("research")}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      activeCategory === "research"
                        ? "bg-[#6366f1] text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    Pesquisa & Analytics
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory("multimedia");
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                      activeCategory === "multimedia"
                        ? "bg-[#6366f1] text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    Áudio-Vídeo / Locução
                  </button>
                </div>

                {/* Live Search */}
                <div className="relative w-full max-w-xs">
                  <Search className="w-4 h-4 text-slate-500 absolute top-3.5 left-4" />
                  <input
                    type="text"
                    placeholder="Filtrar IAs por nome ou nicho..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-sm placeholder-slate-500 text-white focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
              </div>

              {/* Grid with cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {freeAIs
                  .filter((ai) => {
                    if (activeCategory === "all") return true;
                    if (activeCategory === "text" && ai.category === "text") return true;
                    if (activeCategory === "image" && ai.category === "image") return true;
                    if (activeCategory === "research" && ai.category === "research") return true;
                    if (activeCategory === "multimedia" && (ai.category === "audio" || ai.category === "video")) return true;
                    return false;
                  })
                  .filter((ai) => {
                    const combinedText = (ai.name + " " + ai.description + " " + ai.specialty).toLowerCase();
                    return combinedText.includes(searchQuery.toLowerCase());
                  })
                  .map((ai, index) => (
                    <div key={index} className="p-6 bg-slate-900 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                            {ai.name}
                          </h3>
                          <span className="text-[10px] bg-[#6366f1]/10 text-[#6366f1] px-2.5 py-0.5 border border-[#6366f1]/20 rounded-full font-mono font-bold uppercase">
                            {ai.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {ai.description}
                        </p>

                        <div className="pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-emerald-400 font-mono uppercase block mb-0.5">MAIOR SUPERPODER:</span>
                            <span className="text-xs text-slate-400">{ai.strength}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-rose-400 font-mono uppercase block mb-0.5">FRAQUEZA GRATUITA:</span>
                            <span className="text-xs text-slate-400">{ai.weakness}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-slate-300">
                          <strong className="block text-[10px] text-slate-500 font-mono uppercase mb-1">ESPECIALIDADE DO PRODUTOR:</strong>
                          {ai.specialty}
                        </div>
                      </div>

                      <div className="pt-3 space-y-3">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                          COMANDO COP-PASTE INICIAL PARA ESTA IA:
                        </span>
                        
                        <div className="p-3 bg-slate-950 font-mono text-[10px] text-emerald-300 rounded-lg max-h-[85px] overflow-y-auto select-all border border-slate-900 border-l-2 border-l-indigo-500">
                          {ai.boilerplatePrompt}
                        </div>

                        <button
                          onClick={() => handleCopyToClipboard(ai.boilerplatePrompt, `boilerplate-${index}`)}
                          className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600 hover:text-white text-indigo-400 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-indigo-500/10"
                        >
                          {copiedPromptId === `boilerplate-${index}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Prompt de Comando Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copiar Prompt de Boas-vindas
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* TAB 4: CALCULADORA DE ECONOMIA & DESAFIO 24 HORAS */}
          {activeTab === "simulator" && (
            <div className="space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Sliders and pricing predictions (highly valuable user tool for resale on digital course) */}
                <div className="glass p-6 md:p-8 bg-[#1e293b]/20 backdrop-blur-md rounded-3xl border border-white/10 space-y-6">
                  
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#6366f1] font-bold uppercase bg-[#6366f1]/10 px-2 py-0.5 rounded inline-block mb-2">
                      PLANEJADOR ESTRATÉGICO DE ENTRADA
                    </span>
                    <h2 className="text-2xl font-display font-extrabold text-white">
                      Simulador de Ganhos Digitais
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Calcule de forma empírica o volume de visitas e o ticket médio que você precisa no Kiwify ou Hotmart para atingir a sua autonomia financeira vendendo o infoproduto montado com IAs gratuitas.
                    </p>
                  </div>

                  {/* Pricing slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">Valor Unitário do Infoproduto (R$)</span>
                      <strong className="text-indigo-400 text-sm font-mono">R$ {productPrice.toFixed(2)}</strong>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="range"
                        min="19.90"
                        max="97.00"
                        step="1"
                        value={productPrice}
                        onChange={(e) => setProductPrice(Number(e.target.value))}
                        className="flex-1 accent-indigo-500 bg-slate-800 h-1.5 rounded"
                      />
                      <div className="flex gap-1.5 shrink-0">
                        {[29.90, 47.00, 97.00].map((val) => (
                          <button
                            key={val}
                            onClick={() => setProductPrice(val)}
                            className="bg-black/30 border border-white/5 hover:border-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded"
                          >
                            R$ {val.toFixed(0)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Traffic slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">Tráfego de Visitas Diárias (Orgânico + Reels/Dark)</span>
                      <strong className="text-[#6366f1] text-sm font-mono">{dailyTraffic} visualizações/dia</strong>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="50"
                      value={dailyTraffic}
                      onChange={(e) => setDailyTraffic(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>100 visitas (Baixo)</span>
                      <span>1.500 visitas (Normal)</span>
                      <span>5.000 visitas (Elite)</span>
                    </div>
                  </div>

                  {/* Conversion rate slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">Taxa de Conversão da Página de Vendas (%)</span>
                      <strong className="text-emerald-400 text-sm font-mono">{conversionRate}% de conversão</strong>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0.5% (E-book básico)</span>
                      <span>1.5% (Médio com VSL de roteiro Claude)</span>
                      <span>5.0% (Alto Tráfego Orgânico quente)</span>
                    </div>
                  </div>

                  {/* Live conversion calculations card */}
                  <div className="p-6 bg-slate-950/80 rounded-2xl border border-white/5 space-y-4">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">
                      RESULTADO DA ENGENHARIA DE FUNIL (Mensal)
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 bg-slate-900 rounded-xl text-center">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Total Visitas</span>
                        <div className="text-lg font-extrabold text-white mt-1">
                          {(simulatedEarnings.totalViews).toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl text-center">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Vendas Pagas</span>
                        <div className="text-lg font-extrabold text-[#6366f1] mt-1">
                          {simulatedEarnings.acquisitions}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl text-center border border-emerald-500/10">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono text-emerald-400">Total Faturado</span>
                        <div className="text-lg font-extrabold text-emerald-400 mt-1 font-mono">
                          R$ {Number(simulatedEarnings.monthlyGross).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic text-center mt-2 leading-relaxed">
                      💡 <strong>A mestre do Funil:</strong> Com apenas <strong>{simulatedEarnings.acquisitions} compras</strong> mensais de R$ {productPrice.toFixed(2)} usando um produto criado em 1h na Masterclass, você consegue colocar no seu bolso livre um salário de <strong>R$ {Number(simulatedEarnings.monthlyGross).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mês</strong>.
                    </p>
                  </div>

                </div>

                {/* Challenge 24 Hours Checklist checklist */}
                <div className="glass p-6 md:p-8 bg-gradient-to-br from-slate-950 to-[#121330] rounded-3xl border border-indigo-500/10 space-y-6 flex flex-col justify-between">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                      GAMIFICAÇÃO DE RESULTADOS
                    </span>
                    <h2 className="text-2xl font-display font-extrabold text-white">
                      Desafio Digital 24 Horas
                    </h2>
                    <p className="text-xs text-slate-400">
                      Corte o blá-blá-blá teórico. Siga o roteiro pragmático abaixo, marque cada item como completo e desbloqueie o Certificado profissional de monetização no menu de Certificação.
                    </p>
                  </div>

                  {/* Checklist wrapper */}
                  <div className="space-y-3 py-3">
                    {challengeTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleChallengeTask(task.id)}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition-all ${
                          task.completed
                            ? "bg-slate-900/60 border-emerald-500/20 text-slate-400"
                            : "bg-[#0b0f19] border-white/5 hover:border-slate-800 text-white"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          task.completed
                            ? "bg-emerald-500 border-emerald-500 text-black"
                            : "border-slate-700"
                        }`}>
                          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className="text-xs leading-relaxed font-semibold">
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold font-mono">STATUS DO DESAFIO:</span>
                      <strong className="text-indigo-400">{completedCount} de {challengeTasks.length} concluídos</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-[#6366f1] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 5: CERTIFICADO */}
          {activeTab === "community" && (
            <div className="space-y-8">
              
              <div className="max-w-3xl mx-auto">
                
                {/* Professional Masterclass Certification validation (massive value lever!) */}
                <div className="glass p-6 md:p-8 bg-[#111827]/30 backdrop-blur-md rounded-3xl border border-white/10 space-y-6">
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <h2 className="text-2xl font-display font-extrabold text-white">
                        Certificação Multiclasse AI
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Comprove e valide o seu conhecimento de orquestração técnica respondendo ao nosso quiz de 3 questões com base no que foi ensinado nas lições gratuitas.
                    </p>
                  </div>

                  <form onSubmit={handleValidateCertificate} className="space-y-4">
                    
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Nome Completo para Chapa do Diploma
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Insira seu nome do jeito que quer no certificado..."
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="w-full bg-[#030611] border border-white/5 rounded-xl px-4 py-3 text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* Question 1 */}
                    <div className="p-4 bg-slate-900 border border-white/5 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-indigo-400 block font-semibold uppercase">
                        QUESTÃO 1:
                      </span>
                      <p className="text-xs text-white font-semibold">
                        Qual técnica corrige o erro de fazer tudo no mesmo chat, com um único modelo pago e pesado?
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1.5">
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q1"
                            value="orquestracao"
                            checked={quizAnswers.q1 === "orquestracao"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q1: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>Orquestração de IAs</span>
                        </label>
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q1"
                            value="copia"
                            checked={quizAnswers.q1 === "copia"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q1: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>Copiar e colar genérico</span>
                        </label>
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="p-4 bg-slate-900 border border-white/5 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-indigo-400 block font-semibold uppercase">
                        QUESTÃO 2:
                      </span>
                      <p className="text-xs text-white font-semibold">
                        Qual IA gratuita é recomendada especificamente para redações humanizadas e storytelling delicado?
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1.5">
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q2"
                            value="claude"
                            checked={quizAnswers.q2 === "claude"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q2: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>Claude.ai (Gratuito)</span>
                        </label>
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q2"
                            value="chatgpt"
                            checked={quizAnswers.q2 === "chatgpt"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q2: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>ChatGPT básico padrão</span>
                        </label>
                      </div>
                    </div>

                    {/* Question 3 */}
                    <div className="p-4 bg-slate-900 border border-white/5 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-indigo-400 block font-semibold uppercase">
                        QUESTÃO 3:
                      </span>
                      <p className="text-xs text-white font-semibold">
                        Qual a faixa de preço unitário mais indicada para vender e-books rápidos com as taxas de impulso no Kiwify?
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1.5">
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q3"
                            value="baixo"
                            checked={quizAnswers.q3 === "baixo"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q3: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>Baixo valor (R$ 19 a R$ 47)</span>
                        </label>
                        <label className="p-2.5 bg-black/45 rounded-lg border border-white/5 flex items-center gap-2 cursor-pointer text-xs hover:border-slate-700">
                          <input
                            type="radio"
                            name="q3"
                            value="alto"
                            checked={quizAnswers.q3 === "alto"}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, q3: e.target.value })}
                            className="accent-indigo-500"
                          />
                          <span>Alto valor (R$ 997+)</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      🛠️ Testar Respostas e Desbloquear Certificado
                    </button>

                  </form>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Certificate Downloadable / Print view modal wrapper */}
        {showCertModal && certUnlocked && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 transition-all">
            <div className="w-full max-w-3xl bg-slate-950 border border-yellow-500/30 p-8 rounded-3xl relative space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-amber-500 via-yellow-300 to-[#6366f1]" />
              
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/5 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate visual body canvas */}
              <div className="p-10 border-4 border-double border-yellow-500/20 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />
                
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/30">
                    <Award className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-yellow-400 font-bold">
                    CERTIFICADO DE ORQUESTRADOR MULTI-IA
                  </span>
                  <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
                    Membro de Autonomia e Renda Multi-IA
                  </h1>
                </div>

                <p className="text-slate-400 text-xs italic font-mono max-w-lg mx-auto">
                  Certificamos para os devidos fins de validade e capacitação profissional em negócios digitais que o estudante e produtor licenciado
                </p>

                <h3 className="text-2xl font-display font-bold text-white tracking-normal font-mono uppercase underline decoration-indigo-500 decoration-2 underline-offset-8">
                  {certName || "NOME DO MEMBRO SÊNIOR"}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed max-w-lg mx-auto">
                  completou a totalidade dos módulos práticos, dominando as orquestrações de ChatGPT, Claude.ai, Google Gemini, Leonardo.ai e CapCut, capacitando-se técnica e comercialmente para escalar infoprodutos e canais dark com faturamentos periódicos nas plataformas Kiwify e Hotmart.
                </p>

                <div className="pt-8 grid grid-cols-2 gap-4 max-w-md mx-auto text-center border-t border-white/5 text-[10px] text-slate-500 font-mono">
                  <div>
                    <div className="text-slate-400 font-bold uppercase">Multi-IA Class Group</div>
                    <div className="mt-1">Assinatura Digital de Autoridade</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-bold uppercase">STATUS DO REGISTRO</div>
                    <div className="mt-1 text-emerald-400">● ATIVO E VERIFICADO NA CLOUD</div>
                  </div>
                </div>

              </div>

              {/* Download / Print instructions */}
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  💡 <strong>Dica de Vendas:</strong> Tire print deste certificado e adicione como prova social no checkout ou página do seu curso e-book!
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all w-full md:w-auto"
                >
                  Confirmar Impressão / PDF
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
