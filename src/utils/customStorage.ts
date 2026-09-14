import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

// In-memory fallback for environments where neither localStorage nor AsyncStorage native modules are present
const memoryStorage: Record<string, string> = {};

export const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(name);
        }
      } catch (e) {
        // Fallback silently without throwing or logging noisy warnings
      }
      return memoryStorage[name] || null;
    }
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return await AsyncStorage.getItem(name);
    } catch (e) {
      return memoryStorage[name] || null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(name, value);
          return;
        }
      } catch (e) {
        // Fallback silently without throwing
      }
      memoryStorage[name] = value;
      return;
    }
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      memoryStorage[name] = value;
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(name);
          return;
        }
      } catch (e) {
        // Fallback silently
      }
      delete memoryStorage[name];
      return;
    }
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.removeItem(name);
    } catch (e) {
      delete memoryStorage[name];
    }
  },
};
