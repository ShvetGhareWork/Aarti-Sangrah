import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Deity } from '../types';
import { useTheme } from '../hooks/useTheme';
import { borderRadius, fonts, spacing } from '../theme/theme';
import { useSettingsStore } from '../store';
import { getTranslation } from '../utils/i18n';

interface DeityCardProps {
  deity: Deity;
  variant?: 'grid' | 'list';
  cardWidth?: any;
}

export const DeityCard: React.FC<DeityCardProps> = ({ deity, variant = 'grid', cardWidth }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  const displayName = lang === 'en' && deity.nameEn ? deity.nameEn : deity.name;

  return (
    <Pressable
      style={({ pressed }) => [
        variant === 'grid' ? styles.gridCard : styles.listCard,
        cardWidth && variant === 'grid' ? { width: cardWidth } : null,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={() => router.push(`/deity/${deity.id}`)}
    >
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.badgeIcon, { color: colors.primary }]}>🛕</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
          {displayName}
        </Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {deity.aartiCount} {t.aartisCountSuffix}
        </Text>
      </View>

      {variant === 'list' && (
        <Feather name="chevron-right" size={20} color={colors.textSecondary} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    elevation: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
    }),
  },
  listCard: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
    elevation: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
    }),
  },
  badgeContainer: {
    marginRight: spacing.sm,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 17,
    lineHeight: 24,
  },
  count: {
    fontFamily: fonts.poppins.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
