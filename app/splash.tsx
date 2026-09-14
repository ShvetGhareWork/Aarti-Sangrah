import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '../src/store';
import { useTheme } from '../src/hooks/useTheme';
import { getTranslation } from '../src/utils/i18n';
import { fonts, spacing } from '../src/theme/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const hasCompletedOnboarding = useSettingsStore(
    (state) => state.hasCompletedOnboarding
  );
  const t = getTranslation(lang);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding, router]);

  const handleManualEnter = () => {
    if (hasCompletedOnboarding) {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding');
    }
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={handleManualEnter}
    >
      <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
        <Text style={styles.icon}>🪔</Text>
      </View>
      <Text style={[styles.title, { color: colors.primary }]}>{t.appName}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t.tagline}
      </Text>
    </Pressable>
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
