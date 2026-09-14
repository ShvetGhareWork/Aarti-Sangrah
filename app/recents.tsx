import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AartiCard } from '../src/components/AartiCard';
import { useRecentsStore, useSettingsStore } from '../src/store';
import { getAartiById } from '../src/utils/dataHelper';
import { useTheme } from '../src/hooks/useTheme';
import { getTranslation } from '../src/utils/i18n';
import { fonts, spacing } from '../src/theme/theme';

export default function RecentsScreen() {
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const recentIds = useRecentsStore((state) => state.recentIds);
  const clearRecents = useRecentsStore((state) => state.clearRecents);
  const t = getTranslation(lang);

  const recentAartis = recentIds
    .map((id) => getAartiById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const handleClearHistory = () => {
    Alert.alert(
      t.clearHistoryConfirmTitle,
      t.clearHistoryConfirmMsg,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => clearRecents(),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.responsiveWrapper}>
        {recentAartis.length > 0 && (
          <View style={styles.topBar}>
            <Text style={[styles.countText, { color: colors.textSecondary }]}>
              {t.totalAartis} {recentAartis.length} {t.aartisCountSuffix}
            </Text>
            <Pressable
              style={styles.clearBtn}
              onPress={handleClearHistory}
              hitSlop={8}
            >
              <Feather name="trash-2" size={16} color={colors.danger} />
              <Text style={[styles.clearBtnText, { color: colors.danger }]}>
                {t.clearHistory}
              </Text>
            </Pressable>
          </View>
        )}

        {recentAartis.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🕒</Text>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              {t.noRecentsTitle}
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              {t.noRecentsSub}
            </Text>
          </View>
        ) : (
          <FlatList
            data={recentAartis}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AartiCard aarti={item} />}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  countText: {
    fontFamily: fonts.poppins.medium,
    fontSize: 13,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtnText: {
    fontFamily: fonts.poppins.medium,
    fontSize: 13,
    marginLeft: 4,
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
  },
  emptySubtitle: {
    fontFamily: fonts.poppins.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});
