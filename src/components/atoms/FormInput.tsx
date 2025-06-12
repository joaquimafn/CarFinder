import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderRadius, shadows } from '../../utils/theme';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function FormInput({ 
  label, 
  error, 
  style, 
  leftIcon,
  rightIcon,
  ...props 
}: FormInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text variant="caption" style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input, 
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            error && styles.inputError, 
            style
          ]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text variant="caption" color={colors.danger} style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 16,
    ...shadows.small,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xl + spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xl + spacing.xs,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  leftIconContainer: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: spacing.md,
    zIndex: 1,
  },
}); 