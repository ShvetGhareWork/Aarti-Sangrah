import deitiesData from '../data/deities.json';
import aartisData from '../data/aartis.json';
import { Aarti, Deity } from '../types';

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
  // Select a curated prominent set of popular aartis for featured carousel/section
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

export const searchAartisAndDeities = (query: string) => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { aartis: [], deities: [] };

  const matchedDeities = deities.filter((d) =>
    d.name.toLowerCase().includes(cleanQuery)
  );

  const matchedAartis = aartis.filter((a) => {
    const titleMatch = a.title.toLowerCase().includes(cleanQuery);
    const deity = getDeityById(a.deityId);
    const deityMatch = deity ? deity.name.toLowerCase().includes(cleanQuery) : false;
    return titleMatch || deityMatch;
  });

  return { aartis: matchedAartis, deities: matchedDeities };
};
