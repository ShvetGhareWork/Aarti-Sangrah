import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Pressable,
  Alert,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSettingsStore, useFavoritesStore } from '../../src/store';
import { useTheme } from '../../src/hooks/useTheme';
import { getTranslation } from '../../src/utils/i18n';
import { borderRadius, fonts, spacing } from '../../src/theme/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { toggleTheme, fontSize, setFontSize, language, toggleLanguage } =
    useSettingsStore();
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const t = getTranslation(language);

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          '🙏 आरती संग्रह - रोजच्या पूजेसाठी सर्व आरती एकाच ठिकाणी वाचा / Read Marathi Aarti Sangraha for daily pooja. [https://example.com/aarti-sangraha]',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleClearFavorites = () => {
    Alert.alert(
      t.clearFavoritesConfirmTitle,
      t.clearFavoritesConfirmMsg,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => clearFavorites(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.responsiveWrapper}>
        {/* Appearance Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t.appearance}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          {/* Theme Toggle */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name={isDark ? 'moon' : 'sun'} size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t.darkTheme}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.cardBorder, true: colors.accent }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

          {/* Language Toggle */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="globe" size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t.language}
              </Text>
            </View>
            <Pressable
              style={[styles.pillBtn, { backgroundColor: colors.inputBackground }]}
              onPress={toggleLanguage}
            >
              <Text style={[styles.pillBtnText, { color: colors.primary }]}>
                {language === 'mr' ? t.mrLanguageLabel : t.enLanguageLabel}
              </Text>
            </Pressable>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

          {/* Default Font Size */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="type" size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t.fontSize}
              </Text>
            </View>
            <View style={styles.fontSizeControls}>
              <Pressable
                style={[styles.fontBtn, { backgroundColor: colors.inputBackground }]}
                onPress={() => setFontSize(Math.max(14, fontSize - 2))}
              >
                <Text style={[styles.fontBtnText, { color: colors.primary }]}>-</Text>
              </Pressable>
              <Text style={[styles.fontSizeValue, { color: colors.textPrimary }]}>
                {fontSize}px
              </Text>
              <Pressable
                style={[styles.fontBtn, { backgroundColor: colors.inputBackground }]}
                onPress={() => setFontSize(Math.min(32, fontSize + 2))}
              >
                <Text style={[styles.fontBtnText, { color: colors.primary }]}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Data Management Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t.dataManagement}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <Pressable style={styles.row} onPress={handleClearFavorites}>
            <View style={styles.rowLeft}>
              <Feather name="trash-2" size={20} color={colors.danger} />
              <Text style={[styles.rowLabel, { color: colors.danger }]}>
                {t.clearAllFavorites}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        {/* Other Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t.other}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          ]}
        >
          <Pressable style={styles.row} onPress={handleShareApp}>
            <View style={styles.rowLeft}>
              <Feather name="share-2" size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t.shareApp}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </Pressable>

          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

          <Pressable style={styles.row} onPress={() => router.push('/about')}>
            <View style={styles.rowLeft}>
              <Feather name="info" size={20} color={colors.primary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {t.aboutApp}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
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
  sectionTitle: {
    fontFamily: fonts.poppins.semiBold,
    fontSize: 12,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  card: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: fonts.poppins.medium,
    fontSize: 15,
    marginLeft: spacing.sm + 4,
  },
  divider: {
    height: 1,
  },
  pillBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.pill,
  },
  pillBtnText: {
    fontFamily: fonts.poppins.semiBold,
    fontSize: 13,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBtnText: {
    fontFamily: fonts.poppins.bold,
    fontSize: 16,
  },
  fontSizeValue: {
    fontFamily: fonts.poppins.medium,
    fontSize: 14,
    marginHorizontal: spacing.sm,
  },
});
