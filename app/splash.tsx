import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSettingsStore } from '../src/store';
import { useTheme } from '../src/hooks/useTheme';
import { getTranslation } from '../src/utils/i18n';
import { fonts, spacing } from '../src/theme/theme';

export default function SplashScreen() {
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
        <Text style={styles.icon}>🪔</Text>
      </View>
      <Text style={[styles.title, { color: colors.primary }]}>{t.appName}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t.tagline}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.poppins.medium,
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
