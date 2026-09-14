import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getAartiById, getDeityById } from '../../src/utils/dataHelper';
import { useSettingsStore, useFavoritesStore, useRecentsStore } from '../../src/store';
import { useTheme } from '../../src/hooks/useTheme';
import { FloatingFontSizeControl } from '../../src/components/FloatingFontSizeControl';
import { fonts, spacing, borderRadius } from '../../src/theme/theme';

export default function AartiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const fontSize = useSettingsStore((state) => state.fontSize);
  const isFav = useFavoritesStore((state) => (id ? state.isFavorite(id) : false));
  const toggleFav = useFavoritesStore((state) => state.toggleFavorite);
  const addRecent = useRecentsStore((state) => state.addRecent);

  const aarti = id ? getAartiById(id) : undefined;
  const deity = aarti ? getDeityById(aarti.deityId) : undefined;

  useEffect(() => {
    if (id) {
      addRecent(id);
    }
  }, [id, addRecent]);

  if (!aarti) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
          आरती सापडली नाही.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: aarti.title,
          headerRight: () => (
            <Pressable
              hitSlop={12}
              onPress={() => toggleFav(aarti.id)}
              style={styles.headerBookmark}
            >
              <Feather
                name={isFav ? 'bookmark' : 'bookmark'}
                size={24}
                color="#FFFFFF"
                fill={isFav ? '#FFFFFF' : 'transparent'}
              />
            </Pressable>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle Devanagari Title & Deity Subheader */}
        <View style={styles.aartiHeader}>
          {deity && (
            <Text style={[styles.deityTag, { color: colors.accent }]}>
              {deity.name}
            </Text>
          )}
          <Text style={[styles.aartiTitle, { color: colors.primary }]}>
            {aarti.title}
          </Text>
          <View style={[styles.headerDivider, { backgroundColor: colors.cardBorder }]} />
        </View>

        {/* Clean Reading Area (Strictly zero audio controls) */}
        <View style={styles.lyricsContainer}>
          {aarti.lyrics.map((line, index) => (
            <Text
              key={index}
              style={[
                styles.lyricLine,
                {
                  color: colors.textPrimary,
                  fontSize: fontSize,
                  lineHeight: Math.round(fontSize * 1.8),
                },
              ]}
            >
              {line}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Floating Font Size Controls (A- / A+) */}
      <FloatingFontSizeControl />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontFamily: fonts.devanagari.regular,
    fontSize: 16,
  },
  headerBookmark: {
    paddingHorizontal: spacing.xs,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100, // Extra space so floating font control doesn't obscure last lines
  },
  aartiHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  deityTag: {
    fontFamily: fonts.poppins.medium,
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  aartiTitle: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  headerDivider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginTop: spacing.xs,
  },
  lyricsContainer: {
    alignItems: 'center',
  },
  lyricLine: {
    fontFamily: fonts.devanagari.regular,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
