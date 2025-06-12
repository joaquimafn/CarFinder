import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchInput } from '../atoms/SearchInput';
import { spacing } from '../../utils/theme';

interface BrandFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export function BrandFilter({
  value,
  onChangeText,
  placeholder = 'Search brands...',
  debounceTime = 300,
}: BrandFilterProps) {
  return (
    <View style={styles.container}>
      <SearchInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        testID="brand-search-input"
        debounceTime={debounceTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing.sm,
  },
}); 