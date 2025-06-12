import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../../utils/theme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  testID?: string;
  icon?: string;
}

export function ListItem({ 
  title, 
  subtitle, 
  onPress, 
  testID,
  icon = 'chevron-right'
}: ListItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      testID={testID}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="body" style={styles.title}>{title}</Text>
          {subtitle && <Text variant="caption" style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <Feather name={icon as any} size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.md,
    backgroundColor: colors.card,
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
}); 