import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { colors, spacing, shadows } from '../../utils/theme';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export function Header({ title, onLogout }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Feather name="home" size={24} color={colors.text} />
        <Text variant="subtitle" style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bell" size={22} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={onLogout}>
          <Feather name="log-out" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.small,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: spacing.md,
  },
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.md,
  },
}); 