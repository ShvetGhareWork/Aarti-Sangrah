import React from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';
import { Aarti } from '../types';
import { AartiCard } from './AartiCard';
import { useTheme } from '../hooks/useTheme';
import { borderRadius, spacing } from '../theme/theme';

interface SwipeableFavoriteCardProps {
  aarti: Aarti;
  onRemove: (id: string) => void;
}

export const SwipeableFavoriteCard: React.FC<SwipeableFavoriteCardProps> = ({
  aarti,
  onRemove,
}) => {
  const { colors } = useTheme();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Pressable
        style={[styles.deleteButton, { backgroundColor: colors.danger }]}
        onPress={() => onRemove(aarti.id)}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Feather name="trash-2" size={24} color="#FFF" />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <AartiCard aarti={aarti} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: borderRadius.card,
    marginBottom: spacing.sm + 2,
    marginLeft: spacing.xs,
  },
});
