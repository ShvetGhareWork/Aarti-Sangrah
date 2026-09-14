import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AartiCard } from '../../src/components/AartiCard';
import { getDeityById, getAartisByDeityId } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { fonts, spacing } from '../../src/theme/theme';

export default function DeityAartisScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const deity = id ? getDeityById(id) : undefined;
  const deityAartis = id ? getAartisByDeityId(id) : [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: deity ? `${deity.name} आरत्या` : 'आरती संग्रह',
        }}
      />

      {deityAartis.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            या देवतेसाठी कोणत्याही आरत्या उपलब्ध नाहीत.
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
  emptyText: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 16,
    textAlign: 'center',
  },
});
