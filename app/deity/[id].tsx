import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AartiCard } from '../../src/components/AartiCard';
import { getDeityById, getAartisByDeityId } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { useSettingsStore } from '../../src/store';
import { getTranslation } from '../../src/utils/i18n';
import { fonts, spacing } from '../../src/theme/theme';

export default function DeityAartisScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  const deity = id ? getDeityById(id) : undefined;
  const deityAartis = id ? getAartisByDeityId(id) : [];

  const deityName = deity ? (lang === 'en' && deity.nameEn ? deity.nameEn : deity.name) : '';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: deity ? `${deityName} ${t.aartisCountSuffix}` : t.appName,
        }}
      />

      <View style={styles.responsiveWrapper}>
        {deityAartis.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {t.noAartisFound}
            </Text>
          </View>
        ) : (
          <FlatList
            data={deityAartis}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AartiCard aarti={item} showDeityName={false} />}
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
  emptyText: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 16,
    textAlign: 'center',
  },
});
