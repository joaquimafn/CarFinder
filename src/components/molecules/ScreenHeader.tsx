import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../atoms/Text';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, shadows } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
  title: string;
  showLogout?: boolean;
  onLogout?: () => void;
  testID?: string;
}

export function ScreenHeader({
  title,
  showLogout,
  onLogout,
  testID,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        {showLogout && onLogout && (
          <TouchableOpacity 
            onPress={onLogout} 
            style={styles.logoutButton}
            testID="logout-button"
          >
            <Feather name="log-out" size={22} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.small,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
  },
  backButton: {
    padding: spacing.xs,
  },
  logoutButton: {
    padding: spacing.xs,
  },
}); 