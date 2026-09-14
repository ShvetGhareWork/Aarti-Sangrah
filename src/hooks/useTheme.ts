import React from 'react';
import { useSettingsStore } from '../store';
import { lightColors, darkColors } from '../theme/theme';

export function useTheme() {
  const themeMode = useSettingsStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return {
    themeMode,
    isDark,
    colors,
  };
}
