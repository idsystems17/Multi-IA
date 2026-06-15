export interface EbookChapter {
  number: number;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface GeneratedEbook {
  title: string;
  subtitle: string;
  intro: string;
  tableOfContents: string[];
  chapters: EbookChapter[];
  conclusion: string;
  cta: string;
  estimatedPages: string;
  wordCount: string;
}
