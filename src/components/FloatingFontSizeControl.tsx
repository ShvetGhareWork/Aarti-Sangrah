import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSettingsStore } from '../store';
import { useTheme } from '../hooks/useTheme';
import { borderRadius, fonts, spacing } from '../theme/theme';

export const FloatingFontSizeControl: React.FC = () => {
  const { colors } = useTheme();
  const { fontSize, increaseFontSize, decreaseFontSize } = useSettingsStore();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}
        onPress={decreaseFontSize}
        hitSlop={8}
      >
        <Text style={[styles.btnText, { color: colors.primary, fontSize: 14 }]}>A-</Text>
      </Pressable>

      <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

      <Text style={[styles.sizeLabel, { color: colors.textSecondary }]}>
        {fontSize}px
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}
        onPress={increaseFontSize}
        hitSlop={8}
      >
        <Text style={[styles.btnText, { color: colors.primary, fontSize: 18 }]}>A+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: fonts.poppins.semiBold,
  },
  divider: {
    width: 1,
    height: 18,
    marginHorizontal: spacing.xs,
  },
  sizeLabel: {
    fontFamily: fonts.poppins.medium,
    fontSize: 12,
    marginHorizontal: spacing.xs,
  },
});
