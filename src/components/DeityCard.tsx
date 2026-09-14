import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Deity } from '../types';
import { useTheme } from '../hooks/useTheme';
import { borderRadius, fonts, spacing } from '../theme/theme';

interface DeityCardProps {
  deity: Deity;
  variant?: 'grid' | 'list';
}

export const DeityCard: React.FC<DeityCardProps> = ({ deity, variant = 'grid' }) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        variant === 'grid' ? styles.gridCard : styles.listCard,
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
          {deity.name}
        </Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {deity.aartiCount} {deity.aartiCount === 1 ? 'आरती' : 'आरत्या'}
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
    width: '48%',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  listCard: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
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
