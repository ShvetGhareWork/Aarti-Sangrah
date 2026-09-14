export const lightColors = {
  primary: '#7A1F2B',
  accent: '#E8871E',
  secondaryAccent: '#C9A227',
  background: '#FFF8F0',
  cardBackground: '#FFFDF8',
  cardBorder: '#E8D9C5',
  textPrimary: '#2E2018',
  textSecondary: '#8A7563',
  inputBackground: '#F5ECE3',
  divider: '#EFE5DA',
  activePill: '#7A1F2B',
  activePillText: '#FFFFFF',
  inactivePill: '#EFE3D5',
  inactivePillText: '#7A1F2B',
  danger: '#D93838',
  success: '#2E7D32',
};

export const darkColors = {
  primary: '#E8871E', // or warm accent highlight for dark mode header/accents
  primaryHeader: '#7A1F2B',
  accent: '#E8871E',
  secondaryAccent: '#C9A227',
  background: '#1C1512',
  cardBackground: '#241B16',
  cardBorder: '#342720',
  textPrimary: '#F0E6DA',
  textSecondary: '#A89585',
  inputBackground: '#2A201A',
  divider: '#2C221C',
  activePill: '#E8871E',
  activePillText: '#1C1512',
  inactivePill: '#2A201A',
  inactivePillText: '#E8871E',
  danger: '#FF5252',
  success: '#4CAF50',
};

export type ThemeColors = typeof lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  button: 12,
  input: 12,
  card: 16,
  pill: 24,
};

export const fonts = {
  poppins: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  devanagari: {
    regular: 'NotoSerifDevanagari_400Regular',
    bold: 'NotoSerifDevanagari_700Bold',
  },
};
