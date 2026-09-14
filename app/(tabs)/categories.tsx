import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { DeityCard } from '../../src/components/DeityCard';
import { deities } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { spacing } from '../../src/theme/theme';

export default function CategoriesScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={deities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DeityCard deity={item} variant="list" />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
});
