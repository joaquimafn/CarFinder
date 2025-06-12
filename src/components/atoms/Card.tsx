import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderRadius, shadows } from '../../utils/theme';
import { Feather } from '@expo/vector-icons';

interface CardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  iconColor?: string;
  rightIcon?: boolean;
}

export function Card({ 
  title, 
  subtitle, 
  onPress, 
  style, 
  icon,
  iconColor = colors.accent,
  rightIcon = false
}: CardProps) {
  const containerProps = onPress 
    ? { onPress, style: [styles.container, style], activeOpacity: 0.7 } 
    : {};

  return (
    <View style={[styles.wrapper, style]}>
      {onPress ? (
        <TouchableOpacity {...containerProps} style={styles.container}>
          <CardContent 
            title={title} 
            subtitle={subtitle} 
            icon={icon} 
            iconColor={iconColor} 
            rightIcon={rightIcon} 
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <CardContent 
            title={title} 
            subtitle={subtitle} 
            icon={icon} 
            iconColor={iconColor} 
            rightIcon={rightIcon} 
          />
        </View>
      )}
    </View>
  );
}

interface CardContentProps {
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  rightIcon?: boolean;
}

function CardContent({ title, subtitle, icon, iconColor, rightIcon }: CardContentProps) {
  return (
    <View style={styles.contentContainer}>
      {icon && !rightIcon && (
        <View style={styles.leftIconContainer}>
          <Feather name={icon as any} size={20} color={iconColor} />
        </View>
      )}
      
      <View style={styles.textContainer}>
        <Text variant="subtitle" style={styles.title}>{title}</Text>
        {subtitle && <Text variant="caption" style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      {rightIcon && (
        <View style={styles.rightIconContainer}>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  container: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  rightIconContainer: {
    marginLeft: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
  },
}); 