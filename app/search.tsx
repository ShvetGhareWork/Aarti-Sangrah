import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from '../src/components/SearchBar';
import { AartiCard } from '../src/components/AartiCard';
import { DeityCard } from '../src/components/DeityCard';
import { searchAartisAndDeities, getAartiById } from '../src/utils/dataHelper';
import { useRecentsStore, useSettingsStore } from '../src/store';
import { useTheme } from '../src/hooks/useTheme';
import { getTranslation } from '../src/utils/i18n';
import { fonts, spacing } from '../src/theme/theme';

export default function SearchScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const lang = useSettingsStore((state) => state.language);
  const recentIds = useRecentsStore((state) => state.recentIds);
  const t = getTranslation(lang);

  const { aartis: matchedAartis, deities: matchedDeities } =
    searchAartisAndDeities(query, lang);

  const recentAartis = recentIds
    .map((id) => getAartiById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 5);

  const hasSearchText = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.responsiveWrapper}>
        <View style={styles.searchHeader}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        {!hasSearchText ? (
          <View style={styles.recentSection}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {t.recentSearches}
            </Text>
            {recentAartis.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                {t.noSearchHistory}
              </Text>
            ) : (
              <FlatList
                data={recentAartis}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AartiCard aarti={item} />}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {matchedDeities.length === 0 && matchedAartis.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                  {t.noAartisFound}
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                  {t.noAartisFoundSub}
                </Text>
              </View>
            ) : (
              <FlatList
                data={[
                  ...matchedDeities.map((d) => ({ type: 'deity' as const, data: d })),
                  ...matchedAartis.map((a) => ({ type: 'aarti' as const, data: a })),
                ]}
                keyExtractor={(item) => `${item.type}-${item.data.id}`}
                renderItem={({ item }) =>
                  item.type === 'deity' ? (
                    <DeityCard deity={item.data} variant="list" />
                  ) : (
                    <AartiCard aarti={item.data} />
                  )
                }
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
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
  searchHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  recentSection: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.poppins.semiBold,
    fontSize: 12,
    marginVertical: spacing.sm,
  },
  listPadding: {
    paddingBottom: spacing.xxl,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
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
  },
  emptySubtitle: {
    fontFamily: fonts.poppins.regular,
    fontSize: 14,
  },
  emptyText: {
    fontFamily: fonts.poppins.regular,
    fontSize: 14,
    marginTop: spacing.sm,
  },
});
