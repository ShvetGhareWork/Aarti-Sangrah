import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SwipeableFavoriteCard } from '../../src/components/SwipeableFavoriteCard';
import { useFavoritesStore, useSettingsStore } from '../../src/store';
import { getAartiById } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { getTranslation } from '../../src/utils/i18n';
import { fonts, spacing } from '../../src/theme/theme';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const t = getTranslation(lang);

  const favAartis = favoriteIds
    .map((id) => getAartiById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.responsiveWrapper}>
        {favAartis.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              {t.noFavoritesTitle}
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              {t.noFavoritesSub}
            </Text>
          </View>
        ) : (
          <FlatList
            data={favAartis}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SwipeableFavoriteCard aarti={item} onRemove={removeFavorite} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 20,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: fonts.poppins.regular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
