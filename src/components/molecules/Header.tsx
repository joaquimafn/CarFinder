import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export function Header({ title, onLogout }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text variant="subtitle" style={styles.title}>{title}</Text>
      <Button
        title="Logout"
        onPress={onLogout}
        variant="danger"
        style={styles.logoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    flex: 1,
    marginRight: 16,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
}); 