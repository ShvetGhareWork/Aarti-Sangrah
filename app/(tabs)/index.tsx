import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useSettingsStore } from '../../src/store';
import { getTranslation } from '../../src/utils/i18n';
import { SearchBar } from '../../src/components/SearchBar';
import { DeityCard } from '../../src/components/DeityCard';
import { AartiCard } from '../../src/components/AartiCard';
import { deities, getFeaturedAartis } from '../../src/utils/dataHelper';
import { fonts, spacing } from '../../src/theme/theme';
import { Aarti } from '../../src/types';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  const featured = getFeaturedAartis();
  const mainDeities = deities.slice(0, 10);

  const gridCardWidth = width >= 900 ? '23.5%' : width >= 600 ? '31.5%' : '48%';

  const renderFeaturedItem = useCallback(
    ({ item }: { item: Aarti }) => (
      <View style={styles.carouselCardWrapper}>
        <AartiCard aarti={item} showDeityName={true} />
      </View>
    ),
    []
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
    >
      <View style={styles.responsiveWrapper}>
        {/* Devotional Greeting Header */}
        <View style={styles.greetingHeader}>
          <View>
            <Text style={[styles.greetingSub, { color: colors.textSecondary }]}>
              {t.greetingSub}
            </Text>
            <Text style={[styles.greetingTitle, { color: colors.primary }]}>
              {t.greetingTitle}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.historyBtn,
              { backgroundColor: colors.inputBackground, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => router.push('/recents')}
          >
            <Feather name="clock" size={20} color={colors.primary} />
          </Pressable>
        </View>

        {/* Search Bar Launcher */}
        <Pressable onPress={() => router.push('/search')}>
          <View pointerEvents="none">
            <SearchBar value="" onChangeText={() => {}} editable={false} />
          </View>
        </Pressable>

        {/* Featured Aartis Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t.featuredTitle}
          </Text>
        </View>

        <FlatList
          data={featured}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          renderItem={renderFeaturedItem}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={3}
          removeClippedSubviews={true}
        />

        {/* Browse By Deity Grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t.browseDeities}
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/categories')}>
            <Text style={[styles.seeAllText, { color: colors.accent }]}>
              {t.seeAll} ({deities.length})
            </Text>
          </Pressable>
        </View>

        <View style={styles.gridContainer}>
          {mainDeities.map((deity) => (
            <DeityCard
              key={deity.id}
              deity={deity}
              variant="grid"
              cardWidth={gridCardWidth}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 960,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  greetingSub: {
    fontFamily: fonts.poppins.medium,
    fontSize: 13,
  },
  greetingTitle: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 22,
  },
  historyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 18,
  },
  seeAllText: {
    fontFamily: fonts.poppins.medium,
    fontSize: 13,
  },
  carouselContainer: {
    paddingRight: spacing.md,
  },
  carouselCardWrapper: {
    width: 280,
    marginRight: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
