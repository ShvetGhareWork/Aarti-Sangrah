import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore } from '../src/store';
import { useTheme } from '../src/hooks/useTheme';
import { getTranslation } from '../src/utils/i18n';
import { borderRadius, fonts, spacing } from '../src/theme/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const setHasCompletedOnboarding = useSettingsStore(
    (state) => state.setHasCompletedOnboarding
  );
  const t = getTranslation(lang);

  const slides = [
    {
      id: '1',
      emoji: '🛕',
      title: t.onboarding1Title,
      description: t.onboarding1Desc,
    },
    {
      id: '2',
      emoji: '📖',
      title: t.onboarding2Title,
      description: t.onboarding2Desc,
    },
    {
      id: '3',
      emoji: '⭐',
      title: t.onboarding3Title,
      description: t.onboarding3Desc,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleFinish = () => {
    setHasCompletedOnboarding(true);
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / windowWidth);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom + spacing.md,
        },
      ]}
    >
      {/* Top Header / Skip Button */}
      <View style={styles.header}>
        {currentIndex < slides.length - 1 ? (
          <Pressable onPress={handleFinish} hitSlop={12}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>
              {t.skip}
            </Text>
          </Pressable>
        ) : (
          <View />
        )}
      </View>

      {/* Slides Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: windowWidth }]}>
            <View style={[styles.emojiCircle, { backgroundColor: colors.inputBackground }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <Text style={[styles.title, { color: colors.primary }]}>{item.title}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Footer Controls */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? colors.primary : colors.cardBorder,
                  width: currentIndex === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? t.getStarted : t.next}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    paddingHorizontal: spacing.lg,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fonts.poppins.medium,
    fontSize: 14,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emojiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontFamily: fonts.devanagari.bold,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: fonts.poppins.regular,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    borderRadius: borderRadius.button,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.poppins.semiBold,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
