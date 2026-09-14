import deitiesData from '../data/deities.json';
import aartisData from '../data/aartis.json';
import { Aarti, Deity, Language } from '../types';
import { translations } from './i18n';

export const deities: Deity[] = deitiesData;
export const aartis: Aarti[] = aartisData;

export const getDeityById = (id: string): Deity | undefined => {
  return deities.find((d) => d.id === id);
};

export const getAartiById = (id: string): Aarti | undefined => {
  return aartis.find((a) => a.id === id);
};

export const getAartisByDeityId = (deityId: string): Aarti[] => {
  return aartis.filter((a) => a.deityId === deityId);
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
  return aartis.filter((a) => featuredIds.includes(a.id));
};

export const searchAartisAndDeities = (query: string, lang: Language = 'mr') => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { aartis: [], deities: [] };

  const matchedDeities = deities.filter((d) => {
    const nameMatch = d.name.toLowerCase().includes(cleanQuery);
    const nameEnMatch = d.nameEn ? d.nameEn.toLowerCase().includes(cleanQuery) : false;
    return nameMatch || nameEnMatch;
  });

  const matchedAartis = aartis.filter((a) => {
    const titleMatch = a.title.toLowerCase().includes(cleanQuery);
    const titleEnMatch = a.titleEn ? a.titleEn.toLowerCase().includes(cleanQuery) : false;
    const deity = getDeityById(a.deityId);
    const deityMatch = deity ? deity.name.toLowerCase().includes(cleanQuery) : false;
    const deityEnMatch = deity && deity.nameEn ? deity.nameEn.toLowerCase().includes(cleanQuery) : false;
    return titleMatch || titleEnMatch || deityMatch || deityEnMatch;
  });

  return { aartis: matchedAartis, deities: matchedDeities };
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.mr;
};
