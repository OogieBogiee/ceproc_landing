import { es, type SiteContent } from './es';

const languages = { es } as const;

export type Lang = keyof typeof languages;

const content: Record<Lang, SiteContent> = { es };

export const getContent = (lang: Lang): SiteContent => content[lang];
