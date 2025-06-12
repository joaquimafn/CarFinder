import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';

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
  testID
}: ScreenHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {showLogout && onLogout && (
          <Button
            title="Sair"
            onPress={onLogout}
            variant="outline"
            testID="logout-button"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
}); 