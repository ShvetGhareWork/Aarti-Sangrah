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
import { borderRadius, fonts, spacing } from '../../src/theme/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { toggleTheme, fontSize, setFontSize } = useSettingsStore();
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          '🙏 आरती संग्रह - रोजच्या पूजेसाठी सर्व मराठी आरत्या एकाच ठिकाणी वाचा. [https://example.com/aarti-sangraha]',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleClearFavorites = () => {
    Alert.alert(
      'आवडत्या आरत्या हटवा',
      'तुम्हाला नक्की सर्व आवडत्या आरत्या यादीतून हटवायच्या आहेत का?',
      [
        { text: 'रद्द करा', style: 'cancel' },
        {
          text: 'हटवा',
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
      {/* Theme Section */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        देखावा (APPEARANCE)
      </Text>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name={isDark ? 'moon' : 'sun'} size={20} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
              डार्क थीम (Dark Theme)
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

        {/* Default Font Size */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="type" size={20} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
              अक्षरांचा आकार (Font Size)
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
        माहिती (DATA MANAGEMENT)
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
              सर्व आवडत्या आरत्या हटवा
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* App & Info Section */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        इतर (OTHER)
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
              ॲप शेअर करा (Share App)
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </Pressable>

        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

        <Pressable style={styles.row} onPress={() => router.push('/about')}>
          <View style={styles.rowLeft}>
            <Feather name="info" size={20} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
              ॲप बद्दल (About)
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </Pressable>
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
