import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsState, FavoritesState, RecentsState } from '../types';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      themeMode: 'light',
      fontSize: 19,
      hasCompletedOnboarding: false,
      setThemeMode: (themeMode) => set({ themeMode }),
      toggleTheme: () =>
        set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
      setFontSize: (fontSize) => set({ fontSize }),
      increaseFontSize: () =>
        set((state) => ({ fontSize: Math.min(32, state.fontSize + 2) })),
      decreaseFontSize: () =>
        set((state) => ({ fontSize: Math.max(14, state.fontSize - 2) })),
      setHasCompletedOnboarding: (hasCompletedOnboarding) =>
        set({ hasCompletedOnboarding }),
    }),
    {
      name: 'aarti-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (id) =>
        set((state) => {
          if (state.favoriteIds.includes(id)) return state;
          return { favoriteIds: [id, ...state.favoriteIds] };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
        })),
      toggleFavorite: (id) => {
        const { favoriteIds, addFavorite, removeFavorite } = get();
        if (favoriteIds.includes(id)) {
          removeFavorite(id);
        } else {
          addFavorite(id);
        }
      },
      isFavorite: (id) => get().favoriteIds.includes(id),
      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'aarti-favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useRecentsStore = create<RecentsState>()(
  persist(
    (set) => ({
      recentIds: [],
      addRecent: (id) =>
        set((state) => {
          const filtered = state.recentIds.filter((recentId) => recentId !== id);
          return { recentIds: [id, ...filtered].slice(0, 20) };
        }),
      clearRecents: () => set({ recentIds: [] }),
    }),
    {
      name: 'aarti-recents-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
