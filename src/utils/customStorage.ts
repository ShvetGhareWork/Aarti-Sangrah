import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

const memoryStorage: Record<string, string> = {};

function getAsyncStorage() {
  if (Platform.OS === 'web') {
    return null;
  }
  try {
    const AS = require('@react-native-async-storage/async-storage').default;
    if (AS && typeof AS.getItem === 'function') {
      return AS;
    }
  } catch (e) {
    // Native module not available
  }
  return null;
}

export const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(name);
        }
      } catch (e) {
        // Fallback
      }
      return memoryStorage[name] || null;
    }

    const AS = getAsyncStorage();
    if (AS) {
      try {
        return await AS.getItem(name);
      } catch (e) {
        // Fallback
      }
    }
    return memoryStorage[name] || null;
  },

  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(name, value);
          return;
        }
      } catch (e) {
        // Fallback
      }
      memoryStorage[name] = value;
      return;
    }

    const AS = getAsyncStorage();
    if (AS) {
      try {
        await AS.setItem(name, value);
        return;
      } catch (e) {
        // Fallback
      }
    }
    memoryStorage[name] = value;
  },

  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(name);
          return;
        }
      } catch (e) {
        // Fallback
      }
      delete memoryStorage[name];
      return;
    }

    const AS = getAsyncStorage();
    if (AS) {
      try {
        await AS.removeItem(name);
        return;
      } catch (e) {
        // Fallback
      }
    }
    delete memoryStorage[name];
  },
};
