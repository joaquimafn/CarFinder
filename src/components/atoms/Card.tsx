import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Text } from './Text';

interface CardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Card({ title, subtitle, onPress, style }: CardProps) {
  const Container = onPress ? TouchableOpacity : React.Fragment;
  const containerProps = onPress ? { onPress, style: [styles.container, style] } : { style: [styles.container, style] };

  return (
    <Container {...containerProps}>
      <Text variant="subtitle" style={styles.title}>{title}</Text>
      {subtitle && <Text variant="caption" style={styles.subtitle}>{subtitle}</Text>}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
}); 