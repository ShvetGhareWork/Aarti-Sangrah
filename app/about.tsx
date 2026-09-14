import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { borderRadius, fonts, spacing } from '../src/theme/theme';

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoIcon}>🪔</Text>
        </View>
        <Text style={[styles.appName, { color: colors.primary }]}>आरती संग्रह</Text>
        <Text style={[styles.version, { color: colors.textSecondary }]}>
          आवृत्ती १.०.० (v1.0.0)
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.primary }]}>
          ॲप बद्दल (About App)
        </Text>
        <Text style={[styles.cardText, { color: colors.textPrimary }]}>
          "आरती संग्रह" हे खास दैनिक पूजा, सण-उत्सव आणि नित्यपाठासाठी तयार केलेले एक सुंदर व सोपे मराठी आरती ॲप आहे. या मध्ये गणपती, विठ्ठल, शंकर, देवी आणि विविध देवतांच्या ७६ पारंपरिक आरत्यांचा समावेश आहे.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.primary }]}>
          स्त्रोत व आभार (Source Material Credits)
        </Text>
        <Text style={[styles.cardText, { color: colors.textPrimary }]}>
          या ॲपमधील सर्व आरत्या या पारंपरिक मराठी आरती संग्रहातून संकलित केल्या गेल्या आहेत. या शतकानुशतके चालत आलेल्या सार्वजनिक क्षेत्रातील (Public Domain) भक्ती रचना आहेत.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.primary }]}>
          वैशिष्ट्ये (Key Features)
        </Text>
        <Text style={[styles.bullet, { color: colors.textPrimary }]}>
          • वाचनासाठी सुलभ व मोठे देवनागरी अक्षर (Font Control)
        </Text>
        <Text style={[styles.bullet, { color: colors.textPrimary }]}>
          • ऑडिओ विरहित - केवळ वाचनावर लक्ष केंद्रित (Zero Audio Distraction)
        </Text>
        <Text style={[styles.bullet, { color: colors.textPrimary }]}>
          • आवडत्या आरत्या साठवण्याची सोय (Favorites)
        </Text>
        <Text style={[styles.bullet, { color: colors.textPrimary }]}>
          • लाईट व डार्क थीम पर्याय (Light & Dark Theme)
        </Text>
      </View>

      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके ॥
      </Text>
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
