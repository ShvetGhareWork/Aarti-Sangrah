import deitiesData from '../data/deities.json';
import aartisData from '../data/aartis.json';
import { Aarti, Deity, Language } from '../types';
import { translations } from './i18n';

export const deities: Deity[] = deitiesData || [];
export const aartis: Aarti[] = aartisData || [];

export const getDeityById = (id: string): Deity | undefined => {
  if (!id) return undefined;
  return deities.find((d) => d && d.id === id);
};

export const getAartiById = (id: string): Aarti | undefined => {
  if (!id) return undefined;
  return aartis.find((a) => a && a.id === id);
};

export const getAartisByDeityId = (deityId: string): Aarti[] => {
  if (!deityId) return [];
  return aartis.filter((a) => a && a.deityId === deityId);
};

export const getFeaturedAartis = (): Aarti[] => {
  const featuredIds = [
    'ganesh-aarti-1',
    'vitthal-aarti-1',
    'shankar-aarti-1',
    'durga-aarti',
    'pasaydan-aarti',
    'krishna-aarti-1',
    'ram-aarti-1',
    'sainath-aarti'
  ];
  return aartis.filter((a) => a && featuredIds.includes(a.id));
};

export const searchAartisAndDeities = (query: string, lang: Language = 'mr') => {
  const cleanQuery = (query || '').trim().toLowerCase();
  if (!cleanQuery) return { aartis: [], deities: [] };

  const matchedDeities = deities.filter((d) => {
    if (!d) return false;
    const nameMatch = d.name ? d.name.toLowerCase().includes(cleanQuery) : false;
    const nameEnMatch = d.nameEn ? d.nameEn.toLowerCase().includes(cleanQuery) : false;
    return nameMatch || nameEnMatch;
  });

  const matchedAartis = aartis.filter((a) => {
    if (!a) return false;
    const titleMatch = a.title ? a.title.toLowerCase().includes(cleanQuery) : false;
    const titleEnMatch = a.titleEn ? a.titleEn.toLowerCase().includes(cleanQuery) : false;

    const deity = getDeityById(a.deityId);
    const deityMatch = deity && deity.name ? deity.name.toLowerCase().includes(cleanQuery) : false;
    const deityEnMatch = deity && deity.nameEn ? deity.nameEn.toLowerCase().includes(cleanQuery) : false;

    return titleMatch || titleEnMatch || deityMatch || deityEnMatch;
  });

  return { aartis: matchedAartis, deities: matchedDeities };
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.mr;
};
