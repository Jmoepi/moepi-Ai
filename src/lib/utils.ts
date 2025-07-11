import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const KEYWORD_TAG_MAP: Record<string, string> = {
  'react': 'React',
  'next.js': 'Next.js',
  'nextjs': 'Next.js',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'firebase': 'Firebase',
  'ai': 'AI',
  'genkit': 'Genkit',
  'openai': 'OpenAI',
  'vercel': 'Vercel',
  'node.js': 'Node.js',
  'nodejs': 'Node.js',
};

export function generateTags(content: string, topics: string[]): string[] {
  const contentTags = new Set<string>();
  const lowerCaseContent = content.toLowerCase();

  for (const keyword in KEYWORD_TAG_MAP) {
    if (lowerCaseContent.includes(keyword)) {
      contentTags.add(KEYWORD_TAG_MAP[keyword]);
    }
  }

  const topicTags = topics.map(topic => {
    const formattedTopic = topic.replace(/-/g, ' ');
    return formattedTopic.charAt(0).toUpperCase() + formattedTopic.slice(1);
  });
  
  const combinedTags = new Set([...contentTags, ...topicTags]);

  return Array.from(combinedTags);
}
