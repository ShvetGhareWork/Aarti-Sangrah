import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { SearchBar } from '../../src/components/SearchBar';
import { DeityCard } from '../../src/components/DeityCard';
import { AartiCard } from '../../src/components/AartiCard';
import { deities, getFeaturedAartis } from '../../src/utils/dataHelper';
import { fonts, spacing, borderRadius } from '../../src/theme/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const featured = getFeaturedAartis();
  const mainDeities = deities.slice(0, 6);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Devotional Greeting Header */}
      <View style={styles.greetingHeader}>
        <View>
          <Text style={[styles.greetingSub, { color: colors.textSecondary }]}>
            🙏 शुभ चिंतन
          </Text>
          <Text style={[styles.greetingTitle, { color: colors.primary }]}>
            जय देव, जय मंगलमूर्ती
          </Text>
        </View>

        <Pressable
          style={[styles.historyBtn, { backgroundColor: colors.inputBackground }]}
          onPress={() => router.push('/recents')}
        >
          <Feather name="clock" size={20} color={colors.primary} />
        </Pressable>
      </View>

      {/* Tappable Search Bar triggering Search screen */}
      <Pressable onPress={() => router.push('/search')}>
        <View pointerEvents="none">
          <SearchBar value="" onChangeText={() => {}} editable={false} />
        </View>
      </Pressable>

      {/* Featured Aartis Carousel */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          विशेष आरत्या (Featured)
        </Text>
      </View>

      <FlatList
        data={featured}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <View style={styles.carouselCardWrapper}>
            <AartiCard aarti={item} showDeityName={true} />
          </View>
        )}
      />

      {/* Browse By Deity Grid */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          देवतेनुसार आरत्या (Browse by Deity)
        </Text>
        <Pressable onPress={() => router.push('/(tabs)/categories')}>
          <Text style={[styles.seeAllText, { color: colors.accent }]}>
            सर्व पहा ({deities.length})
          </Text>
        </Pressable>
      </View>

      <View style={styles.gridContainer}>
        {mainDeities.map((deity) => (
          <DeityCard key={deity.id} deity={deity} variant="grid" />
        ))}
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
