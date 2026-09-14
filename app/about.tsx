import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { useSettingsStore } from '../src/store';
import { getTranslation } from '../src/utils/i18n';
import { borderRadius, fonts, spacing } from '../src/theme/theme';

export default function AboutScreen() {
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.responsiveWrapper}>
        <View style={styles.header}>
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoIcon}>🪔</Text>
          </View>
          <Text style={[styles.appName, { color: colors.primary }]}>{t.appName}</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            {t.version} १.०.० (v1.0.0)
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.primary }]}>
            {t.aboutTitle}
          </Text>
          <Text style={[styles.cardText, { color: colors.textPrimary }]}>
            {t.aboutDesc}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.primary }]}>
            {t.sourceCreditsTitle}
          </Text>
          <Text style={[styles.cardText, { color: colors.textPrimary }]}>
            {t.sourceCreditsDesc}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.primary }]}>
            {t.keyFeaturesTitle}
          </Text>
          <Text style={[styles.bullet, { color: colors.textPrimary }]}>
            {t.feature1}
          </Text>
          <Text style={[styles.bullet, { color: colors.textPrimary }]}>
            {t.feature2}
          </Text>
          <Text style={[styles.bullet, { color: colors.textPrimary }]}>
            {t.feature3}
          </Text>
          <Text style={[styles.bullet, { color: colors.textPrimary }]}>
            {t.feature4}
          </Text>
        </View>

        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          {t.shlokaFooter}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 720,
  },
  header: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoIcon: {
    fontSize: 40,
  },
  appName: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 26,
  },
  version: {
    fontFamily: fonts.poppins.regular,
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 17,
    marginBottom: spacing.xs,
  },
  cardText: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  bullet: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  footerText: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
