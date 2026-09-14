import React from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useSettingsStore } from '../store';
import { getTranslation } from '../utils/i18n';
import { borderRadius, fonts, spacing } from '../theme/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  editable?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  onFocus,
  editable = true,
}) => {
  const { colors } = useTheme();
  const lang = useSettingsStore((state) => state.language);
  const t = getTranslation(lang);

  const defaultPlaceholder = placeholder || t.searchPlaceholder;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <Feather name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={defaultPlaceholder}
        placeholderTextColor={colors.textSecondary}
        onFocus={onFocus}
        editable={editable}
        returnKeyType="search"
      />
      {value.length > 0 && editable && (
        <Pressable onPress={() => onChangeText('')} style={styles.clearBtn}>
          <Feather name="x" size={18} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.input,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 48,
    marginVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: fonts.devanagari.regular,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: spacing.xs,
  },
});
