import React, { useCallback } from 'react';
import { StyleSheet, FlatList, View, useWindowDimensions } from 'react-native';
import { DeityCard } from '../../src/components/DeityCard';
import { deities } from '../../src/utils/dataHelper';
import { useTheme } from '../../src/hooks/useTheme';
import { spacing } from '../../src/theme/theme';
import { Deity } from '../../src/types';

export default function CategoriesScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const isWide = width >= 600;

  const renderDeityItem = useCallback(
    ({ item }: { item: Deity }) => (
      <View style={isWide ? styles.wideItem : styles.fullItem}>
        <DeityCard deity={item} variant="list" />
      </View>
    ),
    [isWide]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.responsiveWrapper}>
        <FlatList
          data={deities}
          keyExtractor={(item) => item.id}
          key={isWide ? 'wide-list' : 'narrow-list'}
          numColumns={isWide ? 2 : 1}
          columnWrapperStyle={isWide ? styles.columnWrapper : undefined}
          renderItem={renderDeityItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={12}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
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
    maxWidth: 960,
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  wideItem: {
    width: '49%',
  },
  fullItem: {
    width: '100%',
  },
});
