import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getAartiById, getDeityById } from '../../src/utils/dataHelper';
import { useSettingsStore, useFavoritesStore, useRecentsStore } from '../../src/store';
import { useTheme } from '../../src/hooks/useTheme';
import { FloatingFontSizeControl } from '../../src/components/FloatingFontSizeControl';
import { fonts, spacing } from '../../src/theme/theme';

export default function AartiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const fontSize = useSettingsStore((state) => state.fontSize);
  const lang = useSettingsStore((state) => state.language);
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

  const title = lang === 'en' && aarti.titleEn ? aarti.titleEn : aarti.title;
  const deityName = deity ? (lang === 'en' && deity.nameEn ? deity.nameEn : deity.name) : '';
  const lyrics = lang === 'en' && aarti.lyricsEn && aarti.lyricsEn.length > 0 ? aarti.lyricsEn : aarti.lyrics;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: title,
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
        <View style={styles.responsiveWrapper}>
          <View style={styles.aartiHeader}>
            {deity && (
              <Text style={[styles.deityTag, { color: colors.accent }]}>
                {deityName}
              </Text>
            )}
            <Text style={[styles.aartiTitle, { color: colors.primary }]}>
              {title}
            </Text>
            <View style={[styles.headerDivider, { backgroundColor: colors.cardBorder }]} />
          </View>

          <View style={styles.lyricsContainer}>
            {lyrics.map((line, index) => (
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
        </View>
      </ScrollView>

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
    paddingBottom: 100,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 720,
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
