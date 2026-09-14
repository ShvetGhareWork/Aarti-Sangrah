import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '../src/store';
import { useTheme } from '../src/hooks/useTheme';
import { fonts, spacing } from '../src/theme/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const hasCompletedOnboarding = useSettingsStore(
    (state) => state.hasCompletedOnboarding
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
        <Text style={styles.icon}>🪔</Text>
      </View>
      <Text style={[styles.title, { color: colors.primary }]}>आरती संग्रह</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        संपूर्ण मराठी आरती संग्रह
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
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
