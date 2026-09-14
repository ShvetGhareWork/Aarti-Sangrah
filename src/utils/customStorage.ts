import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

export const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(name);
        }
      } catch (e) {
        console.warn('localStorage getItem error:', e);
      }
      return null;
    }
    try {
      return await AsyncStorage.getItem(name);
    } catch (e) {
      console.warn('AsyncStorage getItem error:', e);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(name, value);
        }
      } catch (e) {
        console.warn('localStorage setItem error:', e);
      }
      return;
    }
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.warn('AsyncStorage setItem error:', e);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(name);
        }
      } catch (e) {
        console.warn('localStorage removeItem error:', e);
      }
      return;
    }
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.warn('AsyncStorage removeItem error:', e);
    }
  },
};
