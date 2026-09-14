import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { SwipeableFavoriteCard } from '../../src/components/SwipeableFavoriteCard';
import { useFavoritesStore } from '../../src/store';
import { getAartiById } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { fonts, spacing, borderRadius } from '../../src/theme/theme';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const favAartis = favoriteIds
    .map((id) => getAartiById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {favAartis.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            कोणतीही आरती जोडलेली नाही
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            तुमच्या आवडीच्या आरती जवळील बुकमार्क चिन्हावर क्लिक करून इथे साठवा.
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
