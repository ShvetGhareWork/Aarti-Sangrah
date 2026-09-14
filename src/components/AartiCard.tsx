import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Aarti } from '../types';
import { useTheme } from '../hooks/useTheme';
import { borderRadius, fonts, spacing } from '../theme/theme';
import { useFavoritesStore, useSettingsStore } from '../store';
import { getDeityById } from '../utils/dataHelper';

interface AartiCardProps {
  aarti: Aarti;
  showDeityName?: boolean;
}

export const AartiCard: React.FC<AartiCardProps> = ({ aarti, showDeityName = true }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const isFav = useFavoritesStore((state) => state.isFavorite(aarti.id));
  const toggleFav = useFavoritesStore((state) => state.toggleFavorite);
  const deity = getDeityById(aarti.deityId);

  const displayTitle = lang === 'en' && aarti.titleEn ? aarti.titleEn : aarti.title;
  const displayDeityName = deity ? (lang === 'en' && deity.nameEn ? deity.nameEn : deity.name) : '';
  const displayPreview = lang === 'en' && aarti.lyricsEn && aarti.lyricsEn[0] ? aarti.lyricsEn[0] : (aarti.lyrics[0] || '');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      onPress={() => router.push(`/aarti/${aarti.id}`)}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {showDeityName && deity && (
            <Text style={[styles.deityName, { color: colors.accent }]}>
              {displayDeityName}
            </Text>
          )}
          <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={[styles.preview, { color: colors.textSecondary }]} numberOfLines={1}>
            {displayPreview}
          </Text>
        </View>

        <Pressable
          hitSlop={12}
          onPress={(e) => {
            e.stopPropagation();
            toggleFav(aarti.id);
          }}
          style={styles.favButton}
        >
          <Feather
            name={isFav ? 'bookmark' : 'bookmark'}
            size={22}
            color={isFav ? colors.primary : colors.textSecondary}
            fill={isFav ? colors.primary : 'transparent'}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  deityName: {
    fontFamily: fonts.poppins.medium,
    fontSize: 12,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 2,
  },
  preview: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 13,
  },
  favButton: {
    padding: spacing.xs,
  },
});
