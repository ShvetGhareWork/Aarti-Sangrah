export type Language = 'mr' | 'en'; // 'mr' for Marathi, 'en' for English

export interface Aarti {
  id: string;
  deityId: string;
  title: string;
  titleEn?: string;
  lyrics: string[];
  lyricsEn?: string[];
}

export interface Deity {
  id: string;
  name: string;
  nameEn?: string;
  aartiCount: number;
}

export type ThemeMode = 'light' | 'dark';

export interface SettingsState {
  themeMode: ThemeMode;
  fontSize: number; // base size for reading text, default e.g. 19
  language: Language;
  hasCompletedOnboarding: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setFontSize: (size: number) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setHasCompletedOnboarding: (status: boolean) => void;
}

export interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (aartiId: string) => void;
  removeFavorite: (aartiId: string) => void;
  toggleFavorite: (aartiId: string) => void;
  isFavorite: (aartiId: string) => boolean;
  clearFavorites: () => void;
}

export interface RecentsState {
  recentIds: string[];
  addRecent: (aartiId: string) => void;
  clearRecents: () => void;
}
