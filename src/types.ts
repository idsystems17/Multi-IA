export interface Lesson {
  id: string;
  title: string;
  category: "fundamentos" | "youtube_dark" | "ebooks" | "freelance";
  categoryLabel: string;
  duration: string;
  difficulty: "Fácil" | "Médio" | "Avançado";
  summary: string;
  iconName: string;
  content: string; // Markdown or structured rich text
  stepByStep: {
    instruction: string;
    targetAI: string;
    practicalPrompt: string;
  }[];
}

export interface RoadmapStep {
  phase: string;
  aiTool: string;
  description: string;
  megaPrompt: string;
  proTip: string;
}

export interface GeneratedRoadmap {
  title: string;
  summary: string;
  estimatedDailyIncome: string;
  complexity: string;
  toolsUsed: string[];
  steps: RoadmapStep[];
  monetizationStrategy: {
    platform: string;
    pricingStrategy: string;
    scalingPlan: string;
  };
}

export interface IncomeGoal {
  niche: string;
  goal: string;
  experience: string;
  workHours: number;
}

export interface SavedPlan {
  id: string;
  title: string;
  date: string;
  incomeTarget: string;
  roadmap: GeneratedRoadmap;
}
