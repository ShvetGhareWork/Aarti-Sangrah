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

// Normalize search query strings to catch common phonetic transliteration variants
const normalizeString = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/nyaneshwar|jnyaneshwar|dnyaneshwar/g, 'dnyaneshwar ज्ञानेश्वर')
    .replace(/hartalika|haritalika|haritalikaa/g, 'haritalika हरितालिका')
    .replace(/malgalagauri|mangalagauri|mangala gauri/g, 'mangalagauri मंगळागौरी')
    .replace(/renuka|renukamata/g, 'renuka रेणुका')
    .replace(/tulja|tuljabhavani|bhavani/g, 'tuljabhavani तुलजाभवानी')
    .replace(/kalbhairav|bhairav/g, 'kalbhairav कालभैरव')
    .replace(/navnath|nath/g, 'navnath नवनाथ')
    .replace(/ekvira|ekviramata/g, 'ekvira एकविरा');
};

export const searchAartisAndDeities = (query: string, lang: Language = 'mr') => {
  const cleanQuery = (query || '').trim().toLowerCase();
  if (!cleanQuery) return { aartis: [], deities: [] };

  const normQuery = normalizeString(cleanQuery);

  const matchedDeities = deities.filter((d) => {
    if (!d) return false;
    const nameMatch = d.name ? d.name.toLowerCase().includes(cleanQuery) || normQuery.includes(d.name.toLowerCase()) : false;
    const nameEnMatch = d.nameEn ? d.nameEn.toLowerCase().includes(cleanQuery) || normQuery.includes(d.nameEn.toLowerCase()) : false;
    const idMatch = d.id ? d.id.includes(cleanQuery) || normQuery.includes(d.id) : false;
    return nameMatch || nameEnMatch || idMatch;
  });

  const matchedAartis = aartis.filter((a) => {
    if (!a) return false;
    const titleMatch = a.title ? a.title.toLowerCase().includes(cleanQuery) || normQuery.includes(a.title.toLowerCase()) : false;
    const titleEnMatch = a.titleEn ? a.titleEn.toLowerCase().includes(cleanQuery) || normQuery.includes(a.titleEn.toLowerCase()) : false;
    const idMatch = a.id ? a.id.includes(cleanQuery) || normQuery.includes(a.id) : false;

    const deity = getDeityById(a.deityId);
    const deityMatch = deity && deity.name ? deity.name.toLowerCase().includes(cleanQuery) || normQuery.includes(deity.name.toLowerCase()) : false;
    const deityEnMatch = deity && deity.nameEn ? deity.nameEn.toLowerCase().includes(cleanQuery) || normQuery.includes(deity.nameEn.toLowerCase()) : false;

    return titleMatch || titleEnMatch || idMatch || deityMatch || deityEnMatch;
  });

  return { aartis: matchedAartis, deities: matchedDeities };
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.mr;
};
