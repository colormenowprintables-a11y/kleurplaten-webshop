import rawStories from './stories.json';

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string; // Volledige verhaaltekst met nette alinea's
  lang?: 'nl' | 'en';
  featured?: boolean;
  popular?: boolean;
  fbIntro?: string;
  fbComments?: string[];
}

export interface StoryCategory {
  id: string;
  nl: string;
  en: string;
  icon?: string;
}

export const STORY_CATEGORIES: StoryCategory[] = [
  { id: 'all', nl: 'Alle Verhalen', en: 'All Stories', icon: '📖' },
  { id: 'liefde-relaties', nl: 'Liefde & Relaties', en: 'Love & Relationships', icon: '❤️' },
  { id: 'overspel-geheimen', nl: 'Overspel & Geheimen', en: 'Secrets & Betrayal', icon: '🤫' },
  { id: 'familie-drama', nl: 'Familie & Drama', en: 'Family & Drama', icon: '🏡' },
  { id: 'mysterie-spanning', nl: 'Mysterie & Spanning', en: 'Mystery & Suspense', icon: '🔍' },
  { id: 'verrassende-ontmoetingen', nl: 'Verrassende Ontmoetingen', en: 'Unexpected Encounters', icon: '✨' },
  { id: 'emotionele-verhalen', nl: 'Emotionele Verhalen', en: 'Emotional Stories', icon: '🥺' },
  { id: 'levensverhalen', nl: 'Levensverhalen', en: 'Life Stories', icon: '🌿' },
  { id: 'onverwachte-wendingen', nl: 'Onverwachte Wendingen', en: 'Plot Twists', icon: '⚡' },
];

export const publishedStories: Record<'nl' | 'en', Story[]> = (rawStories as any) || { nl: [], en: [] };

export function getRelatedStories(currentSlug: string, category: string, lang: 'nl' | 'en' = 'nl', limit = 3): Story[] {
  const stories = publishedStories[lang] || publishedStories.nl || [];
  return stories
    .filter(s => s.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, limit);
}
