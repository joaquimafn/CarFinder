import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ListItemProps {
  title: string;
  onPress: () => void;
  testID?: string;
}

export function ListItem({ title, onPress, testID }: ListItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      testID={testID}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
}); 